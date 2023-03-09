import Router from 'express';

import validate from '#root/helpers/validate';
import { courseRule, optCourseRule } from '#root/helpers/validationRules/course';
import {listData, findOneData, addData, updateData, deleteData} from "#root/controllers/course";


const courseRoutes = Router();

courseRoutes
    .get("/list", listData)
    .get("/:id", findOneData)
    .post("/add", courseRule, validate, addData) 
    .put("/update/:id", optCourseRule, validate, updateData) 
    .delete("/delete/:id", deleteData) 


export {courseRoutes};