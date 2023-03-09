export const msgToJSON = (string) => {
    return JSON.parse(string)
}

export const msgToString = (message, status, data = null) => {
    return JSON.stringify({message, status, data})
}

export const resJson = (res, status, message, data) => {
    let response = {status};
    if (isObject(message)) {
      response["message"] = message.msg,
      response["code"] =  message.code 
    } else {
      response ["message"] = message
    }
    if (data) response["data"] = data
    return res.status(status).json(response);
}

export const inArray = function (needle, haystack, argStrict) {
    var key = '';
    var strict = !!argStrict;
  
    if (strict) {
      for (key in haystack) {
        if (haystack[key] === needle) {
          return true;
        }
      }
    } else {
      for (key in haystack) {
        if (haystack[key] == needle) {
          // eslint-disable-line eqeqeq
          return true;
        }
      }
    }
  
    return false;
  };

export const isObject = (o) => {
    return o instanceof Object && o.constructor === Object;
}

export const errorMessage = (err) => {
  let message = "Bad Request. "
  console.log(err, "error");
  switch(err.name){
      case "SequelizeForeignKeyConstraintError":
          message += "Data must be input within available scope. Please check the relation";
          break;
      case "TypeError":
          message += err.message
      default:
          message = "Something went wrong. Please contact the Developers..";
          break;
  }
  return message;
}