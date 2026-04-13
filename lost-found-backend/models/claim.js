const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({
  item: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Item', 
    required: [true, "Item ID is required"] 
  },
  claimerRegNo: { 
    type: String, 
    required: [true, "Registration number is required"],
    trim: true 
  },
  claimerName: { 
    type: String, 
    required: [true, "Claimer name is required"],
    trim: true 
  },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'], 
    default: 'pending' 
  },
  adminNote: { type: String, default: "" },
  resolvedAt: { type: Date }
}, { 
  timestamps: true 
});

// Using 'ItemClaim' instead of 'Claim' to kill the "claimant" ghost error
module.exports = mongoose.models.ItemClaim || mongoose.model('ItemClaim', claimSchema);