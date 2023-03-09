const { body } = require('express-validator');

export const courseRule = [ 
    body('course_id')
        .notEmpty().withMessage("Course Code is required")
        .bail()
        .trim().escape()
        .isLength({ max: 7, min: 7 }).withMessage("Course Code must be 7 Characters")
        .bail(),
    body('name')
        .notEmpty().withMessage("Name is required")
        .bail()
        .trim().escape()
        .isLength({ max : 256})
        .bail(),
    body('lecturer_id')
        .notEmpty().withMessage("Lecturer is required")
        .bail()
        .trim().escape()
        .isLength({ max: 10, min: 10 }).withMessage("Lecturer ID must be 10 Characters")
        .bail(),
    body('classroom_id')
        .notEmpty().withMessage("Classroom is required")
        .bail()
        .trim().escape()
        .isLength({ max: 4, min: 4 }).withMessage("Classroom ID must be 4 Characters")
        .bail(),
    body('time_id')
        .notEmpty().withMessage("Time is required")
        .bail()
        .trim().escape()
        .isLength({ max : 256})
        .bail(),
    body('credit')
        .notEmpty().withMessage("Credit is required")
        .bail()
        .trim().escape()
        .isLength({ max: 2 })
        .isNumeric()
        .bail(),
    body('max_student')
        .optional({nullable: true})
        .trim().escape()
        .isNumeric()
        .bail()
]

export const optCourseRule = [ 
    body('name')
        .optional({nullable: true})
        .bail()
        .trim().escape()
        .isLength({ max : 256})
        .bail(),
    body('lecturer_id')
        .optional({nullable: true})
        .bail()
        .trim().escape()
        .isLength({ max: 10, min: 10 }).withMessage("Lecturer ID must be 10 Characters")
        .bail(),
    body('classroom_id')
        .optional({nullable: true})
        .bail()
        .trim().escape()
        .isLength({ max: 4, min: 4 }).withMessage("Classroom ID must be 4 Characters")
        .bail(),
    body('time_id')
        .optional({nullable: true})
        .bail()
        .trim().escape()
        .isLength({ max : 256})
        .bail(),
    body('credit')
        .optional({nullable: true})
        .bail()
        .trim().escape()
        .isLength({ max: 2 })
        .isNumeric()
        .bail(),
    body('max_student')
        .optional({nullable: true})
        .trim().escape()
        .isNumeric()
        .bail()
]