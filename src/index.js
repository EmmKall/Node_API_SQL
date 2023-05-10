import express from 'express';
import dotenv from 'dotenv';
const dot = dotenv.config();

import employeesRoutes from './routes/empoyees.route.js';
//Definiendo variables
const app = express();
//DB
import { pool } from './config/db.js';
const port = process.env.PORT || 3001;
//Middlewares
//Rutas
app.get( '/ping', async ( req, res ) => {
    const [ result ] = await pool.query( 'SELECT 1 + 1 AS result ');
    const data = result[0];
    res.status( 200 ).json( data );
} );
app.use( '/employees', employeesRoutes );

app.listen(port, () => {
    console.log(`---------- Server running on port ${port}`);
});