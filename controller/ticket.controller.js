const TicketService = require('../services/ticket.services');

exports.getAllTicket = async (req, res, next) => {
    try {
        const ticket = await TicketService.getAllTicket();
        res.json({ status: true, data: ticket });
    } catch (error) {
        next(error);
    }
};

exports.delT = async (req, res, next) => {
    try {
        const {userId} = req.params;
        const delT = await TicketService.delT(userId);
        if (!delT) {
            return res.status(404).json({ status: false, message: 'not found' });
        }
        res.json({ status: true, data: delT });
    } catch (error) {
        next(error);
    }
};