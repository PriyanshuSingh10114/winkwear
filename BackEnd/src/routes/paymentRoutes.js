const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const authMiddleware = require("../middleware/authMiddleware");

// Stripe Hosted Checkout Session creation (Authentication Required)
router.post("/create-checkout-session", authMiddleware, paymentController.createCheckoutSession);

// Stripe Webhook Endpoint (Raw Body Buffer Required for Cryptographic Signature Verification)
router.post("/webhook", express.raw({ type: "application/json" }), paymentController.handleWebhook);

module.exports = router;
