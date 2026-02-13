// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Signup
router.post('/signup', async (req, res) => {
  const { name, email, password, mobile } = req.body;
  const hashed = await bcrypt.hash(password, 10);             // hash password
  const user = new User({ name, email, password: hashed, mobile });
  await user.save();
  // Issue JWT
  const token = jwt.sign(
    { userId: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );
  res.status(201).json({ token });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign(
    { userId: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );
  res.json({ token });
});
// OTP-based login
router.post('/request-otp', async (req, res) => {
  const { mobile } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
  console.log(`OTP for ${mobile}: ${otp}`);

  // TODO: Save OTP in DB or temporary storage with expiration
  // Example: await Otp.create({ mobile, otp, expiresAt: Date.now() + 5 * 60 * 1000 });

  res.json({ message: 'OTP sent' });
});

router.post('/verify-otp', async (req, res) => {
  const { mobile, otp } = req.body;

  // TODO: Validate OTP against stored value
  // Example: const valid = await Otp.findOne({ mobile, otp });

  let user = await User.findOne({ mobile });
  if (!user) {
    user = new User({ name: mobile, mobile, password: '' }); // auto-register
    await user.save();
  }

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );
  res.json({ token });
});

