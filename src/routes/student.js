import Router from 'express';

import validate from '#root/helpers/validate';
import {listData, findOneData, addData, updateData, deleteData} from "#root/controllers/student";
import {addCourse} from '#root/controllers/course.sheet';
import { studentRule, optStudentRule } from '#root/helpers/validationRules/student';
import {courseSheetRule} from '#root/helpers/validationRules/course.sheet';

const studentRoutes = Router();

studentRoutes
    .get("/list", listData)
    .get("/:id", findOneData)
    .post("/add", studentRule, validate, addData) 
    .put("/update/:id", optStudentRule, validate, updateData) 
    .delete("/delete/:id", deleteData) 
    .post("/course_sheet/save", courseSheetRule, validate, addCourse)


export {studentRoutes};