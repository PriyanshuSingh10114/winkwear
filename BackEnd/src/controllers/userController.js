const userService = require("../services/userService");

const signup = async (req, res, next) => {
  try {
    const token = await userService.signup(req.body);
    if (!token) {
      return res.status(400).json({ success: false });
    }
    res.json({ success: true, token });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const token = await userService.login(req.body.email, req.body.password);
    if (!token) {
      return res.json({ success: false });
    }
    res.json({ success: true, token });
  } catch (error) {
    next(error);
  }
};

const googleAuth = async (req, res, next) => {
  try {
    const token = await userService.googleAuth(req.body.credential);
    res.json({ success: true, token });
  } catch (error) {
    console.error("Google Login Error:", error);
    res.status(401).json({ success: false });
  }
};

const getUserProfile = async (req, res, next) => {
  try {
    const user = await userService.getUserProfile(req.user.id);
    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

const updateUserProfile = async (req, res, next) => {
  try {
    const user = await userService.updateUserProfile(req.user.id, req.body);
    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

const updateUserAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }
    const avatarUrl = await userService.updateUserAvatar(req.user.id, req.file.filename);
    res.json({ success: true, avatar: avatarUrl });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
  googleAuth,
  getUserProfile,
  updateUserProfile,
  updateUserAvatar,
};
