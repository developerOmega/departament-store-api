const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { JwtEnv } = require('../../config/config');
const { User } = require('../../../models');


app.post('/api/v1/login/user', async (req, res) => {
    let body = req.body;

    try {
        let user = await User.findOne({where: {email: body.email}});

        if(!user){
            return res.status(401).json({
                ok: false,
                err: {
                    message: "EL usuario y contraseña son incorrectos"
                }
            });
        }

        if( !bcrypt.compareSync(body.password, user.password) ){
            return res.status(401).json({
                ok: false,
                err: {
                    message: "EL usuario y contraseña son incorrectos"
                }
            });
        }

        let token = jwt.sign({ user }, JwtEnv.privateUserKey, JwtEnv.signOptions);

        return res.json({
            ok: false,
            user,
            token
        });

    } catch (error) {
        return res.status(400).json({
            ok: false,
            err: {
                message: error.message
            }
        });
    }
});

module.exports = app;