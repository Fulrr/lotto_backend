const Ticket = require('../model/ticket.model');
const LottoSer = require('../services/lotto.services')
const LottoMo = require('../model/lotto.model');
const userMo = require('../model/user.model');

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

exports.deleteAllTickets = async () => {
    try {
        const result = await Ticket.deleteMany({});
        return result;
    } catch (error) {
        console.error('Error deleting all tickets:', error);
        throw new Error('Failed to delete all tickets');
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

            const nameU = await userMo.findOne({ _id: userId });
            console.log('xxx:', nameU.name);

            return {
                name: nameU.name,
                id: user.UserID,
                ticket: ticket.LottoNumber || {}
            };
        } catch (err) {
            console.error(`Failed to fetch wallet for user ${user.UserID}:`, err);
            return {
                name: nameU.name,
                id: user.UserID,
                ticket: ticket.LottoNumber || {}
            };
        }

    } catch (error) {
        console.error('Error fetching user and wallet:', error);
        throw error;
    }
};

exports.delTN = async (num, userId) => {
    try {
        const uid = Ticket.find();

        console.log(uid);
        
        if (!mongoose.Types.ObjectId.isValid(num)) {
            console.log('Invalid ObjectId:', num);
            return { success: false, message: 'Invalid ticket ID format' };
        }

        const ticketId = new mongoose.Types.ObjectId(num);

        // Find the ticket by _id
        const ticket = await Ticket.findById(ticketId);

        if (!ticket) {
            console.log('Ticket not found for Id:', num);
            return { success: false, message: 'Ticket not found' };
        }

        // Check if the ticket belongs to the provided userId
        if (ticket.UserID.toString() !== userId.toString()) {
            console.log('UserId mismatch for ticket:', num);
            return { success: false, message: 'Unauthorized action' };
        }

        // Delete the ticket if it belongs to the user
        const result = await Ticket.deleteOne({ _id: ticketId });
        return { success: true, result };

    } catch (error) {
        console.error('Error deleting ticket:', error);
        return { success: false, message: 'Error deleting ticket' };
    }
};