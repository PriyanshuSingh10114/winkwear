const cartService = require("../services/cartService");

const addToCart = async (req, res, next) => {
  try {
    const result = await cartService.addToCart(req.user.id, req.body.itemId);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const removeFromCart = async (req, res, next) => {
  try {
    const result = await cartService.removeFromCart(req.user.id, req.body.itemId);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const getCart = async (req, res, next) => {
  try {
    const cartData = await cartService.getCart(req.user.id);
    res.json(cartData);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addToCart,
  removeFromCart,
  getCart,
};
