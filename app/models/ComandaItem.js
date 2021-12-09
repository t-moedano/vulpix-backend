const sequelize = require('../../config/database');
const { DataTypes } = require('sequelize');

const ComandaItem = sequelize.define('comanda_item', {
    id_comanda_item: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    id_produto: { type: DataTypes.INTEGER },
    id_comanda: { type: DataTypes.INTEGER, },
    quantidade_paga: { type: DataTypes.INTEGER },
    quantidade_item: { type: DataTypes.INTEGER }
});

module.exports = ComandaItem;