import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';
const dot = dotenv.config();

export const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});


