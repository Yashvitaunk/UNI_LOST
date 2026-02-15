// routes/claims.js
const express = require('express');
const router = express.Router();
const Claim = require('../models/claim');

// Create a new claim
router.post('/', async (req, res) => {
  try {
    const claim = new Claim(req.body);
    await claim.save();
    res.status(201).json(claim);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
