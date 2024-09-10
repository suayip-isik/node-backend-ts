import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const DB_HOST = process.env.DB_HOST;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_PORT = process.env.DB_PORT;
const DATABASE = process.env.DATABASE;

export {
  PORT,
  JWT_SECRET_KEY,
  DB_HOST,
  DB_USERNAME,
  DB_PASSWORD,
  DB_PORT,
  DATABASE,
};
