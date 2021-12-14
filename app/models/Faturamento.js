const sequelize = require('../../config/database');
const { DataTypes } = require('sequelize');

const Faturamento = sequelize.define('faturamento', {
    data_faturamento: {
        type: DataTypes.DATE,
        allowNull: false,
        primaryKey: true
    },
    valor_total_vendido: { type: DataTypes.FLOAT },
    lucro_dia: { type: DataTypes.FLOAT, }
});

module.exports = Faturamento;