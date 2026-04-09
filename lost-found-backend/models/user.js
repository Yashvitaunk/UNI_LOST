const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Name is required"],
    trim: true
  },
  email: { 
    type: String, 
    required: [true, "Email is required"], 
    unique: true,
    lowercase: true,
    trim: true
  },
  password: { 
    type: String, 
    required: function() {
      // Only require password if googleId doesn't exist
      return !this.googleId; 
    }
  },
  mobile: { 
    type: String, 
    // unique: true ko hamesha sparse ke sath use karein
    unique: true,
    sparse: true,
    default: null 
  },
  googleId: { 
    type: String, 
    unique: true, 
    sparse: true 
  },
  profilePic: { 
    type: String,
    default: ""
  },
  role: { 
    type: String, 
    enum: ['user', 'admin'], 
    default: 'user' 
  }
}, { timestamps: true });

// 🛠️ FIX FOR INDEX ERRORS:
// Kabhi-kabhi indexing ki wajah se signup fail hota hai. Yeh line indexes ko re-sync karti hai.
userSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('User', userSchema);