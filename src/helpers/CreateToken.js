import jwt from 'jsonwebtoken';

export const CreateToken = payload => {
    const token = jwt.sign( payload, process.env.SECRET_ENCRYP );
    return token;
}

