const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");
const env = require("../config/env");

const googleClient = new OAuth2Client(env.GOOGLE_CLIENT_ID);

const generateToken = (user) => {
  return jwt.sign({ user: { id: user._id } }, env.JWT_SECRET);
};

const signup = async (userData) => {
  const check = await User.findOne({ email: userData.email });
  if (check) {
    return null;
  }

  const cart = {};
  for (let i = 0; i < 300; i++) cart[i] = 0;

  const user = new User({ ...userData, cartData: cart });
  await user.save();

  return generateToken(user);
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || user.password !== password) {
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
  let user = await User.findOne({ email });

  if (!user) {
    const cart = {};
    for (let i = 0; i < 300; i++) cart[i] = 0;

    user = new User({
      name,
      email,
      password: sub,
      cartData: cart,
    });
  }

  user.lastLogin = new Date();
  await user.save();

  return generateToken(user);
};

const getUserProfile = async (userId) => {
  return await User.findById(userId).select("-password");
};

const updateUserProfile = async (userId, profileData) => {
  const { phone, gender, dob } = profileData;
  return await User.findByIdAndUpdate(
    userId,
    { phone, gender, dob },
    { new: true }
  ).select("-password");
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
