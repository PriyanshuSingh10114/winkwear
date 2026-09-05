const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");
const env = require("../config/env");

const googleClient = new OAuth2Client(env.GOOGLE_CLIENT_ID);

const generateToken = (user) => {
  return jwt.sign({ user: { id: user._id } }, env.JWT_SECRET);
};

const isBcryptHash = (str) => {
  return typeof str === "string" && /^\$2[aby]\$\d{2}\$/.test(str);
};

const signup = async (userData) => {
  const check = await User.findOne({ email: userData.email.toLowerCase().trim() });
  if (check) {
    return null;
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const cart = {};
  for (let i = 0; i < 300; i++) cart[i] = 0;

  const user = new User({
    ...userData,
    email: userData.email.toLowerCase().trim(),
    password: hashedPassword,
    cartData: cart,
  });
  await user.save();

  return generateToken(user);
};

const login = async (email, password) => {
  const normalizedEmail = email.toLowerCase().trim();
  const user = await User.findOne({ email: normalizedEmail });
  if (!user) {
    return null;
  }

  let isPasswordValid = false;

  if (isBcryptHash(user.password)) {
    isPasswordValid = await bcrypt.compare(password, user.password);
  } else {
    // Legacy plaintext password check with on-the-fly migration to bcrypt
    if (user.password === password) {
      isPasswordValid = true;
      user.password = await bcrypt.hash(password, 10);
    }
  }

  if (!isPasswordValid) {
    return null;
  }

  user.lastLogin = new Date();
  await user.save();

  return generateToken(user);
};

const googleAuth = async (credential) => {
  const ticket = await googleClient.verifyIdToken({
    idToken: credential,
    audience: env.GOOGLE_CLIENT_ID,
  });

  const { email, name, sub } = ticket.getPayload();
  const normalizedEmail = email.toLowerCase().trim();
  let user = await User.findOne({ email: normalizedEmail });

  if (!user) {
    const cart = {};
    for (let i = 0; i < 300; i++) cart[i] = 0;

    const dummyHashedPassword = await bcrypt.hash(sub, 10);

    user = new User({
      name,
      email: normalizedEmail,
      password: dummyHashedPassword,
      cartData: cart,
    });
  }

  user.lastLogin = new Date();
  await user.save();

  return generateToken(user);
};

const getUserProfile = async (userId) => {
  return await User.findById(userId).select("-password").lean();
};

const updateUserProfile = async (userId, profileData) => {
  const { phone, gender, dob } = profileData;
  return await User.findByIdAndUpdate(
    userId,
    { phone, gender, dob },
    { new: true }
  )
    .select("-password")
    .lean();
};

const updateUserAvatar = async (userId, filename) => {
  const avatarUrl = `${env.VITE_API_FRONTEND_URL}/uploads/${filename}`;
  await User.findByIdAndUpdate(userId, { avatar: avatarUrl });
  return avatarUrl;
};

module.exports = {
  signup,
  login,
  googleAuth,
  getUserProfile,
  updateUserProfile,
  updateUserAvatar,
};
