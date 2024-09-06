const LottoService = require('../services/lotto.services');

exports.getAllLottos = async (req, res, next) => {
    try {
        const lottos = await LottoService.getAllLottos();
        res.json({ status: true, data: lottos });
    } catch (error) {
        next(error);
    }
};

exports.getLottoByNumber = async (req, res, next) => {
    try {
        const { lottoNumber } = req.params;
        const lotto = await LottoService.getLottoByNumber(lottoNumber);
        if (!lotto) {
            return res.status(404).json({ status: false, message: 'Lotto not found' });
        }
        res.json({ status: true, data: lotto });
    } catch (error) {
        next(error);
    }
};