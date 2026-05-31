const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/addtocart", authMiddleware, cartController.addToCart);
router.post("/removefromcart", authMiddleware, cartController.removeFromCart);
router.post("/getcart", authMiddleware, cartController.getCart);

module.exports = router;
