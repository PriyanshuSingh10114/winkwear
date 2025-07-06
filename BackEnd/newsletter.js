const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/subscribe', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'artisinghstp5313@gmail.com',
        pass: 'ieqoqbymehkiacrf',
      },
    });

    const mailOptions = {
      from: '"Wink&Wear" <artisinghstp5313@gmail.com>',
      to: email,
      subject: 'Thanks for Subscribing to Wink & Wear!',
      text: `Hi,

Thanks for subscribing to Wink & Wear!
You'll now receive exclusive deals and updates directly to your inbox.

Regards,
The Wink & Wear Team`,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'Subscription email sent!' });
  } catch (err) {
    console.error('Newsletter email error:', err);
    return res.status(500).json({ message: 'Failed to send subscription email' });
  }
});

module.exports = router;