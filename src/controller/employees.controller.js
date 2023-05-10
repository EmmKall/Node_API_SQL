

const getAll = async ( req, res ) =>
{
    return res.status( 200 ).json({ msg: 'GetAll' })
};

const findById = async ( req, res ) =>
{
    return res.status( 200 ).json({ msg: 'find' });
};


const store = async ( req, res ) => 
{
    return res.status( 200 ).json({ msg: 'store' });
}

const update = async ( req, res ) => 
{
    return res.status( 200 ).json({ msg: 'update' });
}

const destroy = async ( req, res ) =>
{
    return res.status( 200 ).json({ msg: 'delete' });
}

export
{
    getAll,
    findById,
    store,
    update,
    destroy
}