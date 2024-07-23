import { createPool } from "mysql2/promise";
import dotenv from 'dotenv';

dotenv.config();//Inicializa la toma de valores desde el .env

const conn = createPool({
    host:process.env.HOST,
    database:process.env.DATABASE,
    port:process.env.PORT,
    user:process.env.USER,
    password:process.env.PASSWORD
});

export default conn;