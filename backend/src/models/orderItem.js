const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const OrderItem = sequelize.define('OrderItem', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  orderId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'orders', key: 'id' } },
  productId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'products', key: 'id' } },
  variantId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'variants', key: 'id' } },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  subtotal: { type: DataTypes.INTEGER, allowNull: false },
}, {
  tableName: 'order_items',
  timestamps: false,
});

module.exports = OrderItem; 