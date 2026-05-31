const newsletterService = require("../services/newsletterService");

const subscribe = async (req, res, next) => {
  try {
    const { email } = req.body;
    await newsletterService.subscribe(email);
    return res.status(200).json({ message: "Subscription email sent!" });
  } catch (err) {
    if (err.message === "Email is required") {
      return res.status(400).json({ message: err.message });
    }
    console.error("Newsletter email error:", err);
    return res.status(500).json({ message: "Failed to send subscription email" });
  }
};

module.exports = { subscribe };
