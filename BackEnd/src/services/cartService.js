const User = require("../models/User");

const addToCart = async (userId, itemId) => {
  const user = await User.findById(userId);
  user.cartData[itemId]++;
  await user.save();
  return "Added";
};

const removeFromCart = async (userId, itemId) => {
  const user = await User.findById(userId);
  user.cartData[itemId] = Math.max(user.cartData[itemId] - 1, 0);
  await user.save();
  return "Removed";
};

const getCart = async (userId) => {
  const user = await User.findById(userId);
  return user.cartData;
};

module.exports = {
  addToCart,
  removeFromCart,
  getCart,
};
