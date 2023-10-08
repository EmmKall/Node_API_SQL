import nodemailer from 'nodemailer';

export const sendMail = async ( type, to, subject, data, copy = '', attachment = null ) => {
    const transport = nodemailer.createTransport({
        host: process.env.M_HOST,
        port: process.env.M_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.M_USER,
            pass: process.env.M_PASS,
        },
        tls: {
            ciphers:'SSLv3'
        }
    });

    transport.verify(function(error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log('Server is ready to take our messages');
        }
    });

    let body = { bodyText: '', bodyHTML: '' };
    switch ( type ) {
        case 'register':
            body = bodyRegistration( data );
            break;
    
        default:
            break;
    }
    //Send mail
    try {
        const mail = await transport.sendMail({
            from: process.env.M_FROM,
            to,
            subject,
            text: body.bodyText,
            html: body.bodyHTML
        });
        console.log( 'Mail was send: ' + mail.messageId );
    } catch( error ){
        console.log('error: ', error);
    }
}

//sendMail().catch(console.error);

//Main body
const getBodyMail = () => {
    const body = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width,initial-scale=1"><title>API EMM_KALL</title><style type="text/css">body{background:#eee;display:flex;flex-direction:column;justify-content:space-between;max-width:90rem;border:.2rem solid #0c84b8;border-radius:1rem}h1,h2,h3,h4{color:#0c84b8;font-weight:bolder;margin:.2rem auto}.container{margin:0 auto;width:100%;padding:.5rem 2rem}p,span{color:#636363}</style></head><body><div class="container"><section><h1 style="text-align:center;text-decoration:underline">API EMMKALL</h1><h2 style="text-align:center">$title</h2><div style="margin:1rem auto">$body</div></section></div><footer style="border-bottom-right-radius:.8rem;border-bottom-left-radius:.8rem;background:#000;color:#fff;padding:.1rem 2rem"><p style="text-align:center">Made by<a style="text-decoration:none;color:#eee" href="https://emmkall.github.io/#/" target="_blank">EmmKall-Dev</a></p></footer></body></html>';
    return body;
}
//Body Mail registration
const bodyRegistration = data => {
    let bodyHTML = getBodyMail();
    bodyHTML = bodyHTML.replace( '$title', 'Registration on EmmKall API' );
    const content = `
        <p>Welcome ${ data.name } to EmmKall App</p>
        <p>Follow the next link to confirm your registration, and you can interacture the app</p>
        <a href="${ process.env.APP_ROUTE }/confirm/${ data.token }">Confirm your account</a>
    `;
    bodyHTML = bodyHTML.replace( '$body', content );
    const bodyText = `Confirm you email on the next link: ${ process.env.APP_ROUTE }/confirm/${ data.token } `;
    const body = { bodyText, bodyHTML };
    return body;
}



