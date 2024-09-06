const Lotto = require('../model/lotto.model'); 

exports.getAllLottos = async () => {
    return await Lotto.find();
};

exports.getLottoByNumber = async (lottoNumber) => {
    return await Lotto.findOne({ LottoNumber: lottoNumber });
};