const express = require("express");
const router = express.Router();
const chatbotController = require("../controllers/chatbotController");

router.post("/chat", chatbotController.chat);

module.exports = router;
