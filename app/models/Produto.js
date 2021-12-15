const sequelize = require('../../config/database');
const { DataTypes } = require('sequelize');

const Produto = sequelize.define('produto', {
    id_produto: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: { type: DataTypes.INTEGER },
    preco_venda: { type: DataTypes.FLOAT, },
    link_imagem: { type: DataTypes.STRING }
});

module.exports = Produto;