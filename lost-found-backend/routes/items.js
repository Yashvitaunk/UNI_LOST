const express = require('express');
const router = express.Router();
const Item = require('../models/item');

router.get('/', async (req, res) => {
  let filter = {};
  if (req.query.category) filter.category = req.query.category;
  if (req.query.location) filter.location = req.query.location;
  if (req.query.itemType) filter.itemType = req.query.itemType;

  try {
    const items = await Item.find(filter);
    res.json(items);
  } catch (err) {
    console.error('Error fetching items:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
