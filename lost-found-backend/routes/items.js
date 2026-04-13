// routes/items.js
const express = require('express');
const router = express.Router();
const Item = require('../models/item');

/**
 * 1. GET Public Items (Directory)
 * URL: GET /api/items
 * LOGIC: Only returns "Found" items to students.
 */
router.get('/', async (req, res) => {
    try {
        let filter = {};

        // 🛡️ SECURITY: Force the filter to ONLY show "found" items in the UI.
        // This keeps "lost" items hidden from the public list.
        filter.itemType = 'found';

        // Filters for Category and Location
        if (req.query.category) filter.category = req.query.category;
        if (req.query.location) filter.location = req.query.location;

        // Search by Name (Case-insensitive keyword search)
        if (req.query.name) {
            filter.name = { $regex: req.query.name, $options: 'i' };
        }

        const items = await Item.find(filter).sort({ createdAt: -1 });
        res.json(items);
    } catch (err) {
        console.error('Error fetching public directory:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

/**
 * 2. POST New Item (Report Lost or Found)
 * URL: POST /api/items
 */
router.post('/', async (req, res) => {
    try {
        const { name, itemType } = req.body;

        if (!name || !itemType) {
            return res.status(400).json({ error: 'Item name and type are required' });
        }

        const newItem = new Item(req.body);
        const savedItem = await newItem.save();
        
        console.log(`✅ ${itemType.toUpperCase()} report saved to Atlas: ${name}`);
        res.status(201).json(savedItem);
    } catch (err) {
        console.error('Error saving item:', err);
        res.status(400).json({ error: 'Failed to create report', details: err.message });
    }
});

/**
 * 3. ADMIN ONLY: GET All Lost Reports
 * URL: GET /api/items/admin/lost-reports
 * Use this to show the "Hidden" lost items during your presentation.
 */
router.get('/admin/lost-reports', async (req, res) => {
    try {
        const lostItems = await Item.find({ itemType: 'lost' }).sort({ createdAt: -1 });
        res.json(lostItems);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * 4. GET Single Item Details
 * URL: GET /api/items/:id
 * Used when a user clicks "View Details" to see the claim button.
 */
router.get('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ error: 'Item not found' });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: 'Invalid Item ID' });
    }
});

module.exports = router;