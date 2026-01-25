const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  id: Number,
  name: String,
  images: String,
  category: String,
  new_price: Number,
  old_price: Number,
  date: { type: Date, default: Date.now },
  available: { type: Boolean, default: true },
});

module.exports = mongoose.model("Product", ProductSchema);
