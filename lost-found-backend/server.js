// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path'); // Added for path handling

// 1. Env config - Isse exact path mil jayega .env file ka
dotenv.config({ path: path.join(__dirname, '.env') });

// Route Imports
const authRoutes = require('./routes/auth');
const itemRoutes = require('./routes/items'); 
const claimRoutes = require('./routes/claims'); 

const app = express();

// 2. Middleware
app.use(cors()); 
app.use(express.json());

// 🧪 DEBUG: Check if variables are loading
console.log('--- System Check ---');
console.log('📦 Auth Routes:', authRoutes ? 'LOADED' : 'FAILED');
console.log('📦 Item Routes:', itemRoutes ? 'LOADED' : 'FAILED');
console.log('📦 Claim Routes:', claimRoutes ? 'LOADED' : 'FAILED');
console.log('🔑 MONGODB_URI check:', process.env.MONGODB_URI ? 'FOUND' : 'NOT FOUND');
console.log('--------------------');

// 3. API Routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/claims', claimRoutes);

// 4. Root & Health Check
app.get('/', (req, res) => {
    res.json({ 
        message: 'UNI_LOST Backend is LIVE', 
        status: 'Healthy',
        serverTime: new Date().toLocaleString()
    });
});

// 5. Database Connection & Server Start
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('❌ FATAL ERROR: MONGODB_URI is not defined in .env file');
    console.log('💡 TIP: Check if .env file is named correctly and is in the same folder.');
    process.exit(1); 
}

mongoose.connect(MONGODB_URI)
.then(() => {
    console.log('✅ MongoDB Connected Successfully');
    app.listen(PORT, () => {
        console.log(`🚀 Server listening on port ${PORT}`);
    });
})
.catch(err => {
    console.error('❌ Database Connection Failed:', err.message);
});

// 6. Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong on the server!' });
});