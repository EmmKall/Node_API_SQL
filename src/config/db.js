import { createPool } from 'mysql2/promise';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
const dot = dotenv.config();

export const sequelize = new Sequelize( process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT
});

export const testConnection = async () =>
{
    let msg = '';
    try{
        await sequelize.authenticate();
        msg = '--------Connected successfully-----------';
    } catch( error ){
        msg = `---------Error: ${error}---------------`;
    }
    console.log( msg );
    return;
}

export const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});


