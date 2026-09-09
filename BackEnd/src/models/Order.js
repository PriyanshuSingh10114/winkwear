const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },

    items: [
      {
        productId: Number,
        name: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],

    address: {
      name: String,
      phone: String,
      street: String,
      city: String,
      state: String,
      pincode: String,
      country: { type: String, default: "India" },
    },

    paymentMethod: {
      type: String,
      default: "COD",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },

    stripeSessionId: {
      type: String,
      sparse: true,
      index: true,
    },

    stripePaymentIntentId: {
      type: String,
      sparse: true,
    },

    subtotal: Number,
    shipping: Number,
    discount: {
      type: Number,
      default: 0,
    },
    promoCode: {
      type: String,
      default: "",
    },
    total: Number,
    currency: {
      type: String,
      default: "usd",
    },

    status: {
      type: String,
      enum: ["Placed", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Placed",
    },

    tracking: [
      {
        step: String,
        date: Date,
      },
    ],
  },
  { timestamps: true }
);

// Compound index for querying user orders in chronological order
orderSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model("Order", orderSchema);

