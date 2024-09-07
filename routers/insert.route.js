const express = require('express');
const router = express.Router();
const inserted = require('../controller/insert.controller');

// ตั้งค่าเส้นทางสำหรับสร้างข้อมูลล็อตโต้
router.post('/c-lotto', inserted.createLottoData);
router.post('/resetLotto', inserted.resetLotto);

module.exports = router;
