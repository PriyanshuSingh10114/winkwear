const reviewService = require("../services/reviewService");

const addReview = async (req, res, next) => {
  try {
    const { productId, rating, comment } = req.body;
    const success = await reviewService.addReview(req.user.id, productId, rating, comment);
    
    if (!success) {
      return res.status(400).json({ success: false });
    }
    
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

const getReviews = async (req, res, next) => {
  try {
    const reviews = await reviewService.getReviewsByProduct(req.params.productId);
    res.json(reviews);
  } catch (error) {
    next(error);
  }
};

const getRating = async (req, res, next) => {
  try {
    const rating = await reviewService.getRatingByProduct(req.params.productId);
    res.json(rating);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addReview,
  getReviews,
  getRating,
};
