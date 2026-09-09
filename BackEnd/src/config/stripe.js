const stripe = require("stripe");
const env = require("./env");

let stripeClient = null;

if (env.STRIPE_SECRET_KEY) {
  stripeClient = stripe(env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-06-20",
  });
} else {
  console.warn("⚠️ STRIPE_SECRET_KEY is not set. Stripe functionality will require key configuration.");
}

module.exports = stripeClient;
