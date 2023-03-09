const { body } = require('express-validator');
export const courseSheetRule = [ 
    body('student_id')
        .notEmpty().withMessage("Student ID Number is required")
        .bail()
        .trim().escape()
        .isLength({ max: 10, min: 10 }).withMessage("Student ID Number must be 10 Characters")
        .custom((value, {req}) => {
            const allowChars = /^[+]?\d+$/
            if(!value.match(allowChars)) {
                return false;
            }
            return true;
        })
        .bail(),
    body('semester')
        .notEmpty().withMessage("Semester is required")
        .bail()
        .trim().escape()
        .isLength({ max: 2 })
        .isNumeric()
        .bail(),
    body('course_list')
        .notEmpty().withMessage("Course List is required")
        .bail() 
        .isArray({ min: 1, max: 3 })
        .withMessage("Student can only choose maximum 3 courses")
        .custom((arr) =>{
            return arr.filter((value, index, array) => array.indexOf(value) === index);
        })
        .bail()
]


