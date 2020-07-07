const express = require('express');
const app = express();
const { authAdmin, authAdminOrUser } = require('../../middlewares/authJwt');
const { Product, Admin, Type, Brand } = require('../../../models');

app.get('/api/v1/products', authAdminOrUser, async (req, res) => {
    let brandId = req.query.brandId || 0;
    let typeId = req.query.typeId || 0;
    let where = {};

    if(brandId != 0){
        where.brandId = brandId;
    }

    if(typeId != 0){
        where.typeId = typeId;
    }
    
    try {
        let products = await Product.findAll({where, include: {model: Brand}});

        if(products.length < 1){
            return res.status(404).json({
                ok: false,
                err:{
                    message: "No hay registros existenetes"
                }
            });
        }

        return res.json({
            ok: true,
            products
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

app.get('/api/v1/products/:id', authAdminOrUser, async (req, res) => {
    let id = req.params.id;

    try {
        let product = await Product.findByPk(id, {
            include: [{ model: Admin }, {model: Brand}, {model: Type, as: 'Types'}]
        });

        if(!product){
            return res.status(404).json({
                ok: false,
                err: {
                    message: "El registro no existe"
                }
            });
        }

        return res.json({
            ok: true,
            product
        });
    } catch (error) {

        return res.status(400).json({
            ok: true,
            err: {
                message: error.message
            }
        });

    }
});

app.post('/api/v1/products', authAdmin, async (req, res) => {
    let body = req.body;

    try {
        let product = await Product.create({
            name: body.name,
            description: body.description,
            price: body.price,
            adminId: req.admin.id,
            brandId: body.brandId,
            typeId: body.typeId
        });

        return res.json({
            ok: true, 
            product
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

app.put('/api/v1/products/:id', authAdmin, async (req, res) => {
    let id = req.params.id;
    let body = req.body;
    body.adminId = req.admin.id;

    try {
        let query = await Product.update(body, {where: {id}});

        if(query[0] === 0){
            return res.status(400).json({
                ok: false,
                err:{
                    message: "El registro es incorrecto"
                }
            });
        }

        let product = await Product.findByPk(id, {
            include: [{ model: Admin }, {model: Brand}, {model: Type, as: 'Types'}]
        });

        return res.json({
            ok: true,
            product
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

app.delete('/api/v1/products/:id', authAdmin, async (req, res) => {
    let id = req.params.id;

    try {
        let query = Product.destroy({where: {id}});

        if(query === 0){
            return res.status(400).json({
                ok: false,
                err: {
                    message: "El registro no se elimino correctamente"
                }
            });
        }

        return res.json({
            ok: true,
            message: "El registro se elimino con exito"
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

module.exports = app;