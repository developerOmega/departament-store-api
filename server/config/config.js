const fs = require('fs');

//====================================
// Puerto
//====================================
const port =  process.env.PORT || 4000;


//====================================
// Entorno
//====================================
const nodeEnv = process.env.NODE_ENV || 'development';

//====================================
// JSON WEB TOKEN
//====================================

class JwtEnv {
    static signOptions = {
        issuer:  'Mysoft corp',
        subject:  'some@user.com',
        audience:  'http://mysoftcorp.in',
        expiresIn:  "48h",
        algorithm:  "RS256"
    };

    static verifyOptions = {
        issuer:  'Mysoft corp',
        subject:  'some@user.com',
        audience:  'http://mysoftcorp.in',
        expiresIn:  "48h",
        algorithm:  ["RS256"]
       };

    static publicAdminKey = nodeEnv == 'development' ? fs.readFileSync('server/key/publicAdmin.key', 'utf8') : process.env.PUBLIC_ADMIN_KEY;
    static privateAdminKey = nodeEnv == 'development' ? fs.readFileSync('server/key/privateAdmin.key', 'utf8') : process.env.PRIVATE_ADMIN_KEY;
    
    static publicUserKey = nodeEnv == 'development' ? fs.readFileSync('server/key/publicUser.key', 'utf8') : process.env.PUBLIC_USER_KEY;
    static privateUserKey = nodeEnv == 'development' ? fs.readFileSync('server/key/privateUser.key', 'utf8') : process.env.PRIVATE_USER_KEY;
}

//====================================
// CONFIGURACION DE MAIL
//====================================

class Mail {
    static from = 'developeromega98@gmail.com' || process.env.EMAIL_FROM;
    static password = process.env.EMAIL_PASSWORD;
    static subject = "Confirmando cuenta DepartamentStore";
    static html(user) {
        return `
            <div>
                <h1>Confirmación de cuenta de ${user.email}.</h1>

                <form method="POST" action="http://localhost:3000/api/v1/users/${user.id}/auth-mail" >
                    <button type="submit"> Confirmar cuenta </button>
                </form>
            </div>
        `
    }
}

//====================================
// BASE DE DATOS
//====================================
class DatabaseEnv {
    static host = nodeEnv === 'development' ? '127.0.0.1' : process.env.HOST ;
    static user = nodeEnv === 'development' ? 'postgres' : process.env.USER;
    static password = nodeEnv === 'development' ? '1234': process.env.PASSWROD;
    static database = nodeEnv === 'development' ? 'departament_store' : process.env.DATABASE;
    static dialect = nodeEnv === 'development' ? 'postgres' : 'postgres'
}


module.exports = { 
    port, nodeEnv, JwtEnv, DatabaseEnv, Mail
}