import express from 'express';
import {studentRoutes} from './student';

const Router = express.Router();

Router.get('/', (req, res) => {
    res.json({
        message: "Welcome to API v1." 
    });
}) 


Router.use("/student", studentRoutes)

export {Router};