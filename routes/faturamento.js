const express = require('express');
const router = express.Router();

const FaturamentoController = require('../app/controllers/FaturamentoController');

router.post('/faturamento', FaturamentoController.postFaturamento);

module.exports = router;