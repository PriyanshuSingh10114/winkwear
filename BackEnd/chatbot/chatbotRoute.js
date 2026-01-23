const express = require("express");
const router = express.Router();
const chatbotService = require("./chatbotService");

router.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ success: false, message: "Message is required" });
        }

        const response = await chatbotService(message);
        res.json({ success: true, response });
    } catch (error) {
        console.error("Chatbot Error:", error);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
});

module.exports = router;
