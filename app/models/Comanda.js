const sequelize = require('../../config/database');
const { DataTypes } = require('sequelize');

const Comanda = sequelize.define('comanda', {
    id_comanda: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome_pessoa: { type: DataTypes.STRING },
    data_comanda: { type: DataTypes.DATE, },
    esta_aberta: { type: DataTypes.BOOLEAN },
    estoque_abatido: { type: DataTypes.BOOLEAN },
    valor_total: { type: DataTypes.FLOAT },
    valor_pago: { type: DataTypes.FLOAT },
    itens: { type: DataTypes.INTEGER }
});

module.exports = Comanda;