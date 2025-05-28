const path = require('path');
require('dotenv').config();

// Import sequelize instance and models
const sequelize = require('./sequelize');
const Product = require('./product');
const Variant = require('./variant');
const Order = require('./order');
const OrderItem = require('./orderItem');
const Customer = require('./customer');

async function seedDatabase() {
  const productCount = await Product.count();
  if (productCount > 0) return;
  const baseUrl = process.env.BASE_URL || 'http://localhost:4000';
  const products = [
    {
      title: 'Converse Chuck Taylor All Star II Hi',
      description: 'A modern update to the iconic Chuck Taylor All Star silhouette.',
      image: `${baseUrl}/public/product1.jpg`,
      price: 6500,
      variants: [
        { color: 'Black', size: '8', inventory: 10 },
        { color: 'Black', size: '9', inventory: 8 },
      ],
    },
    {
      title: 'Nike Air Max 90',
      description: 'Classic style with modern comfort.',
      image: `${baseUrl}/public/product2.jpg`,
      price: 12000,
      variants: [
        { color: 'Red', size: '10', inventory: 7 },
        { color: 'Blue', size: '11', inventory: 6 },
      ],
    },
    {
      title: 'Adidas Ultraboost',
      description: 'Responsive running shoes for all-day comfort.',
      image: `${baseUrl}/public/product3.jpg`,
      price: 15000,
      variants: [
        { color: 'White', size: '9', inventory: 12 },
        { color: 'Black', size: '10', inventory: 9 },
      ],
    },
    {
      title: 'Puma RS-X',
      description: 'Bold, retro-inspired sneakers for everyday wear.',
      image: `${baseUrl}/public/product4.jpg`,
      price: 9000,
      variants: [
        { color: 'Green', size: '8', inventory: 6 },
        { color: 'Gray', size: '9', inventory: 7 },
      ],
    },
    {
      title: 'Vans Old Skool',
      description: 'Timeless skate shoe with iconic side stripe.',
      image: `${baseUrl}/public/product5.jpg`,
      price: 7000,
      variants: [
        { color: 'Black', size: '8', inventory: 10 },
        { color: 'Blue', size: '9', inventory: 8 },
      ],
    },
    {
      title: 'Reebok Classic Leather',
      description: 'Heritage running style with a clean look.',
      image: `${baseUrl}/public/product6.jpg`,
      price: 8000,
      variants: [
        { color: 'White', size: '10', inventory: 9 },
        { color: 'Beige', size: '11', inventory: 5 },
      ],
    },
    {
      title: 'New Balance 574',
      description: 'Versatile sneaker with a retro vibe.',
      image: `${baseUrl}/public/product7.jpg`,
      price: 9500,
      variants: [
        { color: 'Gray', size: '8', inventory: 7 },
        { color: 'Navy', size: '9', inventory: 6 },
      ],
    },
    {
      title: 'ASICS Gel-Lyte III',
      description: 'Performance running shoe with split tongue design.',
      image: `${baseUrl}/public/product8.jpg`,
      price: 11000,
      variants: [
        { color: 'Orange', size: '10', inventory: 8 },
        { color: 'Blue', size: '11', inventory: 7 },
      ],
    },
    {
      title: 'Fila Disruptor II',
      description: 'Chunky sneaker with bold style.',
      image: `${baseUrl}/public/product9.jpg`,
      price: 8500,
      variants: [
        { color: 'White', size: '8', inventory: 10 },
        { color: 'Pink', size: '9', inventory: 5 },
      ],
    },
    {
      title: 'Under Armour HOVR Phantom',
      description: 'Cushioned running shoe for maximum comfort.',
      image: `${baseUrl}/public/product10.jpg`,
      price: 13000,
      variants: [
        { color: 'Black', size: '10', inventory: 8 },
        { color: 'Red', size: '11', inventory: 6 },
      ],
    },
  ];
  for (const prod of products) {
    const product = await Product.create({
      title: prod.title,
      description: prod.description,
      image: prod.image,
      price: prod.price,
    });
    for (const variant of prod.variants) {
      await Variant.create({ ...variant, productId: product.id });
    }
  }
}

// Define associations
Product.hasMany(Variant, { as: 'variants', foreignKey: 'productId' });
Variant.belongsTo(Product, { foreignKey: 'productId' });

Order.hasMany(OrderItem, { as: 'items', foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });
OrderItem.belongsTo(Variant, { foreignKey: 'variantId' });

module.exports = {
  sequelize,
  Product,
  Variant,
  Order,
  OrderItem,
  Customer,
  seedDatabase,
}; 