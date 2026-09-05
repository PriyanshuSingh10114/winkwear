const emailSender = require("../utils/emailSender");

const subscribe = async (email) => {
  if (!email) {
    throw new Error("Email is required");
  }

  const mailOptions = {
    from: '"Wink&Wear" <artisinghstp5313@gmail.com>',
    to: email,
    subject: "Thanks for Subscribing to Wink & Wear!",
    text: `Hi,\n\nThanks for subscribing to Wink & Wear!\nYou'll now receive exclusive deals and updates directly to your inbox.\n\nRegards,\nThe Wink & Wear Team`,
  };

  emailSender.sendEmail(mailOptions).catch((err) => {
    console.error("Async Newsletter Email Error:", err.message);
  });
};

module.exports = { subscribe };

