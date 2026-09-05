const mongoose = require("mongoose");
const env = require("./env");

const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI, {
      maxPoolSize: 20,
      minPoolSize: 2,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log("✅ MongoDB connected with connection pooling");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

