const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// 1. MANUAL REGISTER ROUTE
router.post('/register', async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ error: "User already exists" });

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and save the new user
        user = new User({
            name,
            email,
            mobile,
            password: hashedPassword
        });

        await user.save();
        res.status(201).json({ success: true, message: "User registered successfully" });

    } catch (err) {
        console.error('❌ Registration Error:', err.message);
        res.status(500).json({ error: "Server Error during registration" });
    }
});

// 2. MANUAL LOGIN ROUTE (NEW)
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Compare entered password with hashed password in DB
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Create JWT Token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            message: "Login successful!"
        });

    } catch (err) {
        console.error("❌ Login Error:", err.message);
        res.status(500).json({ error: "Server Error during login" });
    }
});

// 3. GOOGLE LOGIN ROUTE
router.post('/google-login', async (req, res) => {
    try {
        const { email, name, googleId, picture } = req.body;
        let user = await User.findOne({ email });

        if (!user) {
            user = new User({ name, email, googleId, profilePic: picture });
            await user.save();
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(200).json({ success: true, token, user });
    } catch (err) {
        res.status(500).json({ error: "Google Auth Failed" });
    }
});

module.exports = router;