const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    required: true 
  },
  location: { 
    type: String, 
    required: true 
  }, // This handles both "Last Seen" and "Found Location"
  date: { 
    type: String 
  }, // For the "Date Found" or "Date Lost" field
  description: { 
    type: String 
  }, // For the "Detailed Description" textarea
  contact: { 
    type: String 
  }, // For the "Preferred Contact" field
  itemType: { 
    type: String, 
    enum: ['lost', 'found'], 
    required: true 
  }, // Distinguishes between a Lost report and a Found report
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Item', itemSchema);