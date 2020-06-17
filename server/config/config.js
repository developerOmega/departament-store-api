const fs = require('fs');

//====================================
// Puerto
//====================================
const port =  process.env.PORT || 3000;


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
// BASE DE DATOS
//====================================
class DatabaseEnv {
    static host = nodeEnv === 'development' ? '127.0.0.1' : process.env.HOST ;
    static user = nodeEnv === 'development' ? 'root' : process.env.USER;
    static password = nodeEnv === 'development' ? '1234': process.env.PASSWROD;
    static database = nodeEnv === 'development' ? 'departament_store' : process.env.DATABASE;
    static dialect = nodeEnv === 'development' ? 'mysql' : 'pg'
}


module.exports = { 
    port, nodeEnv, JwtEnv, DatabaseEnv
}