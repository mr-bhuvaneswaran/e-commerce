const { Order, OrderItem, Product, Variant } = require('../models');
const { sendOrderEmail } = require('../email');

// POST /api/orders
exports.createOrder = async (req, res, next) => {
  try {
    const { fullName, email, phone, address, city, state, zip, cardNumber, productId, variantId, quantity, paymentStatus } = req.body;
    const status = paymentStatus || 'success';
    const cardLast4 = cardNumber.slice(-4);
    const orderNumber = 'ORD-' + Date.now();

    // Get product and variant
    const product = await Product.findByPk(productId);
    const variant = await Variant.findByPk(variantId);
    if (!product || !variant) return res.status(400).json({ error: 'Product or variant not found' });

    // Create order
    const order = await Order.create({
      orderNumber, fullName, email, phone, address, city, state, zip, cardLast4, status
    });
    
    // Create order item
    const subtotal = product.price * quantity;
    await OrderItem.create({ orderId: order.id, productId, variantId, quantity, subtotal });
    // Update inventory if success
    if (status === 'success') {
      variant.inventory = variant.inventory - quantity;
      await variant.save();
    }
    // Send email
    sendOrderEmail({
      status,
      orderNumber,
      email,
      fullName,
      product: product.title,
      variant: variant.color + ' ' + variant.size,
      quantity,
      subtotal,
      address,
      city,
      state,
      zip
    });
    res.json({ status, orderId: order.id, orderNumber });
  } catch (err) {
    next(err);
  }
};

// GET /api/orders/:orderId
exports.getOrderDetails = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findByPk(orderId, {
      include: [{
        model: OrderItem,
        as: 'items',
        include: [
          { model: Product },
          { model: Variant }
        ]
      }]
    });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    next(err);
  }
}; 