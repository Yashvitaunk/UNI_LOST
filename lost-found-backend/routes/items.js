const express = require('express');
const router = express.Router();
const Item = require('../models/item');

// 1. GET all items (with Search and Filters)
// URL: GET http://localhost:5000/api/items
router.get('/', async (req, res) => {
    try {
        let filter = {};

        // Filter by Category, Location, or Type (lost/found)
        if (req.query.category) filter.category = req.query.category;
        if (req.query.location) filter.location = req.query.location;
        if (req.query.itemType) filter.itemType = req.query.itemType;

        // NEW: Search by Name (Case-insensitive keyword search)
        if (req.query.name) {
            filter.name = { $regex: req.query.name, $options: 'i' };
        }

        // Fetch items and sort by newest first
        const items = await Item.find(filter).sort({ createdAt: -1 });
        res.json(items);
    } catch (err) {
        console.error('Error fetching items:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// 2. POST a new item
// URL: POST http://localhost:5000/api/items
router.post('/', async (req, res) => {
    try {
        // Simple check to ensure required data is present
        if (!req.body.name || !req.body.itemType) {
            return res.status(400).json({ error: 'Item name and type are required' });
        }

        const newItem = new Item(req.body);
        const savedItem = await newItem.save();
        
        console.log(`✅ New ${req.body.itemType} item saved to Atlas: ${req.body.name}`);
        res.status(201).json(savedItem);
    } catch (err) {
        console.error('Error saving item:', err);
        res.status(400).json({ error: 'Failed to create item', details: err.message });
    }
});

// 3. GET a single item by ID (Useful for a "Details" page later)
router.get('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.id);
        if (!item) return res.status(404).json({ error: 'Item not found' });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: 'Invalid Item ID' });
    }
});

module.exports = router;