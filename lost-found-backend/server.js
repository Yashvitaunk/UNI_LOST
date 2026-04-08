// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// 1. Env config (Render handles env variables automatically, but this keeps local working)
dotenv.config();

const authRoutes = require('./routes/auth');
const itemRoutes = require('./routes/items'); 
const claimRoutes = require('./routes/claims');

const app = express();

// 2. Updated Middleware: Allow ALL origins for deployment 🚀
// Isse GitHub Pages aur Localhost dono se requests aayengi toh server block nahi karega.
app.use(cors()); 

app.use(express.json());

// 🧪 DEBUG: Check if routes are loaded correctly
console.log('--- Route Import Check ---');
console.log('🧪 authRoutes loaded:', typeof authRoutes);
console.log('🧪 itemRoutes loaded:', typeof itemRoutes);
console.log('🧪 claimRoutes loaded:', typeof claimRoutes);
console.log('--------------------------');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/claims', claimRoutes);

// 3. Debug: Verify the URI is being read correctly
if (!process.env.MONGODB_URI) {
    console.error('❌ ERROR: MONGODB_URI is missing in Environment Variables.');
}

// Connect to MongoDB and start server
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('✅ MongoDB connected successfully');
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`📡 CORS is now open for all origins (including GitHub Pages)`);
    });
})
.catch(err => {
    console.error('❌ MongoDB connection error:');
    console.error(err.message);
});

// Root test route
app.get('/', (req, res) => {
    res.send('UNI_LOST Backend is LIVE and Running!');
});