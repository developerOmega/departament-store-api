const { Ticket } = require('../../models');


const authUserId = (req, res, next) => {
    if(!req.user){
        return next();
    }

    let id = req.params.id;

    if(req.user.id != id){
        return res.status(403).json({
            ok: false,
            err: {
                message: "No tiene permisos para ver esta información"
            }
        })
    }

    next();
}

const authTicketByUser= async ( req, res, next ) => {
    if(!req.user){
        return next();
    }

    let id = req.params.id;
    let ticket = await Ticket.findByPk(id);

    if(ticket.userId != req.user.id){
        return res.status(403).json({
            ok: false,
            err: {
                message: "No tiene permisos para ver esta información"
            }
        })
    }

    next();

}

const authSuperAdmin = (req, res, next) => {
    if(req.admin.superAdmin == false){
        return res.status(403).json({
            ok: false,
            err: {
                message: "No tiene permisos para ver esta información"
            }
        })
    }

    next();
}

module.exports = {
    authUserId, authSuperAdmin, authTicketByUser
}