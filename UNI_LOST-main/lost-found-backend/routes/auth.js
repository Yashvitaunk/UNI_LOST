const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

router.post('/google-login', async (req, res) => {
  try {
    const { email, name, googleId, picture } = req.body;

    // 1. Check if user already exists
    let user = await User.findOne({ email });

    // 2. If not, "collect" them into the database
    if (!user) {
      user = new User({
        name: name,
        email: email,
        googleId: googleId,
        profilePic: picture
      });
      await user.save();
    }

    // 3. Create a JWT for your app's session
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }
    );

    res.status(200).json({ token, user, message: "Logged in via Google" });
  } catch (err) {
    res.status(500).json({ error: "Google Auth Failed" });
  }
});