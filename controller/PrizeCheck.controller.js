const prizeCheckService = require('../services/PrizeCheck.service');

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
