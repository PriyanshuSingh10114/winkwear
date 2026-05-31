const express = require("express");
const cors = require("cors");
const env = require("./config/env");

// Middlewares
const errorHandler = require("./middleware/errorHandler");

// Routes
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const orderRoutes = require("./routes/orderRoutes");
const newsletterRoutes = require("./routes/newsletterRoutes");
const pincodeRoutes = require("./routes/pincodeRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes");

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(express.json());
app.use(
  cors({
    origin: env.VITE_API_FRONTEND_URL,
    credentials: true,
  })
);

/* ================= STATIC FILES ================= */
// Serve local images
app.use("/uploads", express.static("uploads/images"));

/* ================= ROUTES ================= */
app.use("/", productRoutes);
app.use("/", userRoutes);
app.use("/", cartRoutes);
app.use("/", reviewRoutes);
app.use("/", newsletterRoutes); 

app.use("/api/orders", orderRoutes);
app.use("/api/pincode", pincodeRoutes);
app.use("/api/chatbot", chatbotRoutes);

/* ================= BASIC ROUTES ================= */
app.get("/", (_, res) => res.send("Express App is Running"));
app.get("/health", (_, res) =>
  res.json({ success: true, message: "Backend is running" })
);

/* ================= ERROR HANDLER ================= */
app.use(errorHandler);
module.exports = app;
