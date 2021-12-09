const express = require('express');
const router = express.Router();

const EstoqueController = require('../app/controllers/EstoqueController');

router.get('/estoque', EstoqueController.getEstoque);

module.exports = router;