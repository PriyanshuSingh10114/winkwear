require("dotenv").config({
  path: require("path").join(process.cwd(), ".env"),
});

const requiredVars = [
  "MONGODB_URI",
];

requiredVars.forEach((key) => {
  if (!process.env[key]) {
    console.warn(`⚠️ WARNING: Missing environment variable ${key}`);
  }
});

module.exports = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET || "secret_ecom",
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  VITE_API_FRONTEND_URL: process.env.VITE_API_FRONTEND_URL,
  EMAIL_USER: process.env.EMAIL_USER || "artisinghstp5313@gmail.com",
  EMAIL_PASS: process.env.EMAIL_PASS || "ieqoqbymehkiacrf",
  GOOGLE_GEMINI_API: process.env.GOOGLE_GEMINI_API,
  AWS_REGION: process.env.AWS_REGION || "ap-south-1",
  S3_BUCKET_MEDIA: process.env.S3_BUCKET_MEDIA,
  CLOUDFRONT_URL: process.env.CLOUDFRONT_URL,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  CLIENT_URL: process.env.CLIENT_URL || process.env.VITE_API_FRONTEND_URL || "http://localhost:5173",
};

