const Product = require("../models/Product");

const addProduct = async (productData) => {
  const lastProduct = await Product.findOne({})
    .sort({ id: -1 })
    .select("id")
    .lean();

  const id = lastProduct && typeof lastProduct.id === "number" ? lastProduct.id + 1 : 1;

  const product = new Product({ id, ...productData });
  await product.save();
  return product;
};

const removeProduct = async (id) => {
  return await Product.findOneAndDelete({ id });
};

const getAllProducts = async (filters = {}) => {
  const query = {};
  if (filters.category) {
    query.category = filters.category;
  }
  if (filters.available !== undefined) {
    query.available = filters.available;
  }

  let dbQuery = Product.find(query).lean();

  if (filters.limit) {
    const limit = Math.min(Math.max(Number(filters.limit) || 20, 1), 1000);
    const page = Math.max(Number(filters.page) || 1, 1);
    const skip = (page - 1) * limit;
    dbQuery = dbQuery.skip(skip).limit(limit);
  }

  return await dbQuery;
};

const getNewCollection = async () => {
  return await Product.find({ available: { $ne: false } })
    .sort({ date: -1, id: -1 })
    .limit(8)
    .lean();
};

const getPopularInWomen = async () => {
  return await Product.find({ category: "women", available: { $ne: false } })
    .sort({ date: -1, id: -1 })
    .limit(4)
    .lean();
};

module.exports = {
  addProduct,
  removeProduct,
  getAllProducts,
  getNewCollection,
  getPopularInWomen,
};

