const Lotto = require('../model/lotto.model'); 

exports.getAllLottos = async () => {
    return await Lotto.find();
};

exports.getLottoByNumber = async (lottoNumber) => {
    try {
        const result = await Lotto.find({
            LottoNumber: { $regex: lottoNumber, $options: 'i' }
        });
        return result;
    } catch (error) {
        console.error('Error fetching lotto number:', error);
        throw error; 
    }
};