const sequelize = require('../../config/database');
const { DataTypes } = require('sequelize');

const Estoque = sequelize.define('estoque', {
    id_estoque: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    id_produto: { type: DataTypes.INTEGER },
    descricao: { type: DataTypes.STRING },
    quantidade: { type: DataTypes.INTEGER },
    preco_compra: { type: DataTypes.FLOAT, },
    e_estocavel: { type: DataTypes.BOOLEAN }
});

module.exports = Estoque;