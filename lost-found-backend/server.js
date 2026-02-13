// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/auth');
const itemRoutes = require('./routes/items'); 
const claimRoutes = require('./routes/claims');

const app = express();
app.use(cors());
app.use(express.json());

// 🧪 DEBUG: Check imported routes
console.log('🧪 authRoutes loaded:', typeof authRoutes);
console.log('🧪 itemRoutes loaded:', typeof itemRoutes);
console.log('🧪 claimRoutes loaded:', typeof claimRoutes);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/claims', claimRoutes);

// Debug: print MongoDB URI being used
console.log('⏳ Connecting to MongoDB with URI:', process.env.MONGODB_URI);

// Connect to MongoDB and start server
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
})
.catch(err => {
  console.error('❌ MongoDB connection error:');
  console.error(err.message);
});

// Optional test route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});
