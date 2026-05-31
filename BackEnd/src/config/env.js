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
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET || "secret_ecom",
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  VITE_API_FRONTEND_URL: process.env.VITE_API_FRONTEND_URL,
  EMAIL_USER: "artisinghstp5313@gmail.com",
  EMAIL_PASS: "ieqoqbymehkiacrf",
  GOOGLE_GEMINI_API: process.env.GOOGLE_GEMINI_API,
};
