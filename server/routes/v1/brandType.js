const express = require('express');
const app = express();
const { authAdmin } = require('../../middlewares/authJwt');
const { BrandType } = require('../../../models');


app.get('/api/v1/brand-types', authAdmin, async (req, res) => {
    try {
        let brandTypes = await BrandType.findAll();

        return res.json({
            ok: true,
            brandTypes
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

app.post('/api/v1/brand-types', authAdmin, async (req, res) => {
    let body = req.body;
    
    try {
        let brandType = await BrandType.create({
            brandId: parseInt(body.brand_id),
            typeId: parseInt(body.type_id),
        });

        return res.json({
            ok: true,
            brandType
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

app.delete('/api/v1/brand-types/:brand_id/:type_id', authAdmin, async (req, res) => {
    let brandId = req.params.brand_id;
    let typeId = req.params.type_id;

    try {
        let query = await BrandType.destroy({ where: { brandId, typeId } });

        if(query === 0){
            return res.status(400).json({
                ok: false,
                err: {
                    message: "El registro no se limino correctamente"
                }
            })
        }

        return res.json({
            ok: true,
            message: "El registro se elimino con exito"
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


module.exports = app;