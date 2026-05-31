const mongoose = require("mongoose");

const Review = mongoose.model("Review", {
  productId: Number,
  userId: String,
  userName: String,
  rating: { type: Number, min: 1, max: 5 },
  comment: String,
  date: { type: Date, default: Date.now },
});

module.exports = Review;
