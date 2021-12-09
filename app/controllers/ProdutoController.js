
const Produto = require('../models/Produto');

exports.getProdutos = async (req, res, next) => {
    const produto = await Produto.findAll();

    res.send(produto);
};