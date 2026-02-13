const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: String,
  category: String,
  location: String,
  itemType: String,
  // add any other fields you need
});

module.exports = mongoose.model('Item', itemSchema);
