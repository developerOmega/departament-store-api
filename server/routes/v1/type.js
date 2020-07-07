const express = require('express');
const app = express();
const { authAdmin, authAdminOrUser } = require('../../middlewares/authJwt');
const { Type, Admin, Brand } = require('../../../models');

app.get('/api/v1/types', authAdminOrUser, async (req, res) => {

    try {
        let types = await Type.findAll(
            {
                include: { model: Admin }
            }
        );

        if(types.length < 1){
            return res.status(404).json({
                ok: false,
                err: {
                    message: "No hay registros existentes"
                }
            })
        }

        return res.json({
            ok: true,
            types
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            err: {
                message: error.message
            }
        });
    }

});

app.get('/api/v1/types/:id', authAdminOrUser, async (req, res) => {
    let id = req.params.id;

    try {
        let type = await Type.findByPk(id, {
            include: [{ model: Admin}, {model: Brand, as: 'Brands' }]
        });
        
        if(!type){
            return res.status(404).json({
                ok: false,
                err: {
                    message: "El registro no existe"
                }
            });
        }

        return res.json({
            ok: true,
            type
        })
    } catch (error) {
        return res.status(500).json({
            ok: true,
            err: {
                message: error.message
            }
        });
    }
});

app.post('/api/v1/types', authAdmin, async (req, res) => {
    let body = req.body;

    try {
        let type = await Type.create({
            name: body.name,
            adminId: req.admin.id
        });

        return res.json({
            ok: true,
            type
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

app.put('/api/v1/types/:id', authAdmin, async (req, res) => {
    let body = req.body;
    let id = req.params.id;
    
    try {
        let query = await Type.update(body, {where: {id}});

        if(query[0] === 0){
            return res.status(400).json({
                ok: false, 
                err: {
                    message: "El registro es incorrecto"
                }
            })
        }

        let type = await Type.findByPk(id, { include: { model: Admin } });

        return res.json({
            ok: true,
            type
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

app.delete('/api/v1/types/:id', authAdmin, async (req, res) => {
    let id = req.params.id;

    try {
        let query = await Type.destroy({where: {id}});

        if(query === 0){
            return res.status(400).json({
                ok: false,
                err:{
                    message: "El registro no se elimino correctamente"
                }
            });
        }

        return res.json({
            ok: true,
            message: "El registro fue eliminado con exito"
        });

    } catch (error) {
        return res.status(400).json({
            ok: false,
            err: {
                message: error.message
            }
        })
    }
});

app.get('/api/v1/types/:id/brands', authAdminOrUser, async (req, res) => {
    let id = req.params.id;
    
    try {
        let type =  await Type.findByPk(id, {
            include: {model: Brand, as: 'Brands'}
        });

        let brands = type.Brands;

        if(brands.length < 1){
            return res.status(40).json({
                ok: false,
                err: {
                    message: "No hay registros existentes"
                }
            })
        }

        return res.json({
            ok: true,
            brands
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            err:{
                message: error.message
            }
        })
    }
});

module.exports = app;