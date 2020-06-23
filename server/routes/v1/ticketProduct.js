const express = require('express');
const app = express();
const { authUser, authAdmin } = require('../../middlewares/authJwt');
const { TicketProduct } = require('../../../models');

app.get('/api/v1/ticket-products', authAdmin, async (req, res) => {
    try {
        let ticketProducts = await TicketProduct.findAll();

        if(ticketProducts.length < 1){
            return res.status(404).json({
                ok: false,
                err: {
                    message: "No hay resitros existentes"
                }
            });
        }

        return res.json({
            ok: true,
            ticketProducts
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            err:{
                message: error.message
            }
        })
    }
});

app.post('/api/v1/ticket-products', authUser, async (req, res) => {
    let body = req.body;

    try {
        let ticketProduct = await TicketProduct.create({
            ticketId:body.ticketId,
            productId: body.productId
        });

        return res.json({
            ok: true,
            ticketProduct
        });
    } catch (error) {
        return res.status(400).json({
            ok: false,
            err:{
                message: error.message
            }
        })
    }
});

app.delete('/api/v1/ticket-products/:ticketId/:productId', authUser, async (req, res) => {
    let ticketId = req.params.ticketId;
    let productId = req.params.productId;

    try {
        let query = await TicketProduct.destroy({where: { ticketId, productId }});

        if( query === 0 ){
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