const Razorpay = require('razorpay');
const dotenv = require('dotenv');
const Cart = require('../models/cart');
dotenv.config();
const razorpay = new Razorpay({
  key_id: process.env.razorpayKeyId,
  key_secret: process.env.razorpayKeySecret,
});

const createOrder = async (req, res) => {
  const userId = req.user.id;

  try {
    const cartItems = await Cart.find({ userId }).populate('productId');
    const amount = cartItems.reduce((acc, item) => acc + item.total, 0) * 100; // Amount in paise

    const options = {
      amount,
      currency: 'INR',
      receipt: `receipt_${userId}_${Date.now()}`,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);

    res.json({ id: order.id, amount: order.amount, currency: order.currency });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createOrder };
