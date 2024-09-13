const router = require('express').Router();
const TicketController = require('../controller/ticket.controller');

router.get('/ticket', TicketController.getAllTicket);
<<<<<<< HEAD
router.delete('/delT/:userId', TicketController.delT);
=======
router.post('/delT/:userId', TicketController.delT);
>>>>>>> be761d4a61171504743f9973753756c1acd8550d
router.delete('/delAllT', TicketController.delAllT);
router.get('/ticket/:userId', TicketController.TgetOne);

module.exports = router;
