const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const { authAdmin, authAdminOrUser } = require('../../middlewares/authJwt');
const { authUserId } = require('../../middlewares/authComponents');
const { User } = require('../../../models');

app.get('/api/v1/users', authAdmin, async ( req, res ) => {
    try {
        let users = await User.findAll();

        if(users.length < 1){
            return res.status(404).json({
                ok: false,
                err: {
                    message: "No hay registros existentes"
                }
            })
        }

        return res.json({
            ok: true,
            users
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            err: {
                message: error.message
            }
        })     
    }
});

app.get('/api/v1/users/:id', [authAdminOrUser, authUserId], async (req, res) => {
    let id = req.params.id;

    try {
        let user = await User.findByPk(id);

        if(!user){
            return res.status(404).json({
                ok: false,
                err: {
                    message: "El registro no existe"
                }
            })
        }

        return res.json({
            ok: true,
            user
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            err: {
                message: error.message
            }
        })
    }
});

app.post('/api/v1/users', async (req, res) => {
    let body = req.body;

    try {
        let user = await User.create({
            name: body.name,
            email: body.email,
            password: bcrypt.hashSync(body.password, 10),
        });

        return res.json({
            ok: true,
            user
        })
    } catch (error) {
        return res.status(400).json({
            ok: false,
            err: {
                message: error.message
            }
        });
    }

    
})

app.put('/api/v1/users/:id', [authAdminOrUser, authUserId], async (req, res) => {
    let id = req.params.id;
    let body = req.body;

    delete body.password;

    try {
        let query = await User.update(body, {where: {id}});

        if(query[0] === 0){
            return res.status(400).json({
                ok: false,
                err: {
                    message: "El registro es incorrecto"
                }
            });
        }

        let user = await User.findByPk(id);

        return res.json({
            ok: true,
            user
        });
    } catch (error) {
        return res.status(400).json({
            ok: false,
            err: {
                message: error.message
            }
        })
    }
})

app.delete('/api/v1/users/:id', [authAdminOrUser, authUserId], async (req, res) => {
    let id = req.params.id;

    try {
        let query = await User.destroy({where: {id}});

        if(query == 0){
            return res.status(400).json({
                ok: false,
                err: {
                    message: "El registro no se pudo eliminar correctamente"
                }
            })
        }

        return res.json({
            ok: true,
            message: "El registr se puedo eliminar con exito"
        })
    } catch (error) {
        return res.status(400).json({
            ok: false,
            err: {
                message: error.message
            }
        })
    }
})


module.exports = app;
