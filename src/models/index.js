import dbConfig from "#root/config/db";
import Sequelize from "sequelize";
import studentModel from "./student";
import courseModel from "./course";
import courseSelectionModel from "./course_selection";
import selectionDetailModel from "./selection_detail";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.student = studentModel(sequelize, Sequelize);
db.course = courseModel(sequelize, Sequelize);
db.courseSelection = courseSelectionModel(sequelize, Sequelize);
db.selectionDetail = selectionDetailModel(sequelize, Sequelize);

db.student.associate({
    course_selection: db.courseSelection
})


db.courseSelection.associate({
    student: db.student,
    selection_detail: db.selectionDetail
})

db.selectionDetail.associate({
    course_selection: db.courseSelection,
    course: db.course
})

export default db;