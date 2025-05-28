const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS
  }
});

function sendOrderEmail({ status, orderNumber, email, fullName, product, variant, quantity, subtotal, address, city, state, zip }) {
  let subject = '';
  let html = '';
  if (status === 'success') {
    subject = `Order Confirmation - ${orderNumber}`;
    html = `<h2>Thank you for your order!</h2>
      <p>Order Number: <b>${orderNumber}</b></p>
      <p>Name: ${fullName}</p>
      <p>Product: ${product}</p>
      <p>Variant: ${variant}</p>
      <p>Quantity: ${quantity}</p>
      <p>Subtotal: $${(subtotal / 100).toFixed(2)}</p>
      <p>Shipping Address: ${address}, ${city}, ${state}, ${zip}</p>
      <p>Your order has been confirmed and is being processed.</p>`;
  } else {
    subject = `Order Failed - ${orderNumber}`;
    html = `<h2>Order Failed</h2>
      <p>Order Number: <b>${orderNumber}</b></p>
      <p>Name: ${fullName}</p>
      <p>We're sorry, but your transaction could not be completed.</p>
      <p>Status: <b>${status === 'failure' ? 'Failed' : 'Gateway Error'}</b></p>
      <p>Please try again or contact support.</p>`;
  }

  transporter.sendMail({
    from: 'no-reply@ecommerce.com',
    to: email,
    subject,
    html
  }, (err, info) => {
    if (err) {
      console.error('Email send error:', err);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

module.exports = { sendOrderEmail };
