const { Product, Variant } = require('../models');
const { Op } = require('sequelize');

// GET /api/products?search=&page=&limit=
exports.listProducts = async (req, res, next) => {
  try {
    const { search = '', page = 1, limit = 8 } = req.query;
    const where = search
      ? { title: { [Op.like]: `%${search}%` } }
      : {};
    const offset = (parseInt(page) - 1) * parseInt(limit);
    const { rows, count } = await Product.findAndCountAll({
      where,
      include: [{ model: Variant, as: 'variants', separate: true }],
      offset,
      limit: parseInt(limit),
      order: [['id', 'ASC']],
    });
    res.json({ products: rows, total: count });
  } catch (err) {
    next(err);
  }
};

// GET /api/products/:id/variant/:variantId
exports.getProductByIdAndVariant = async (req, res, next) => {
  try {
    const { id, variantId } = req.params;
    const product = await Product.findByPk(id, {
      include: [{ model: Variant, as: 'variants' }],
    });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    const variant = product.variants.find(v => v.id == variantId);
    if (!variant) return res.status(404).json({ error: 'Variant not found' });
    res.json({ ...product.toJSON(), selectedVariant: variant });
  } catch (err) {
    next(err);
  }
}; 