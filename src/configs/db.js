import {
    DB_HOSTNAME,
    DB_PORT,
    DB_USER,
    DB_PASSWORD,
    DB_NAME} from "#root/constants";

export default {
    HOST: DB_HOSTNAME,
    PORT: DB_PORT,
    USER: DB_USER,
    PASSWORD: DB_PASSWORD,
    
    DB: DB_NAME,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};