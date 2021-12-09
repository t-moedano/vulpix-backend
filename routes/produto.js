const express = require('express');
const router = express.Router();

const ProdutoController = require('../app/controllers/ProdutoController');

router.get('/produtos', ProdutoController.getProdutos);

module.exports = router;