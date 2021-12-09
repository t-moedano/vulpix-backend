
const Estoque = require('../models/Estoque');

exports.getEstoque = async (req, res, next) => {
    const estoque = await Estoque.findAll();

    res.send(estoque);
};