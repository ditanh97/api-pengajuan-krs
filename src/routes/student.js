import Router from 'express';

import validate from '#root/helpers/validate';
import { studentRule, optStudentRule } from '#root/helpers/validationRules/student';
import {listData, findOneData, addData, updateData, deleteData} from "#root/controllers/student";


const studentRoutes = Router();

studentRoutes
    .get("/list", listData)
    .get("/:student_id", findOneData)
    .post("/add", studentRule, validate, addData) 
    .put("/update/:id", optStudentRule, validate, updateData) 
    .delete("/delete/:id", deleteData) 


export {studentRoutes};