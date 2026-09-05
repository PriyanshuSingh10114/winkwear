const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  productId: { type: Number, required: true, index: true },
  userId: { type: String, required: true },
  userName: String,
  rating: { type: Number, min: 1, max: 5 },
  comment: String,
  date: { type: Date, default: Date.now, index: true },
});

ReviewSchema.index({ productId: 1, date: -1 });
ReviewSchema.index({ productId: 1, userId: 1 });

module.exports = mongoose.model("Review", ReviewSchema);

