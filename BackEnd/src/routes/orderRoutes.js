const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/placeorder", authMiddleware, orderController.placeOrder);
router.get("/myorders", authMiddleware, orderController.getMyOrders);
router.get("/:id", authMiddleware, orderController.getOrderById);
router.put("/cancel/:id", authMiddleware, orderController.cancelOrder);

module.exports = router;
