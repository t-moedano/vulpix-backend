const Faturamento = require('../models/Faturamento');

exports.postFaturamento = async (req, res, next) => {
    const data = req.body.data;
    res.send(data);
};