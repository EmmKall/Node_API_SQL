import User from '../model/user.js';
import jwt from 'jsonwebtoken';

export const ValidToken = async( req, res ) => {
    const header = req.headers.authorization ?? ''; 
    const token = header.split( ' ' )[ 1 ] ?? ''; //Get token
    if( token === '' ) { 
        return res.status( 404 ).json( { msg: 'Token no present' } );
    }
    const payload = jwt.verify( token, process.env.SECRET_ENCRYP ); //Get Payload
    if( Date.now() > payload.exp ){ //Token expired
        return res.status( 401 ).json( { msg: 'Token was wxpired' } );
    }
    const row = await User.findOne( { where: { token, name: payload.name } } );
    if( row === null ) { //Token no valid
        res.status( 401 ).json( { msg: 'Token no valid' } );
    }
    console.log( payload );
    console.log( row );
    return;
}