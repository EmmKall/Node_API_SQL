import User from '../model/user.js';
import { faker } from '@faker-js/faker';
import Cryptr from 'cryptr';

import { validDataIn } from '../helpers/validaIn.js';

const LABELS = [ 'name', 'email', 'phone', 'password', 'is_active' ];

const getAll = async ( req, res ) =>
{
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
    //Get data
    const { body } = req;
    //Valid data
    const validation = await validDataIn( body, LABELS );
    if( validation.length > 0 ) { return res.status( 400 ).json({ status: false, msg: 'Something wrong', errors: validation }); }
    //Save data
    try
    {
        const cryptr = new Cryptr( process.env.SECRET_ENCRYP );
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
        var cryptr = new Cryptr( process.env.SECRET_ENCRYP );
        if( cryptr.decrypt( row.password ) !== body.password ){ return res.status( 400 ).json( { status:false, msg: `Credentials not valid` } ); }
    } catch( error ) {
        return res.status( 500 ).json( { status:false, msg: `Error: ${error}` } );
    } 
    return res.status( 200 ).json( { status: true, msg: `Welcome ${ row.name }` } );
}

const destroy = async ( req, res ) =>
{
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