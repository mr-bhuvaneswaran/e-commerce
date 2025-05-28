const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const Customer = sequelize.define('Customer', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  fullName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
}, {
  tableName: 'customers',
  timestamps: false,
});

module.exports = Customer; 