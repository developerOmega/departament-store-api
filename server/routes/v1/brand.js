const express = require('express');
const app = express();
const { authAdmin, authAdminOrUser } = require('../../middlewares/authJwt');
const { Brand, Admin, Type, Product } = require('../../../models');


app.get('/api/v1/brands', authAdminOrUser, async (req, res) => {
    
    try {
        let brands = await Brand.findAll({
            include: [
                {
                    model: Admin
                }
            ]
        });
        
        if(brands.length < 1){
            return res.status(404).json({
                ok: false,
                err: {
                    message: "No hay registros existentes"
                }
            })
        }

        return res.json({
            ok: true,
            brands
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

app.get('/api/v1/brands/:id', authAdminOrUser, async (req, res) => {
    let id = req.params.id; 
    
    try {
        let brand = await Brand.findByPk(id, {
            include: [{model: Admin}, {model: Type, as: 'Types'}, {model: Product}]
        });
        if(!brand){
            return res.status(404).json({
                ok: false,
                err: {
                    message: "El registro no existe"
                }
            })
        }

        return res.json({
            ok: true,
            brand
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

app.post('/api/v1/brands', authAdmin, async (req, res) => {
    let body = req.body;

    try {
        let brand = await Brand.create({
            name: body.name,
            adminId: req.admin.id
        });

        return res.json({
            ok: true,
            brand
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

app.put('/api/v1/brands/:id', authAdmin, async (req, res) => {
    let id = req.params.id;
    let body = req.body;
    body.adminId = req.admin.id;

    try {
        let query = await Brand.update(body, {where: {id}});

        if(query[0] === 0){
            return res.status(400).json({
                ok: false,
                err: {
                    message: "El registro es incorrecto"
                }
            })
        }

        let brand = await Brand.findByPk(id, {
            include: { model: Admin }
        });

        return res.json({
            ok: true,
            brand
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

app.delete('/api/v1/brands/:id', authAdmin, async (req, res) => {
    let id = req.params.id;

    try {
        let query = await Brand.destroy({where: {id}});
        
        if(query === 0){
            return res.status.json({
                ok: false,
                err: {
                    message: "El registro no se pudo eliminar correctamente"
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
        });
    }
});


app.get('/api/brands/:id/types', authAdminOrUser, async (req, res) => {
    let id = req.params.id;
    
    try {
        let brand = await Brand.findByPk(id, {
            include: {model: Type}
        })

        let types = brand.Types;

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
        return res.json({
            ok: true,
            err: {
                message: error.message
            }
        })
    }
});

module.exports = app;