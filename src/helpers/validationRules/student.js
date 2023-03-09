const { body, check } = require('express-validator');
import {checkExistingData} from "#root/controllers/shared/validation";
import { inArray} from "#root/helpers/format";

export const studentRule = [ 
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
    body('name')
        .notEmpty().withMessage("Name is required")
        .bail()
        .trim().escape()
        .isLength({ max : 256})
        .bail(),
    body('phone')
        .notEmpty().withMessage("Phone is required")
        .bail()
        .trim().escape()
        .isLength({ max : 20}).withMessage("Maximum is 20 Digit")
        .custom((value, {req}) => {
            const allowChars = /^[+]?\d+$/
            if(!value.match(allowChars)) {
                return Promise.reject("Phone must in digit");
            }
            return true;
        })
        .bail(),
    body('dob')
        .notEmpty().withMessage("Date of Birth is required")
        .bail()
        .custom((value, {req}) => {
            let regEx = /^\d{4}-\d{2}-\d{2}$/;
            if(!value.match(regEx)) return false;  // Invalid format
            let d = new Date(value);
            let dNum = d.getTime();
            if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
            return true;
        })
        .withMessage("Date of Birth format is YYYY-MM-DD")
        .bail(),
    body('entry_date')
        .notEmpty().withMessage("Entry Date is required")
        .bail()
        .custom((value, {req}) => {
            let regEx = /^\d{4}-\d{2}-\d{2}$/;
            if(!value.match(regEx)) return false;  // Invalid format
            let d = new Date(value);
            let dNum = d.getTime();
            if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
            return true;
        })
        .withMessage("Entry Date format is YYYY-MM-DD")
        .bail(),
    body('faculty_id')
        .notEmpty().withMessage("Faculty is required")
        .bail()
        .trim().escape()
        .isLength({ max: 10 })
        .bail(),
    body('major_id')
        .notEmpty().withMessage("Major is required")
        .bail()
        .trim().escape()
        .isLength({ max: 50 })
        .bail(),
    body('supervisor_id')
        .notEmpty().withMessage("Supervisor is required")
        .bail()
        .trim().escape()
        .isLength({ max: 10, min: 10 })
        .bail(),
    body('semester')
        .optional({nullable: true})
        .trim().escape()
        .isLength({ max: 2 })
        .isNumeric()
        .bail(),
    body('degree')
        .notEmpty().withMessage("Degree is required")
        .bail()
        .trim().escape()
        .isLength({ max: 4 })
        .bail(),
    body('gpa')
        .optional({nullable: true})
        .trim().escape()
        .toFloat().isFloat()
        .bail(),
    body('grad_status')
        .optional({nullable: true})
        .trim().escape()
        .custom((value, {req}) => {
            let allowStatus = ['active', 'graduate', 'drop_out'];
            if ( !allowStatus.some(u => u == value.toLowerCase()) ) {
                return false;
            }
            return true;
        })
        .bail()
]

export const optStudentRule = [ 
    body('name')
        .optional({nullable: true})
        .bail()
        .trim().escape()
        .isLength({ max : 256})
        .bail(),
    body('phone')
        .optional({nullable: true})
        .bail()
        .trim().escape()
        .isLength({ max : 20}).withMessage("Maximum is 20 Digit")
        .custom((value, {req}) => {
            const allowChars = /^[+]?\d+$/
            if(!value.match(allowChars)) {
                return Promise.reject("Phone must in digit");
            }
            return true;
        })
        .bail(),
    body('dob')
        .optional({nullable: true})
        .bail()
        .custom((value, {req}) => {
            let regEx = /^\d{4}-\d{2}-\d{2}$/;
            if(!value.match(regEx)) return false;  // Invalid format
            let d = new Date(value);
            let dNum = d.getTime();
            if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
            return true;
        })
        .withMessage("Date of Birth format is YYYY-MM-DD")
        .bail(),
    body('entry_date')
        .optional({nullable: true})
        .bail()
        .custom((value, {req}) => {
            let regEx = /^\d{4}-\d{2}-\d{2}$/;
            if(!value.match(regEx)) return false;  // Invalid format
            let d = new Date(value);
            let dNum = d.getTime();
            if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
            return true;
        })
        .withMessage("Entry Date format is YYYY-MM-DD")
        .bail(),
    body('faculty_id')
        .optional({nullable: true})
        .bail()
        .trim().escape()
        .isLength({ max: 10 })
        .bail(),
    body('major_id')
        .optional({nullable: true})
        .bail()
        .trim().escape()
        .isLength({ max: 50 })
        .bail(),
    body('supervisor_id')
        .optional({nullable: true})
        .bail()
        .trim().escape()
        .isLength({ max: 10, min: 10 })
        .bail(),
    body('semester')
        .optional({nullable: true})
        .trim().escape()
        .isLength({ max: 2 })
        .isNumeric()
        .bail(),
    body('degree')
        .optional({nullable: true})
        .bail()
        .trim().escape()
        .isLength({ max: 4 })
        .bail(),
    body('gpa')
        .optional({nullable: true})
        .trim().escape()
        .toFloat().isFloat()
        .bail(),
    body('grad_status')
        .optional({nullable: true})
        .trim().escape()
        .custom((value, {req}) => {
            let allowStatus = ['active', 'graduate', 'drop_out'];
            if ( !allowStatus.some(u => u == value.toLowerCase()) ) {
                return false;
            }
            return true;
        })
        .bail()
]
