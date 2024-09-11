const Ticket = require('../model/ticket.model');
const LottoSer = require('../services/lotto.services')
const LottoMo = require('../model/lotto.model');

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

exports.TgetOne = async (userId) => {
    try {
        const user = await Ticket.findOne({ UserID: userId });
        
        if (!user) {
            console.log('User not found for userId:', userId);
            return {
                id: null,
                ticket: {}
            };
        }
        console.log('User found:', user);

        // Try fetching the wallet information
        try {
            const ticket = await LottoMo.findOne({ _id: user.LottoID });
            console.log('Wallet fetched:', ticket);

            return {
                id: user.UserID,
                ticket: ticket.LottoNumber || {}
            };
        } catch (err) {
            console.error(`Failed to fetch wallet for user ${user.UserID}:`, err);
            return {
                id: user.UserID,
                ticket: ticket.LottoNumber || {}
            };
        }

    } catch (error) {
        console.error('Error fetching user and wallet:', error);
        throw error;
    }
};

