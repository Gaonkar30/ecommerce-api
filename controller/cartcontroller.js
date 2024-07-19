const Cart = require("../models/shoppingcart");

const addToCart = async (req, res) => {
  const { productId, quantity, price } = req.body;
  const userId = req.user.id;

  try {
    const total = price * quantity;
    const cartItem = new Cart({ userId, productId, quantity, price, total });
    await cartItem.save();
    res.status(201).json(cartItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCart = async (req, res) => {
  const userId = req.user.id;

  try {
    const cartItems = await Cart.find({ userId }).populate('productId');
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addToCart, getCart };
