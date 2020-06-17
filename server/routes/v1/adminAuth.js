const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { JwtEnv } = require('../../config/config');
const { Admin } = require('../../../models');

app.post('/api/v1/login/admin', async (req, res) => {
    let body = req.body;

    try {
        let admin = await Admin.findOne({where: {email: body.email}});

        if(!admin){
            return res.status(401).json({
                ok: false,
                err: {
                    message: "EL usuario y contraseña son incorrectos"
                }
            });
        }

        if( !bcrypt.compareSync(body.password, admin.password) ){
            return res.status(401).json({
                ok: false,
                err: {
                    message: "EL usuario y contraseña son incorrectos"
                }
            })
        }

        let token = jwt.sign({ admin }, JwtEnv.privateAdminKey, JwtEnv.signOptions);

        return res.json({
            ok: true,
            admin,
            token
        });
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            err: {
                message: error.message
            }
        })        
    }
});

module.exports = app;