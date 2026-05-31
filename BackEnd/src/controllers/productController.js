const productService = require("../services/productService");

const addProduct = async (req, res, next) => {
  try {
    const product = await productService.addProduct(req.body);
    res.json({ success: true, name: product.name });
  } catch (error) {
    next(error);
  }
};

const removeProduct = async (req, res, next) => {
  try {
    await productService.removeProduct(req.body.id);
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const products = await productService.getAllProducts();
    res.send(products);
  } catch (error) {
    next(error);
  }
};

const getNewCollection = async (req, res, next) => {
  try {
    const products = await productService.getNewCollection();
    res.send(products);
  } catch (error) {
    next(error);
  }
};

const getPopularInWomen = async (req, res, next) => {
  try {
    const products = await productService.getPopularInWomen();
    res.send(products);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addProduct,
  removeProduct,
  getAllProducts,
  getNewCollection,
  getPopularInWomen,
};
