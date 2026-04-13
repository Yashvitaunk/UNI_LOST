const express = require('express');
const router = express.Router();
const Claim = require('../models/claim');

/**
 * 🚀 1. POST: Submit a new claim
 * Renamed to ensure fresh mapping and avoid 'claimant' ghost error.
 */
router.post('/', async (req, res) => {
    try {
        const { item, claimerRegNo, claimerName } = req.body;

        // 🛡️ 1. Manual Debugging Log
        console.log("--- Processing Claim ---");
        console.log("Target Item:", item);
        console.log("Student Reg:", claimerRegNo);
        console.log("Student Name:", claimerName);
        console.log("------------------------");

        // 🛡️ 2. Validation Check
        if (!item || !claimerRegNo || !claimerName) {
            return res.status(400).json({ 
                error: "Missing required fields.",
                received: { item, claimerRegNo, claimerName }
            });
        }

        // 🛡️ 3. Duplicate Check
        const existingClaim = await Claim.findOne({ item, claimerRegNo });
        if (existingClaim) {
            return res.status(400).json({ error: "You have already submitted a claim for this item." });
        }

        /**
         * 🛠️ 4. FORCE MAPPING
         * We create a clean object. By using the renamed model internally,
         * Mongoose will no longer look for the 'claimant' field.
         */
        const claimData = {
            item: item,
            claimerRegNo: claimerRegNo,
            claimerName: claimerName,
            status: 'pending'
        };

        // .create() handles the schema application fresh
        const savedClaim = await Claim.create(claimData);
        
        console.log(`✅ Success: Claim recorded for ${claimerRegNo}`);
        
        res.status(201).json({ 
            message: "🚀 Claim submitted successfully!", 
            claim: savedClaim 
        });

    } catch (err) {
        console.error("❌ BACKEND ERROR:", err.message);
        res.status(400).json({ 
            error: "Submission failed.", 
            details: err.message 
        });
    }
});

/**
 * 🔔 2. GET: Fetch notifications for a specific student
 */
router.get('/notifications/:regNo', async (req, res) => {
    try {
        const { regNo } = req.params;

        const notifications = await Claim.find({ claimerRegNo: regNo })
            .populate('item') 
            .sort({ createdAt: -1 });

        res.json(notifications);
    } catch (err) {
        console.error("❌ Fetch Error:", err.message);
        res.status(500).json({ error: "Could not fetch notifications." });
    }
});

/**
 * 🛠️ 3. PATCH: Update claim status (For Admin Use)
 */
router.patch('/:id', async (req, res) => {
    try {
        const { status, adminNote } = req.body;
        const updatedClaim = await Claim.findByIdAndUpdate(
            req.params.id,
            { status, adminNote, resolvedAt: Date.now() },
            { new: true }
        );
        res.json(updatedClaim);
    } catch (err) {
        console.error("❌ Update Error:", err.message);
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;