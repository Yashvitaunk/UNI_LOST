const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  // Password is no longer 'required: true' to allow Google Sign-ins
  password: { 
    type: String, 
    required: function() {
      // Only require password if googleId doesn't exist
      return !this.googleId; 
    }
  },
  mobile: { 
    type: String, 
    unique: true,
    sparse: true // Allows multiple users to have 'null' mobile numbers without error
  },
  // New fields for Google Auth
  googleId: { 
    type: String, 
    unique: true, 
    sparse: true 
  },
  profilePic: { 
    type: String 
  },
  role: { 
    type: String, 
    enum: ['user', 'admin'], 
    default: 'user' 
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);