require("dotenv").config({
  path: require("path").join(process.cwd(), ".env"),
});

const PORT = process.env.PORT || 4000;

/* ================= CORE IMPORTS ================= */
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { OAuth2Client } = require("google-auth-library");

/* ================= MODELS ================= */
const Product = require("./models/Product");


/* ================= ROUTE IMPORTS (FIXED ORDER) ================= */
const orderRoute = require("./order");
const newsletterRoute = require("./newsletter");
const pincodeRoute = require("./pincode");
const chatbotRoute = require("./chatbot/chatbotRoute");

/* ================= APP INIT ================= */
const app = express();

/* ================= GOOGLE CLIENT ================= */
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/* ================= MIDDLEWARE ================= */
app.use(express.json());
app.use(cors());

/* ================= ROUTES ================= */
app.use("/api/orders", orderRoute);
app.use("/", newsletterRoute);
app.use("/api/pincode", pincodeRoute);
app.use("/api/chatbot", chatbotRoute);

/* ================= DB CONNECTION ================= */
mongoose
  .connect(
    "mongodb+srv://Priyanshu5313:9572@cluster0.xrts3ya.mongodb.net/winkwear"
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

/* ================= BASIC ROUTES ================= */
app.get("/", (req, res) => {
  res.send("Express App is Running");
});

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is running",
  });
});

/* ================= IMAGE UPLOAD ================= */
const storage = multer.diskStorage({
  destination: "./uploads/images",
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const uploads = multer({ storage });
app.use("/uploads", express.static("uploads/images"));

app.post("/uploads", uploads.single("product"), (req, res) => {
  res.json({
    success: true,
    imageUrl: `${process.env.VITE_API_FRONTEND_URL}/uploads/${req.file.filename}`,
  });
});

/* ================= REVIEW MODEL ================= */
const Review = mongoose.model("Review", {
  productId: Number,
  userId: String,
  userName: String,
  rating: { type: Number, min: 1, max: 5 },
  comment: String,
  date: { type: Date, default: Date.now },
});

/* ================= USER MODEL ================= */
const Users = mongoose.model("Users", {
  name: String,
  email: String,
  password: String,
  cartData: Object,
  date: { type: Date, default: Date.now },
});

/* ================= AUTH MIDDLEWARE ================= */
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send({ errors: "Authentication required" });
  }

  try {
    const data = jwt.verify(token, "secret_ecom");
    req.user = data.user;
    next();
  } catch {
    res.status(401).send({ errors: "Invalid token" });
  }
};

/* ================= PRODUCT APIs ================= */
app.post("/addproduct", async (req, res) => {
  const products = await Product.find({});
  const id = products.length ? products[products.length - 1].id + 1 : 1;

  const product = new Product({ id, ...req.body });
  await product.save();

  res.json({ success: true, name: product.name });
});

app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  res.json({ success: true });
});

app.get("/allproducts", async (req, res) => {
  res.send(await Product.find({}));
});

app.get("/newcollection", async (req, res) => {
  const products = await Product.find({});
  res.send(products.slice(-8));
});

app.get("/popularinwomen", async (req, res) => {
  const products = await Product.find({ category: "women" });
  res.send(products.slice(0, 4));
});

/* ================= USER AUTH ================= */
app.post("/signup", async (req, res) => {
  const check = await Users.findOne({ email: req.body.email });
  if (check) return res.status(400).json({ success: false });

  const cart = {};
  for (let i = 0; i < 300; i++) cart[i] = 0;

  const user = new Users({ ...req.body, cartData: cart });
  await user.save();

  const token = jwt.sign({ user: { id: user._id } }, "secret_ecom");
  res.json({ success: true, token });
});

app.post("/login", async (req, res) => {
  const user = await Users.findOne({ email: req.body.email });
  if (!user || user.password !== req.body.password) {
    return res.json({ success: false });
  }

  const token = jwt.sign({ user: { id: user._id } }, "secret_ecom");
  res.json({ success: true, token });
});

/* ================= GOOGLE AUTH ================= */
app.post("/auth/google", async (req, res) => {
  try {
    const { credential } = req.body;
    if (!credential) {
      return res.status(400).json({ success: false });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, name, sub } = ticket.getPayload();

    let user = await Users.findOne({ email });

    if (!user) {
      const cart = {};
      for (let i = 0; i < 300; i++) cart[i] = 0;

      user = new Users({
        name,
        email,
        password: sub,
        cartData: cart,
      });

      await user.save();
    }

    const token = jwt.sign({ user: { id: user._id } }, "secret_ecom");
    res.json({ success: true, token });
  } catch (err) {
    console.error("Google Login Error:", err);
    res.status(401).json({ success: false });
  }
});

/* ================= CART APIs ================= */
app.post("/addtocart", fetchUser, async (req, res) => {
  const user = await Users.findById(req.user.id);
  user.cartData[req.body.itemId]++;
  await user.save();
  res.send("Added");
});

app.post("/removefromcart", fetchUser, async (req, res) => {
  const user = await Users.findById(req.user.id);
  user.cartData[req.body.itemId] = Math.max(
    user.cartData[req.body.itemId] - 1,
    0
  );
  await user.save();
  res.send("Removed");
});

app.post("/getcart", fetchUser, async (req, res) => {
  const user = await Users.findById(req.user.id);
  res.json(user.cartData);
});

/* ================= REVIEW APIs ================= */
app.post("/addreview", fetchUser, async (req, res) => {
  const { productId, rating, comment } = req.body;

  const existing = await Review.findOne({
    productId,
    userId: req.user.id,
  });

  if (existing) {
    return res.status(400).json({ success: false });
  }

  const user = await Users.findById(req.user.id);

  const review = new Review({
    productId,
    rating,
    comment,
    userId: req.user.id,
    userName: user.name,
  });

  await review.save();
  res.json({ success: true });
});

app.get("/reviews/:productId", async (req, res) => {
  const reviews = await Review.find({
    productId: Number(req.params.productId),
  }).sort({ date: -1 });

  res.json(reviews);
});

app.get("/rating/:productId", async (req, res) => {
  const result = await Review.aggregate([
    { $match: { productId: Number(req.params.productId) } },
    {
      $group: {
        _id: "$productId",
        avgRating: { $avg: "$rating" },
        count: { $sum: 1 },
      },
    },
  ]);

  res.json(result[0] || { avgRating: 0, count: 0 });
});

/* ================= SERVER ================= */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
