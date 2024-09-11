const Ticket = require('../model/ticket.model');

exports.getAllTicket = async () => {
    return await Ticket.find();
};

exports.createTicket = async (userId, lottoId) => {
    const ticket = new Ticket({
        UserID: userId,
        LottoID: lottoId
    });
    return await ticket.save();
};

exports.delT = async (userId) => {
    try {
        const result = await Ticket.deleteMany({ UserID: userId });
        return result; 
    } catch (error) {
        const result = await Ticket.deleteMany({ UserID: userId });
        return result;
    }
};
