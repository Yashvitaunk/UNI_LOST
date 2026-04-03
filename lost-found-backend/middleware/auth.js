require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const itemRoutes = require('./routes/items');

const app = express();

// 1. Middleware
app.use(cors());
app.use(express.json());

// 2. Database Connection with Sanitization
const uri = process.env.MONGODB_URI ? process.env.MONGODB_URI.trim() : null;

if (!uri) {
  console.error('❌ Error: MONGODB_URI is missing in .env file.');
  process.exit(1);
}

mongoose.connect(uri)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1); 
  });

// 3. API Routes
app.use('/api', itemRoutes);

// 4. Basic Health Check Route
app.get('/', (req, res) => {
  res.send('Lost & Found API is running...');
});

// 5. Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong on the server!' });
});

// 6. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is barking on port ${PORT}`);
});