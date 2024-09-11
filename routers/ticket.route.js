const router = require('express').Router();
const TicketController = require('../controller/ticket.controller');

router.get('/ticket', TicketController.getAllTicket);
router.delete('/delT/:userId', TicketController.delT);

module.exports = router;