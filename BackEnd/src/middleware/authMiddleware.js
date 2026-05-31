const jwt = require("jsonwebtoken");
const env = require("../config/env");

const authMiddleware = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({ success: false, errors: "Authentication required" });
  }

  try {
    const data = jwt.verify(token, env.JWT_SECRET);
    req.user = data.user;
    next();
  } catch (err) {
    res.status(401).json({ success: false, errors: "Invalid token" });
  }
};

module.exports = authMiddleware;
