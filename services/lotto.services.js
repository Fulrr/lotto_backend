const Lotto = require('../model/lotto.model'); 
const TicketModel = require('../model/ticket.model');
const mongoose = require('mongoose');

exports.getAllLottos = async () => {
    return await Lotto.find();
};

exports.getLottoByNumber = async (lottoNumber) => {
    const regex = new RegExp(lottoNumber);
    if (lottoNumber) {
        return await Lotto.find({ LottoNumber: { $regex: regex } });
    } else {
        return await Lotto.findOne({ LottoNumber: lottoNumber });
    }
}; 

exports.updateLottoAmount = async (lottoId, amount) => {
    return await Lotto.findByIdAndUpdate(lottoId, { Amount: amount }, { new: true });
};

exports.getAvailableLottos = async () => {
    return await Lotto.find({ Amount: 1 });
};

exports.getUserLottos = async (userId) => {
    try {
        // ตรวจสอบและแปลง userId เป็น ObjectId
        let userObjectId;
        try {
            userObjectId = new mongoose.Types.ObjectId(userId);
        } catch (error) {
            throw new Error('Invalid user ID format');
        }
        
        const tickets = await TicketModel.find({ UserID: userObjectId });
        
        if (tickets.length === 0) {
            return []; // ส่งอาร์เรย์ว่างถ้าไม่พบ tickets
        }
        
        const lottoPromises = tickets.map(ticket =>
            Lotto.findById(ticket.LottoID)
        );
        const lottos = await Promise.all(lottoPromises);
        
        const userLottos = tickets.map((ticket, index) => ({
            ticketId: ticket._id,
            purchaseDate: ticket.PurchaseDate,
            lottoNumber: lottos[index]?.LottoNumber,
            drawDate: lottos[index]?.DrawDate,
            price: lottos[index]?.Price,
            amount: lottos[index]?.Amount
        }));
        
        return userLottos;
    } catch (error) {
        throw error;
    }
};