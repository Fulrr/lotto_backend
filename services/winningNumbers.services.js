const winningNumbers = require('../model/winningNumbers.model');
const Lotto = require('../model/lotto.model');

exports.randomWinning = async () => {
    try {
        // สุ่มหมายเลข 1-100
        const number = Math.floor(Math.random() * 100) + 1;

        // ค้นหาหมายเลขล็อตโต้ที่ตรงกับหมายเลขสุ่ม
        const winning = await Lotto.findOne({ lotto: number });

        if (!winning) {
            return null; // ไม่พบหมายเลขล็อตโต้
        }

        const numberwin = winning.LottoNumber;

        // สร้างเอกสารใหม่ใน winningNumbers
        const winningRecord = new winningNumbers({
            DrawDate: new Date(),
            LottoWin: numberwin
        });

        // บันทึกเอกสารใหม่ใน MongoDB
        await winningRecord.save();

        return {
            DrawDate: winningRecord.DrawDate,
            LottoWin: winningRecord.LottoWin
        };
    } catch (error) {
        console.error('Error in service:', error);
        throw error; // ขึ้นอยู่กับการจัดการข้อผิดพลาดใน controller
    }
};

exports.resetWin = async () => {
    await winningNumbers.deleteMany({});
};
