const express = require('express');
const router = express.Router();

const ComandaController = require('../app/controllers/ComandaController');

router.get('/comandas', ComandaController.getComandas);

router.post('/comandas', ComandaController.postComanda);

router.get('/comandas/:comandaId', ComandaController.getComandaById);

router.post('/comandas/:comandaId/item', ComandaController.postComandaItem);

router.get('/comandas/:comandaId/item', ComandaController.getComandaItemsByComandaId);

router.patch('/comandas/:comandaId/item/:comandaItemId', ComandaController.patchComandaItem);

router.patch('/comandas/:comandaId', ComandaController.patchComanda);

module.exports = router;