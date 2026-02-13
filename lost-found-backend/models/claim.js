// models/Claim.js
const mongoose = require('mongoose');
const claimSchema = new mongoose.Schema({
  item:      { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  claimant:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status:    { type: String, enum: ['pending','approved','rejected'], default: 'pending' },
  proof:     String,    // optional proof info (e.g. description/photo match)
  createdAt: { type: Date, default: Date.now },
  resolvedAt: Date
});
module.exports = mongoose.model('Claim', claimSchema);

