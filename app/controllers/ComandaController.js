
const Comanda = require('../models/Comanda');
const ComandaItem = require('../models/ComandaItem');
const Produto = require('../models/Produto');

exports.getComandas = async (req, res, next) => {
    const esta_aberta = req.query.esta_aberta ? req.query.esta_aberta : false;
    const estoque_abatido = req.query.estoque_abatido ? req.query.estoque_abatido : false;
    const comandas = await Comanda.findAll({ 
        where: {
            esta_aberta,
            estoque_abatido
        }
    });

    for (const comanda of comandas) {
        const items = await ComandaItem.findAll({
            where: {
                id_comanda: comanda.id_comanda
            },
            raw: true,
        });
        for (const item of items) {
            const produto = await Produto.findAll({
                where: {
                    id_produto: item.id_produto
                },
                raw: true
            });
            item.produto = produto[0];
            delete item.id_produto;
        }
        comanda.dataValues.items = items;
    }

    res.send(comandas);
};

exports.getComandaItems = async (req, res, next) => {
    const esta_aberta = req.query.esta_aberta ? req.query.esta_aberta : false;
    const estoque_abatido = req.query.estoque_abatido ? req.query.estoque_abatido : false;
    const totalComandaItem = [];
    const comandas = await Comanda.findAll({ 
        where: {
            esta_aberta,
            estoque_abatido
        }
    });
    console.log(comandas);
    for (const comanda of comandas) {
        const items = await ComandaItem.findAll({
            where: {
                id_comanda: comanda.id_comanda
            },
            raw: true,
        });
        for (const item of items) {
            const produto = await Produto.findAll({
                where: {
                    id_produto: item.id_produto
                },
                raw: true
            });
            item.produto = produto[0];
            totalComandaItem.push(item);
        }
    }

    res.send(totalComandaItem);
}

exports.patchComanda = async (req, res, next) => {
    const id = req.params.comandaId;
    const esta_aberta = req.body.esta_aberta;
    const estoque_abatido = req.body.estoque_abatido;
    await Comanda.update({ esta_aberta, estoque_abatido }, {
        where: {
            id_comanda: id
        }
    });

    res.send({
        comanda: "ok"
    });
};

exports.getComandaItemsByComandaId = async (req, res, next) => {
    const id = req.params.comandaId;
    const comandaItem = await ComandaItem.findAll({
        where: {
            id_comanda: id
        }
    });
    res.send({
        comandaItem
    });
};

exports.patchComandaItem = async (req, res, next) => {
    const comandaId = req.params.comandaId;
    const comandaItemId = req.params.comandaItemId;
    const quantidade_item = req.body.quantidade_item;
    const quantidade_paga = req.body.quantidade_paga;

    //get comanda to get quantidade paga
    const comandaItem = await ComandaItem.findAll({
        where: {
            id_comanda_item: comandaItemId,
            id_comanda: comandaId
        },
        raw: true
    });
    const pagarNovos = quantidade_paga - comandaItem[0].quantidade_paga;
    const qntdeNova = quantidade_item - comandaItem[0].quantidade_item;

    const produto = await Produto.findAll({
        where: {
            id_produto: comandaItem[0].id_produto
        },
        raw: true
    });
    const valorPago = produto[0].preco_venda * pagarNovos;
    const valorTotal = produto[0].preco_venda * qntdeNova;
    await Comanda.increment({ valor_total: valorTotal, valor_pago: valorPago}, {where: { id_comanda:  comandaId} });

    await ComandaItem.update({ quantidade_item,  quantidade_paga }, {
        where: {
            id_comanda_item: comandaItemId,
            id_comanda: comandaId
        }
    });
    res.send({comanda: "ok"});
}

exports.postComanda = async (req, res, next) => {
    const nome = req.body.nome_pessoa;
    let yourDate = new Date();
    const offset = yourDate.getTimezoneOffset();
    yourDate = new Date(yourDate.getTime() - (offset*60*1000));
    const dataComanda = yourDate.toISOString().split('T')[0];
    const comanda = {
        nome_pessoa: nome,
        data_comanda: dataComanda,
        esta_aberta: true,
        estoque_abatido: false,
        valor_total: 0,
        valor_pago: 0,
        itens: 0
    };
    const id = await Comanda.create(comanda);
    res.send({
        comanda_id: id
    });
};

exports.getComandaById = async (req, res, next) => {
    const id = req.params.comandaId;
    const comanda = await Comanda.findAll({
        where: {
            id_comanda: id
        }
    });
    res.send({
        comanda: comanda[0]
    });
};

exports.postComandaItem = async (req, res, next) => {
    const id_produto = req.body.id_produto;
    const quantidade_paga = req.body.quantidade_paga;
    const quantidade_item = req.body.quantidade_item;

    const id_comanda = req.params.comandaId;
    //get comanda
    const comanda = await Comanda.findAll({ 
        where: {
            id_comanda
        },
        raw: true
    });
    const id_comanda_item = comanda[0].itens + 1;

    const comandaItem = {
        id_comanda_item,
        id_produto,
        id_comanda,
        quantidade_paga,
        quantidade_item
    };
    console.log(comandaItem);
    const id = await ComandaItem.create(comandaItem);
    res.send({
        comanda_item: id
    });

    //get produto
    const produto = await Produto.findAll({
        where: {
            id_produto
        },
        raw: true
    });
    const valorTotal = produto[0].preco_venda * quantidade_item;
    const valorPago = produto[0].preco_venda * quantidade_paga;
    await Comanda.increment({ valor_total: valorTotal, valor_pago: valorPago}, {where: { id_comanda } });
    await Comanda.update({ itens: id_comanda_item }, { where: { id_comanda }});
};

