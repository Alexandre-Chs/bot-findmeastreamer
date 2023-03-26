import mysql from 'mysql2'
import * as dotenv from 'dotenv'
dotenv.config()

export const connection =  mysql.createConnection({
  host: process.env.PRIVATE_HOST,
  user: process.env.PRIVATE_USER,
  password: process.env.PRIVATE_MDP,
  database: process.env.PRIVATE_DB,
  port:process.env.PRIVATE_PORT,
});
