const jwt = require('jsonwebtoken');
const { JwtEnv } = require('../config/config');

const authAdmin = (req, res, next) => {
    let token = req.get('Authorization');

    jwt.verify(token, JwtEnv.publicAdminKey, JwtEnv.verifyOptions, (err, decode) => {
        if(err){
            return res.status(401).json({
                ok: false,
                err: {
                    message: err.message
                }
            });
            
        }
        req.admin = decode.admin;

        next();

    });
}

const authUser = (req, res, next) => {
    let token = req.get('Authorization');

    jwt.verify(token, JwtEnv.publicUserKey, JwtEnv.verifyOptions, (err, decode) => {
        if(err){
            return res.status(401).json({
                ok: false,
                err:{
                    message: err.message
                }
            });
        }
        req.user = decode.user;
            
        next();
    });
}

const authAdminOrUser = (req, res, next) => {
    let token = req.get('Authorization');

    jwt.verify(token, JwtEnv.publicAdminKey, JwtEnv.verifyOptions, (err, decode) => {
        if(err){
            return authUser(req,res,next);
        }
        req.admin = decode.admin;

        next();

    });
}

module.exports = {
    authAdmin, authUser, authAdminOrUser
}