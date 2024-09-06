const router = require('express').Router();
const LottoController = require('../controller/lotto.controller');

router.get('/lottos', LottoController.getAllLottos);
router.get('/lotto/:lottoNumber', LottoController.getLottoByNumber);

module.exports = router;