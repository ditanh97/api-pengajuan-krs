import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import {Router} from "#root/routes";
import {PORT} from "#root/constants";
import {msgToJSON, resJson, errorMessage} from "#root/helpers/format";


const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/', Router);
// set port, listen for requests

app.use((err, req, res, next)=>{
  try {
    //customize error
    const {status, message, data} = msgToJSON(err.message);
    console.log(data, "hallooo")
    if (!data ) return resJson(res, status, message, null);
    return resJson(res, status, message, data);
  }catch (e) {
    const errMessage = errorMessage(err);
    if (err.code == 'EBADCSRFTOKEN') {
      return resJson(res, 403, "Forbidden Access", null)
    } else {
      return resJson(res, 500, errMessage, null)
    }
      
  }
})

const PORT_RUN = PORT || 8080;
app.listen(PORT_RUN, () => {
  console.log(`Server is running on port ${PORT}.`);
});

