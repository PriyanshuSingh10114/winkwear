const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  id: { type: Number, required: true, index: true },
  name: String,
  images: String, // single image URL (used in orders)
  category: { type: String, index: true },
  new_price: Number,
  old_price: Number,
  date: { type: Date, default: Date.now, index: true },
  available: { type: Boolean, default: true, index: true },
});

// Compound indexes for category queries and new collection sorting
ProductSchema.index({ category: 1, available: 1, date: -1 });
ProductSchema.index({ available: 1, date: -1 });

module.exports = mongoose.model("Product", ProductSchema);

