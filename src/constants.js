import accessEnv from "#root/helpers/accessEnv";

export const OTP_EXPIRE_DURATION = 5;
export const PORT = accessEnv("PORT");

//db
export const DB_HOSTNAME = accessEnv("DB_HOSTNAME");
export const DB_PORT = accessEnv("DB_PORT");
export const DB_USER = accessEnv("DB_USER");
export const DB_PASSWORD = accessEnv("DB_PASSWORD");
export const DB_NAME = accessEnv("DB_NAME");
