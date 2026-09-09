const stripe = require("../config/stripe");
const stripeService = require("../services/stripeService");
const env = require("../config/env");

/**
 * Controller to create a Stripe Hosted Checkout Session
 */
const createCheckoutSession = async (req, res, next) => {
  try {
    const result = await stripeService.createCheckoutSession(req.user.id, req.body);
    res.json({
      success: true,
      url: result.url,
      sessionId: result.sessionId,
      orderId: result.orderId,
    });
  } catch (error) {
    console.error("[PAYMENT ERROR] Checkout Session Creation Failed:", error.message);
    res.status(400).json({
      success: false,
      message: error.message || "Failed to initialize Stripe checkout",
    });
  }
};

/**
 * Controller to handle verified Stripe Webhooks with raw buffer payload
 */
const handleWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  if (!sig || !env.STRIPE_WEBHOOK_SECRET) {
    console.warn("[STRIPE WEBHOOK] Missing signature or STRIPE_WEBHOOK_SECRET");
    return res.status(400).send("Webhook configuration error: signature or secret missing");
  }

  let event;
  try {
    // Construct event using the raw request body buffer
    event = stripe.webhooks.constructEvent(req.body, sig, env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("[STRIPE WEBHOOK] Signature Verification Failed:", err.message);
    return res.status(400).send(`Webhook Signature Error: ${err.message}`);
  }

  try {
    const result = await stripeService.handleWebhookEvent(event);
    res.status(200).json(result);
  } catch (err) {
    console.error("[STRIPE WEBHOOK] Event Handler Error:", err.message);
    res.status(500).json({ error: "Webhook handler failed" });
  }
};

module.exports = {
  createCheckoutSession,
  handleWebhook,
};
