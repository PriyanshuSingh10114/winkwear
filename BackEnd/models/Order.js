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

    subtotal: Number,
    shipping: Number,
    total: Number,

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

module.exports = mongoose.model("Order", orderSchema);
