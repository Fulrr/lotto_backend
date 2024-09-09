const LottoService = require('../services/lotto.services');
const TicketService = require('../services/ticket.services');
const WalletService = require('../services/wallet.services');

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

exports.buyLotto = async (req, res, next) => {
    try {
        const { userId, lottoNumber } = req.body;

        // ตรวจสอบว่า lotto มีอยู่จริง
        const lotto = await LottoService.getLottoByNumber(lottoNumber);
        if (!lotto) {
            return res.status(404).json({ status: false, message: 'Lotto not found' });
        }

        // ตรวจสอบยอดเงินในกระเป๋าเงินของผู้ใช้
        const wallet = await WalletService.getWalletByUserId(userId);
        if (!wallet) {
            return res.status(404).json({ status: false, message: 'Wallet not found' });
        }

        // ตรวจสอบว่าผู้ใช้มีเงินเพียงพอในการซื้อ
        if (wallet.Balance < lotto.Price) {
            return res.status(400).json({ status: false, message: 'Insufficient funds' });
        }

        // ลดยอดเงินในกระเป๋า
        await WalletService.updateWalletBalance(userId, -lotto.Price);

        // สร้าง ticket
        const ticket = await TicketService.createTicket(userId, lotto._id);

        res.json({ status: true, message: 'Lotto purchased successfully', data: ticket });
    } catch (error) {
        next(error);
    }
};

exports.randomBuyLotto = async (req, res, next) => {
    try {
        const { userId } = req.body;

        // ดึงลอตเตอรีทั้งหมด
        const lottos = await LottoService.getAllLottos();
        if (lottos.length === 0) {
            return res.status(404).json({ status: false, message: 'No lottos available' });
        }

        // เลือกลอตเตอรีแบบสุ่ม
        const randomIndex = Math.floor(Math.random() * lottos.length);
        const randomLotto = lottos[randomIndex];

        // ตรวจสอบกระเป๋าเงินของผู้ใช้
        const wallet = await WalletService.getWalletByUserId(userId);
        if (!wallet) {
            return res.status(404).json({ status: false, message: 'Wallet not found' });
        }

        // ตรวจสอบยอดเงินในกระเป๋า
        if (wallet.Balance < randomLotto.Price) {
            return res.status(400).json({ status: false, message: 'Insufficient funds' });
        }

        // ลดยอดเงินในกระเป๋า
        await WalletService.updateWalletBalance(userId, -randomLotto.Price);

        // สร้างตั๋ว (ticket)
        const ticket = await TicketService.createTicket(userId, randomLotto._id);

        res.json({ status: true, message: 'Lotto purchased successfully', data: ticket });
    } catch (error) {
        next(error);
    }
};