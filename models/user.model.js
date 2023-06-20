const mongoose = require('mongoose');

const accountsSchema = require('./user.accounts.model').accountsSchema;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
    password: {
      type: String,
      required: true,
      trim: true
  },
  accounts: [accountsSchema],
  customAPI: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CustomAPI'
  }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;