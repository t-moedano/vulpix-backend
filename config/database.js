const Sequelize = require('sequelize');

const sequelize = new Sequelize('pandora', 'root', 'pandora', {
  dialect: 'mysql',
  host: 'localhost',
  define: {
    freezeTableName: true,
    timestamps: false,
  }
});

module.exports = sequelize;