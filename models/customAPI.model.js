const mongoose = require('mongoose');

const customAPISchema = new mongoose.Schema({
  apiKey: String,
  createdAt: Date,
  expires: Date,
});

const CustomAPI = mongoose.model('CustomAPI', customAPISchema);

module.exports = CustomAPI;