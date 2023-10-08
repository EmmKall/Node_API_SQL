import User from '../model/user.js';
import { faker } from '@faker-js/faker';
import Cryptr from 'cryptr'; //https://www.npmjs.com/package/cryptr
import jwt from 'jsonwebtoken';
import { ValidToken } from '../helpers/ValidToken.js';

import { validDataIn } from '../helpers/validaIn.js';

const LABELS = [ 'name', 'email', 'phone', 'password', 'is_active' ];

const cryptr = new Cryptr( process.env.SECRET_ENCRYP, { encoding: 'base64', pbkdf2Iterations: 10000, saltLength: 10 } );

const getAll = async ( req, res ) =>
{   
    //Valid token
    ValidToken( req, res );
    try
    {
        const data = await User.findAll();
        return res.status( 200 ).json({ status: true, data });
    } catch( error )
    {
        return res.status( 500 ).json({ status: false, msg: `Error: ${error}` });
    }
};

const findById = async ( req, res ) =>
{
    //Valid token
    ValidToken( req, res );
    const { id } = req.params;
    try
    {
        const data = await User.findByPk( id );
        //const data = await User.findOne({ where: { id: id } });
        return res.status( 200 ).json({ status: true, data });
    } catch( error )
    {
        return res.status( 500 ).json({ status: false, msg: `Error: ${error}` });
    }
};


const store = async ( req, res ) => 
{
    //Valid token
    ValidToken( req, res );
    //Get data
    const { body } = req;
    //Valid data
    const validation = await validDataIn( body, LABELS );
    if( validation.length > 0 ) { return res.status( 400 ).json({ status: false, msg: 'Something wrong', errors: validation }); }
    //Save data
    try
    {
        body.password = cryptr.encrypt( body.password );
        await User.sync({ alter: true }); // ({ force: true }),  ({ alter: true })
        //const register = await User.create({ name: faker.name.fullName(), price: faker.commerce.price(), in_sotck: faker.datatype.boolean() });
        const register = await User.create( body );
        return res.status( 200 ).json({ status: true, msg: 'user created', data: register });
    } catch( error )
    {
        return res.status( 500 ).json({ status: false, msg: `Error: ${error}` });
    }
}

const update = async ( req, res ) => 
{
    //Valid token
    ValidToken( req, res );
    //Get data
    const { id } = req.params;
    const { body } = req;
    //Valid data
    const validation = await validDataIn( body, LABELS );
    if( validation.length > 0 ) { return res.status( 400 ).json({ status: false, msg: 'Somthing wrong', errors: validation }); }
    //Save data
    try
    {
        await User.sync(); // ({ force: true }),  ({ alter: true })
        const register = await User.update( body, {
            where: { id }
        });
        return res.status( 200 ).json({ status: true, msg: 'User updated', data: register });
    } catch( error )
    {
        return res.status( 500 ).json({ status: false, msg: `Error: ${error}` });
    }
}

const login = async( req, res ) => {
    const { body } = req;
    let row;
    try {
        row = await User.findOne( { where: { email: body.email } } )
        if( row === null ) { return res.status( 400 ).json( { status:false, msg: `Data not found` } ); }
        if( cryptr.decrypt( row.password ) !== body.password ){ return res.status( 400 ).json( { status:false, msg: `Credentials not valid` } ); }
        const payload = { id: row.id, name: row.name, exp: ( Date.now() * 60 * 1000 * 60 * 12 ) };
        row.token = jwt.sign( payload, process.env.SECRET_ENCRYP );
        await User.update( { token: row.token }, {where: { id: row.id } } );
        const data =  {
            token: row.token,
            name: row.name
        };
        return res.status( 200 ).json( { status: true, msg: `Welcome ${ row.name }`, data } );
    } catch( error ) {
        return res.status( 500 ).json( { status:false, msg: `Error: ${error}` } );
    }
}

const destroy = async ( req, res ) =>
{
    //Valid token
    ValidToken( req, res );
    const { id } = req.params;
    try
    {
        //Validar que exista el registro
        const register = await User.destroy ({
            where: { id }
        });
        return res.status( 200 ).json({ status: true, msg: 'User deleted', data: register });
    } catch( error )
    {
        return res.status( 500 ).json({ status: false, msg: `Error: ${error}` });
    }
    
}

export
{
    getAll,
    findById,
    store,
    update,
    destroy,
    login
}