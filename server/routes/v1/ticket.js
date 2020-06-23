const express = require('express');
const app = express();
const { authUser, authAdminOrUser ,authAdmin } = require('../../middlewares/authJwt');
const { authTicketByUser } = require('../../middlewares/authComponents');
const { Ticket, Product } = require('../../../models');

app.get('/api/v1/tickets', authAdmin, async (req, res) => {

    try {
        let tickets = await Ticket.findAll();

        if(tickets.length < 1){
            return res.status(404).json({
                ok: false,
                err: {
                    message: "No hay registros existentes"
                }
            })
        }

        return res.json({
            ok: true,
            tickets
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

app.get('/api/v1/tickets/:id', [authAdminOrUser, authTicketByUser], async (req, res) => {
    let id = req.params.id;
    
    try {
        let ticket = await Ticket.findByPk(id, {
            include: {model: Product}
        });

        if(!ticket){
            return res.status(404).json({
                ok: false,
                err: {
                    message: "El registro no existe"
                }
            });
        }

        return res.json({
            ok: true,
            ticket
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

app.post('/api/v1/tickets', authUser, async (req, res) => {
    let body = req.body;

    try {
        let ticket = await Ticket.create({
            userId: req.user.id,
            payment: body.payment,
            bancAccount: body.bancAccount,
        });

        return res.json({
            ok: true,
            ticket
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

app.put('/api/v1/tickets/:id', [authUser, authTicketByUser], async (req, res) => {
    let id = req.params.id;
    let body = req.body;

    delete body.userId;

    try {
        let query = await Ticket.update(body, {where: {id}});

        if(query[0] === 0){
            return res.status(400).json({
                ok: false,
                err: {
                    message: "El registro es incorrecto"
                }
            })
        }

        let ticket = await Ticket.findByPk(id, {
            include: [{model: Product}]
        });

        let total = 0;
        ticket.Products.forEach( product => total += product.price );

        ticket.total = total;
        await ticket.save();

        return res.json({
            ok: true,
            ticket
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

app.delete('/api/v1/tickets/:id', [authAdminOrUser, authTicketByUser], async (req, res) => {
    let id = req.params.id;

    try {
        let query = await Ticket.destroy({where: {id}});

        if(query === 0){
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El registro no se elimono correctamente'
                }
            })
        }

        return res.json({
            ok: true,
            message: "El registro se elimino con exito"
        })
    } catch (error) {
        return res.status(400).json({
            ok: true,
            err: {
                message: error.message 
            }
        })
    }
});


module.exports = app;