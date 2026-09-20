const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  id: { type: Number, required: true, index: true },
  name: { type: String, required: true },
  images: String, // single image URL (used in orders, admin list, etc.)
  image: String,  // single image URL
  gallery: [{ type: String }], // multiple gallery images
  category: { type: String, index: true }, // "men", "women", "kids"
  gender: String, // "men", "women", "kids"
  type: { type: String, index: true }, // "tshirt", "shirt", "dress", etc.
  season: String, // "summer", "winter", "all-season"
  style: String, // "casual", "formal", "partywear", "streetwear", "athletic", "ethnic"
  occasion: String, // "daily", "office", "party", "vacation", "festive", "outdoor"
  description: String,
  new_price: { type: Number, required: true },
  old_price: Number,
  stock: { type: Number, default: 50 },
  sizes: [{ type: String }],
  colors: [{ type: String }],
  brand: { type: String, default: "Wink & Wear" },
  sku: { type: String, index: true },
  slug: { type: String, index: true },
  date: { type: Date, default: Date.now, index: true },
  available: { type: Boolean, default: true, index: true },
});

// Compound indexes for category queries and new collection sorting
ProductSchema.index({ category: 1, available: 1, date: -1 });
ProductSchema.index({ available: 1, date: -1 });

module.exports = mongoose.model("Product", ProductSchema);



