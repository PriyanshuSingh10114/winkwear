const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// POST /placeorder
router.post('/placeorder', async (req, res) => {
  const { email, name, orderSummary } = req.body;

  if (!email || !name || !orderSummary) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'artisinghstp5313@gmail.com',         // ✅ Your Gmail address
        pass: 'ieqoqbymehkiacrf',    // ✅ Your 16-digit app password (NOT Gmail password)
      },
    });

    const mailOptions = {
      from: '"Wink&Wear" <artisinghstp5313@gmail.com>',
      to: email,
      subject: 'Order Confirmation - Wink&Wear',
      text: `Hi ${name},\n\nThank you for your order!\n\n${orderSummary}\n\nWe will notify you when your order ships.\n\nBest regards,\nWink&Wear`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email sending failed:', error);
    return res.status(500).json({ message: 'Email sending failed', error: error.toString() });
  }
});

module.exports = router;