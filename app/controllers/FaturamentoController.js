const Faturamento = require('../models/Faturamento');
const Estoque = require('../models/Estoque');
const Produto = require('../models/Produto');

exports.postFaturamento = async (req, res, next) => {
    const items = req.body.items;
    let lucro = 0;
    let faturamento = 0;
    for(const item of items) {
        const id_estoque = item.id_estoque;
        const quantidade = item.quantidade;
        const id_produto = item.id_produto;

        const produto = await Produto.findAll({ where: {
            id_produto
            },
            raw: true
        })
        const estoque = await Estoque.findAll({ where: {
            id_estoque
            },
            raw: true
        });

        lucro = lucro + (produto[0].preco_venda * quantidade) - (estoque[0].preco_compra * quantidade);
        faturamento = faturamento + (produto[0].preco_venda * quantidade);
        await Estoque.decrement({ quantidade }, { where: { id_estoque } });
    }

    let yourDate = new Date();
    const offset = yourDate.getTimezoneOffset();
    yourDate = new Date(yourDate.getTime() - (offset*60*1000));
    const dataComanda = yourDate.toISOString().split('T')[0];
    const faturamentoDia = {
        data_faturamento: dataComanda,
        valor_total_vendido: faturamento,
        lucro_dia: lucro
    }
    console.log(faturamentoDia);
    await Faturamento.create(faturamentoDia);
    res.send(faturamentoDia);
}
