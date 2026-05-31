const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/addreview", authMiddleware, reviewController.addReview);
router.get("/reviews/:productId", reviewController.getReviews);
router.get("/rating/:productId", reviewController.getRating);

module.exports = router;
