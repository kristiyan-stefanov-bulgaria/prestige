const mongoose = require('mongoose');

const accountsSchema = require('./user.accounts.model').accountsSchema;

const eventsSchema = {
  type: Number,
  name: {
    type: String,
    minlength: 1,
    maxlength: 50,
  },
  note: {
    type: String,
    minlength: 1,
    maxlength: 50,
  },
  date: {
    type: Date,
    default: Date.now
  }
};

const graphSchema = {
  leveledAccounts: {
    type: Number,
    default: 0,
  },
  runningMachines: {
    type: Number,
    default: 0,
  },
  restrictedMachines: {
    type: Number,
    default: 0,
  },
  machineSpots: {
    type: Number,
    default: 0,
  },
  hourlyGraph: {
    type: [Number],
    default: Array(24).fill(0),
  }
};

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
  }],
  logicProfiles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LogicProfile'
  }],
  license: {
    active: Boolean,
    expiry: Date
  },
  events: [eventsSchema],
  storageProfiles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StorageProfiles'
  }],
  graph: graphSchema
});

const User = mongoose.model('User', userSchema);

module.exports = User;