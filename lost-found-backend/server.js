// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// 1. Pathing Fix: Ensure it finds the .env file in the subfolder
dotenv.config({ path: path.join(__dirname, '.env') });

const authRoutes = require('./routes/auth');
const itemRoutes = require('./routes/items'); 
const claimRoutes = require('./routes/claims');

const app = express();

// 2. Updated Middleware: Explicitly allow Port 5500
app.use(cors({
    origin: ['http://127.0.0.1:5500', 'http://localhost:5500'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());

// 🧪 DEBUG: Essential to check if routes are functions (not objects)
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
    console.error('❌ ERROR: MONGODB_URI is undefined. Check your .env file location.');
    process.exit(1);
}

// Connect to MongoDB and start server
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('✅ MongoDB connected successfully');
    // Important: Server ONLY starts if DB connection is successful
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
        console.log(`📡 Accepting requests from http://127.0.0.1:5500`);
    });
})
.catch(err => {
    console.error('❌ MongoDB connection error:');
    console.error(err.message);
});

// Root test route
app.get('/', (req, res) => {
    res.send('UNI_LOST Backend is running!');
});