import { pool } from '../config/db.js';

export const ping = async ( req, res ) => {
    const [ result ] = await pool.query( 'SELECT 1 + 1 AS result ');
    const data = result[0];
    res.status( 200 ).json( data );
}