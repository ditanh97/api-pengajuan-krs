import db from "#root/models";
import {msgToString, resJson} from "#root/helpers/format";
const {
    course,
    student,
    courseSelection,
    selectionDetail,

} = db;
import {QueryTypes  } from "sequelize";

const pkName = 'course_selection_id';
const dataName = 'courses';
const searchColumns = ['name'];
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

export const addCourse = async (req, res, next) => {
    try {
        let {
            student_id,
            semester,
            course_list
        } = req.body
        const studentData = await student.findOne({
            where: {
                student_id
            }       
        });
        if (!studentData) return next(new Error(msgToString(`Student not authenticated`, 401)));
        // check if the student has applied for course_sheet in same semester
        const courseSheetData = await courseSelection.findOne({
            where: {
                student_id,
                semester
            }       
        });
        if (courseSheetData) return next(new Error(msgToString(`Student has applied course sheet for the corresponding semester `, 400)));

        //check maximum quota for all cuorse_list
        const queryCourse = course_list.reduce((a, c, i) => {
            const isLast = i == course_list.length -1;
            return `${a}'${c}'` + (isLast ? '' : ', ');
        }, "")
        
        const queryCheckMaxQuota = `SELECT C.course_id, C.max_student FROM (SELECT A.course_id, CASE WHEN (A.max_student >= count(B.course_id)) THEN 0 ELSE 1 END as is_fulled, A.max_student FROM tt_courses A 
        LEFT JOIN tr_selection_detail B on B.course_id = A.course_id 
        WHERE A.course_id in (${queryCourse}) GROUP BY A.course_id ) C WHERE C.is_fulled = 1`;

        
        const maxQuota =  await sequelize.query(queryCheckMaxQuota, {
            type: QueryTypes.SELECT
        });
        if(maxQuota && maxQuota.length > 0) return next (new Error(msgToString(`Some course is fully applied`, 400, maxQuota)));
        const createCourseSheet = await sequelize.transaction(function (t) {
            return courseSelection.create({
                student_id,
                semester
            }, {
                transaction: t
            })
            .then(async function (course_sheet){
                const {course_selection_id} = course_sheet;
                let courseItemList = []
                course_list.map((i) => {
                    courseItemList.push({
                        course_selection_id,
                        course_id: i
                    })
                })
                const createCourseList = await selectionDetail.bulkCreate(courseItemList,{
                    transaction: t
                })
                return createCourseList;
            })
            
        })
      	if ( !createCourseSheet ) return next (new Error(msgToString(`Bad Request`, 400)));
        return resJson(res, 200, "Success", req.body)
    }catch (err) {
        if (err.message) return next(err);
        return next(new Error(msgToString('Something went wrong on server', 500)));
    } 
};


export const getOneCourseSheet = async (req, res, next) => {
    let idFromParam = req.params.id || null;
    let {id} = req.query;
    id = id == null || typeof id == 'undefined' ? idFromParam: id;
    try {
        let where = {[pkName]: id}
        if (!id) return next (new Error(msgToString(`Please provide id query params request`, 400)))
        const data = await courseSelection.findOne({
            where,
            include: [
                {
                    model: student,
                    attributes: [],
                    attributes: ["student_id", "name", "dob"],
                    as: "student"
                },   
                {
                    model: selectionDetail,
                    attributes: ["detail_id"],
                    as: "course_list",
                    include: [
                        {
                            model: course,
                            attributes: ["course_id", "name", "lecturer_id"],
                            as: "course"
                        }
                    ]
                }
            ],       
        });
        if (data) {
            return resJson(res, 200, "Success", {
                ...data.dataValues
            }); 
        }else {
            return next(new Error(msgToString(`Not Found`, 404)));
        }
    }catch (err) {
        if (err.message) return next(err);
        return next(new Error(msgToString('Something went wrong on server', 500)));
    }
};
