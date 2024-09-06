const connection = require('./config/db'); // ใช้การเชื่อมต่อที่ส่งออกจาก config/db
const Lotto = require('./model/lotto.model');

// ฟังก์ชันสำหรับสร้างเลขลอตเตอรี่ 6 หลักแบบสุ่ม
const generateRandomLottoNumber = () => {
    let number = '';
    for (let i = 0; i < 6; i++) {
        number += Math.floor(Math.random() * 10); // สุ่มเลข 0-9
    }
    return number;
};

// ฟังก์ชันสำหรับแทรกข้อมูลล็อตโต้ลงใน MongoDB
const insertLottoData = async () => {
    try {
        // รอให้เชื่อมต่อเสร็จสิ้น
        await new Promise((resolve, reject) => {
            connection.once('open', resolve);
            connection.once('error', reject);
        });

        // ลบข้อมูลที่มีอยู่ก่อนหน้านี้
        await Lotto.deleteMany({});

        // สร้างข้อมูลล็อตโต้สุ่ม 100 ข้อมูล
        const lottos = [];
        for (let i = 0; i < 100; i++) {
            lottos.push({
                LottoNumber: generateRandomLottoNumber(), // เปลี่ยนชื่อฟิลด์เป็น `LottoNumber`
                DrawDate: new Date(), // วันปัจจุบัน
                Price: 80 ,// ราคาแบบสุ่ม
                Amount: 1
            });
        }

        // แทรกข้อมูลล็อตโต้ลงใน MongoDB
        await Lotto.insertMany(lottos);
        console.log('Successfully inserted 100 lotto records.');

    } catch (error) {
        console.error('Error inserting lotto data:', error);
    } finally {
        // ปิดการเชื่อมต่อกับ MongoDB
        connection.close();
    }
};

// เรียกใช้ฟังก์ชันเพื่อเริ่มการแทรกข้อมูล
insertLottoData();
