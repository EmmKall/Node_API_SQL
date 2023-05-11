
export const validDataIn = async ( data, LABELS ) =>
{
    let errors = [];
    await LABELS.forEach (element => {
        if( data[ element ] === undefined  )
        {
            const error = { [element]: 'missing' };
            errors.push( error );
        }else if( data[ element ] === '' )
        {
            const error = { [element]: 'is empty' };
            errors.push( error );
        }else if( data[ element ] && data[ element ].length < 5 )
        {
            const error = { [element]: 'minimun length is 6' };
            errors.push( error );
        }
    });
    return errors;
}