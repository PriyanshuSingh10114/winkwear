const express = require("express");
const cors = require("cors");
const compression = require("compression");
const env = require("./config/env");

// Middlewares
const errorHandler = require("./middleware/errorHandler");

// Routes
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const newsletterRoutes = require("./routes/newsletterRoutes");
const pincodeRoutes = require("./routes/pincodeRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes");
const paymentController = require("./controllers/paymentController");

const app = express();

/* ================= COMPRESSION & TIMING ================= */
// Response compression (Gzip / Deflate)
app.use(compression());

// Safe request latency logging (never logs sensitive payloads or tokens)
app.use((req, res, next) => {
  const start = process.hrtime.bigint();
  res.on("finish", () => {
    const end = process.hrtime.bigint();
    const duration = Number(end - start) / 1_000_000;
    // Only log non-static API requests to keep logs clean
    if (!req.originalUrl.startsWith("/uploads")) {
      console.log(
        `[PERF] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration.toFixed(1)}ms)`
      );
    }
  });
  next();
});

/* ================= STRIPE RAW WEBHOOK ================= */
// Stripe webhook requires raw unmodified buffer for cryptographic signature validation
app.post(
  "/api/payment/webhook",
  express.raw({ type: "application/json" }),
  paymentController.handleWebhook
);

/* ================= BODY PARSER & CORS ================= */
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

const allowedOrigins = [
  env.VITE_API_FRONTEND_URL,
  env.CLIENT_URL,
  "http://localhost:5173",
  "https://winkandwear.com",
  "https://www.winkandwear.com",
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    credentials: true,
  })
);

/* ================= STATIC FILES ================= */
// Serve local images with HTTP caching headers (7-day max-age and ETag)
app.use(
  "/uploads",
  express.static("uploads/images", {
    maxAge: "7d",
    etag: true,
    lastModified: true,
  })
);

/* ================= ROUTES ================= */
app.use("/", productRoutes);
app.use("/", userRoutes);
app.use("/", cartRoutes);
app.use("/", reviewRoutes);
app.use("/", newsletterRoutes);

app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/pincode", pincodeRoutes);
app.use("/api/chatbot", chatbotRoutes);

const seoController = require("./controllers/seoController");

/* ================= BASIC & SEO ROUTES ================= */
app.get("/sitemap.xml", seoController.getSitemap);
app.get("/robots.txt", seoController.getRobots);
app.get("/", (_, res) => res.send("Express App is Running"));
app.get("/health", (_, res) =>
  res.json({ success: true, message: "Backend is running" })
);

/* ================= ERROR HANDLER ================= */
app.use(errorHandler);

module.exports = app;
