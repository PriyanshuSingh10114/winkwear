const PORT = process.env.PORT || 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { OAuth2Client } = require("google-auth-library");

const orderRoute = require('./order');
const newsletterRoute = require('./newsletter');

/* ================= GOOGLE CLIENT ================= */
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.use(express.json());
app.use(cors());
app.use(orderRoute);
app.use('/', newsletterRoute);

/* ================= DB CONNECTION (UNCHANGED) ================= */
mongoose.connect(
  "mongodb+srv://Priyanshu5313:9572@cluster0.xrts3ya.mongodb.net/winkwear"
);

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
  destination: './uploads/images',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

const uploads = multer({ storage });
app.use("/uploads", express.static("uploads/images"));

app.post("/uploads", uploads.single("product"), (req, res) => {
  res.json({
    success: true,
    imageUrl: `${process.env.VITE_API_FRONTEND_URL}/uploads/${req.file.filename}`
  });
});

/* ================= PRODUCT MODEL ================= */
const Product = mongoose.model("Product", {
  id: Number,
  name: String,
  images: String,
  category: String,
  new_price: Number,
  old_price: Number,
  date: { type: Date, default: Date.now },
  available: { type: Boolean, default: true },
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
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).send({ errors: "Authentication required" });
  }
  try {
    const data = jwt.verify(token, 'secret_ecom');
    req.user = data.user;
    next();
  } catch {
    res.status(401).send({ errors: "Invalid token" });
  }
};

/* ================= PRODUCT APIs ================= */
app.post('/addproduct', async (req, res) => {
  const products = await Product.find({});
  const id = products.length ? products[products.length - 1].id + 1 : 1;

  const product = new Product({ id, ...req.body });
  await product.save();

  res.json({ success: true, name: product.name });
});

app.post('/removeproduct', async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  res.json({ success: true });
});

app.get('/allproducts', async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

app.get('/newcollection', async (req, res) => {
  const products = await Product.find({});
  res.send(products.slice(-8));
});

app.get('/popularinwomen', async (req, res) => {
  const products = await Product.find({ category: "women" });
  res.send(products.slice(0, 4));
});

/* ================= USER AUTH ================= */
app.post('/signup', async (req, res) => {
  const check = await Users.findOne({ email: req.body.email });
  if (check) return res.status(400).json({ success: false });

  const cart = {};
  for (let i = 0; i < 300; i++) cart[i] = 0;

  const user = new Users({ ...req.body, cartData: cart });
  await user.save();

  /* FIXED JWT (_id instead of id) */
  const token = jwt.sign({ user: { id: user._id } }, 'secret_ecom');
  res.json({ success: true, token });
});

app.post('/login', async (req, res) => {
  const user = await Users.findOne({ email: req.body.email });
  if (!user || user.password !== req.body.password) {
    return res.json({ success: false });
  }

  /* FIXED JWT (_id instead of id) */
  const token = jwt.sign({ user: { id: user._id } }, 'secret_ecom');
  res.json({ success: true, token });
});

/* ================= GOOGLE AUTH (ADDED ONLY) ================= */
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

    const payload = ticket.getPayload();
    const { email, name, sub } = payload;

    let user = await Users.findOne({ email });

    if (!user) {
      const cart = {};
      for (let i = 0; i < 300; i++) cart[i] = 0;

      user = new Users({
        name,
        email,
        password: sub, // Google unique ID
        cartData: cart,
      });

      await user.save();
    }

    const token = jwt.sign(
      { user: { id: user._id } },
      'secret_ecom'
    );

    res.json({ success: true, token });

  } catch (error) {
    console.error("Google Login Error:", error);
    res.status(401).json({ success: false });
  }
});

/* ================= CART APIs ================= */
app.post('/addtocart', fetchUser, async (req, res) => {
  const user = await Users.findById(req.user.id);
  user.cartData[req.body.itemId]++;
  await user.save();
  res.send("Added");
});

app.post('/removefromcart', fetchUser, async (req, res) => {
  const user = await Users.findById(req.user.id);
  user.cartData[req.body.itemId] =
    Math.max(user.cartData[req.body.itemId] - 1, 0);
  await user.save();
  res.send("Removed");
});

app.post('/getcart', fetchUser, async (req, res) => {
  const user = await Users.findById(req.user.id);
  res.json(user.cartData);
});

/* ================= REVIEW APIs ================= */
app.post('/addreview', fetchUser, async (req, res) => {
  const { productId, rating, comment } = req.body;

  const existing = await Review.findOne({
    productId,
    userId: req.user.id
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
    userName: user.name
  });

  await review.save();
  res.json({ success: true });
});

app.get('/reviews/:productId', async (req, res) => {
  const reviews = await Review.find({
    productId: Number(req.params.productId)
  }).sort({ date: -1 });

  res.json(reviews);
});

app.get('/rating/:productId', async (req, res) => {
  const result = await Review.aggregate([
    { $match: { productId: Number(req.params.productId) } },
    {
      $group: {
        _id: "$productId",
        avgRating: { $avg: "$rating" },
        count: { $sum: 1 }
      }
    }
  ]);

  res.json(result[0] || { avgRating: 0, count: 0 });
});

/* ================= SERVER ================= */
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
