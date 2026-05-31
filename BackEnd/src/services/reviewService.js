const Review = require("../models/Review");
const User = require("../models/User");

const addReview = async (userId, productId, rating, comment) => {
  const existing = await Review.findOne({
    productId,
    userId,
  });

  if (existing) {
    return false;
  }

  const user = await User.findById(userId);

  const review = new Review({
    productId,
    rating,
    comment,
    userId,
    userName: user.name,
  });

  await review.save();
  return true;
};

const getReviewsByProduct = async (productId) => {
  return await Review.find({
    productId: Number(productId),
  }).sort({ date: -1 });
};

const getRatingByProduct = async (productId) => {
  const result = await Review.aggregate([
    { $match: { productId: Number(productId) } },
    {
      $group: {
        _id: "$productId",
        avgRating: { $avg: "$rating" },
        count: { $sum: 1 },
      },
    },
  ]);

  return result[0] || { avgRating: 0, count: 0 };
};

module.exports = {
  addReview,
  getReviewsByProduct,
  getRatingByProduct,
};
