const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const Variant = sequelize.define('Variant', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  color: { type: DataTypes.STRING, allowNull: false },
  size: { type: DataTypes.STRING, allowNull: false },
  inventory: { type: DataTypes.INTEGER, allowNull: false },
  productId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'products', key: 'id' } },
}, {
  tableName: 'variants',
  timestamps: false,
});

module.exports = Variant; 