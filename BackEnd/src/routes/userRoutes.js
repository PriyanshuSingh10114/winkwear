const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const uploadMiddleware = require("../middleware/uploadMiddleware");

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/auth/google", userController.googleAuth);

router.get("/user/profile", authMiddleware, userController.getUserProfile);
router.put("/user/profile", authMiddleware, userController.updateUserProfile);
router.post(
  "/user/avatar",
  authMiddleware,
  uploadMiddleware.single("avatar"),
  userController.updateUserAvatar
);

module.exports = router;
