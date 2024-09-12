const router = require('express').Router();
const TicketController = require('../controller/ticket.controller');

router.get('/ticket', TicketController.getAllTicket);
router.post('/delT/:userId', TicketController.delT);
router.get('/ticket/:userId', TicketController.TgetOne);

module.exports = router;