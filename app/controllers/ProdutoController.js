
const Produto = require('../models/Produto');

exports.getProdutos = async (req, res, next) => {
    const produto = await Produto.findAll( { where: { ativo: true } } );

    res.send(produto);
};