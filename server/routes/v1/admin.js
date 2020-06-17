const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const { authAdmin } = require('../../middlewares/authJwt');
const { authSuperAdmin } = require('../../middlewares/authComponents');
const { Admin, Brand } = require('../../../models');

app.get('/api/v1/admins', authAdmin, async (req, res) => {

    try {
        let admins = await Admin.findAll({
            include: [
                {
                    model: Brand
                }
            ]
        });
        
        if(admins.length < 1){
            return res.status(404).json({
                ok: false,
                err: {
                    message: "No hay registros que mostrar"
                }
            })
        }

        return res.status(200).json({
            ok: true,
            admins 
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

app.get('/api/v1/admins/:id', authAdmin, async (req, res) => {
    let id = req.params.id;

    try {
        let admin = await Admin.findByPk(id);

        if(!admin){
            return res.status(404).json({
                ok: false,
                err:{
                    message: "No existe el registro"
                }
            })
        }

        return res.json({
            ok: true,
            admin
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            err: {
                message: error.message
            }
        })
    }
})

app.post('/api/v1/admins', [authAdmin, authSuperAdmin], async (req, res) => {
    let body = req.body;

    console.log(body);

    try {
        let admin = await Admin.create({
            name: body.name,
            email: body.email,
            password: bcrypt.hashSync(body.password, 10),
            superAdmin: parseInt(body.superAdmin) == 1 ? 1 : 0      
        });

        return res.json({
            ok: true,
            admin
        });

    } catch (error) {
        return res.status(400).json({
            ok: false,
            err: {
                message: error.message
            }
        });
    }

})

app.put('/api/v1/admins/:id', [authAdmin, authSuperAdmin], async (req, res) => {
    let body = req.body;
    let id = req.params.id;

    delete body.password;

    try {
        let query = await Admin.update(body, {where: { id: req.params.id}}); 
        
        if(query[0] === 0){
            return res.status(400).json({
                ok: false,
                err: {
                    message: "El registro no existe"
                }
            });    
        }

        let data = await Admin.findByPk(id);
        return res.json({
            ok: true,
            admin: data
        })        
    } catch (error) {
        return res.status(400).json({
            ok: false,
            err: {
                message: error.message
            }
        })
    }
});

app.delete('/api/v1/admins/:id', [authAdmin, authSuperAdmin], async (req, res) => {
    let id = req.params.id;


    try {
        let query = await Admin.destroy({where: {id}});

        if(query === 0){
            return res.status(400).json({
                ok: false,
                err: {
                    message: "El registro no existe"
                }
            })    
        }

        return res.json({
            ok: true,
            message: "El administrador se ha eliminado con exito"
        })

    } catch (error) {
        return res.json({
            ok: false,
            err: {
                message: error.message
            }
        })
    }
});

module.exports = app;
