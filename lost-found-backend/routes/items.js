const express = require('express');
const router = express.Router();
const Item = require('../models/item');

// 1. GET all items (or filtered items)
// URL: GET http://localhost:5000/api/
router.get('/', async (req, res) => {
  let filter = {};
  if (req.query.category) filter.category = req.query.category;
  if (req.query.location) filter.location = req.query.location;
  if (req.query.itemType) filter.itemType = req.query.itemType;

  try {
    const items = await Item.find(filter).sort({ date: -1 });
    res.json(items);
  } catch (err) {
    console.error('Error fetching items:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// 2. POST a new item (The part that was missing!)
// URL: POST http://localhost:5000/api/
router.post('/', async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    console.error('Error saving item:', err);
    res.status(400).json({ error: 'Failed to create item', details: err.message });
  }
});

module.exports = router;