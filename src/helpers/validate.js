import {resJson} from "#root/helpers/format";
const {validationResult} = require("express-validator");


export default (req, res, next) => {
    const errors = validationResult(req)
    console.log(errors, "haii");
    if (errors.isEmpty()) {
      return next()
    }
    let errorArray = errors.array();
    if (errorArray.length < 1) return next();

    return resJson(res, 400, {msg: "Bad Request", code:  "validator_error"}, errorArray);
}
