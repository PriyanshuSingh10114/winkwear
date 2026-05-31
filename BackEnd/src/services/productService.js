const Product = require("../models/Product");

const addProduct = async (productData) => {
  const products = await Product.find({});
  const id = products.length ? products[products.length - 1].id + 1 : 1;

  const product = new Product({ id, ...productData });
  await product.save();
  return product;
};

const removeProduct = async (id) => {
  return await Product.findOneAndDelete({ id });
};

const getAllProducts = async () => {
  return await Product.find({});
};

const getNewCollection = async () => {
  const products = await Product.find({});
  return products.slice(-8);
};

const getPopularInWomen = async () => {
  const products = await Product.find({ category: "women" });
  return products.slice(0, 4);
};

module.exports = {
  addProduct,
  removeProduct,
  getAllProducts,
  getNewCollection,
  getPopularInWomen,
};
