const prizeCheckService = require('../services/PrizeCheck.service');
const WalletService = require('../services/wallet.services');

exports.checkPrizes = async (req, res) => {
    try {
        const { userId, drawDate } = req.body;

        // ตรวจสอบการป้อนข้อมูล
        if (!userId || !drawDate) {
            return res.status(400).json({ error: 'ต้องระบุ userId และ drawDate' });
        }

        // เรียกใช้งาน service method
        const result = await prizeCheckService.checkUserPrizes(userId, drawDate);

        // ส่งผลลัพธ์กลับเป็น response
        return res.status(200).json(result);
    } catch (error) {
        // จัดการกับข้อผิดพลาด
        return res.status(400).json({ error: error.message });
    }
};

exports.PlussPrizes = async (req, res, next) => {
    try {
        // Extract userId and prize amount from the request body
        const { userId, prize } = req.body;

        // Validate input
        // if (!userId || typeof prize !== 'number') {
        //     return res.status(400).json({ status: false, message: 'Invalid input' });
        // }

        // Call the service function to update the wallet balance
        const result = await prizeCheckService.PlussPrizes(userId, prize);

        // Respond based on the result
        if (result.status) {
            res.json({ status: true, message: result.message });
        } else {
            res.status(400).json({ status: false, message: result.message });
        }
    } catch (error) {
        // Handle unexpected errors
        console.error("Error in addPrizesToWallet:", error);
        next(error);
    }
};
