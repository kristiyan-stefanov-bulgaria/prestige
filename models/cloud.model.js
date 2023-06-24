const mongoose = require('mongoose');

const Droplet = {
  name: {
    type: String,
    required: true,
    maxLength: 25,
  },
  status: {
    type: String,
    default: 'offline',
    enum: ['online', 'offline', 'expired', 'pending']
  },
  cloudSpots: {
    type: Number,
    default: 0
  },
  expirationDate: {
    type: Date,
    default: Date.now() + 1000 * 60 * 60 * 24 * 30
  },
  cloudDuration: {
    type: Number,
    default: 0
  }
}

const cloudSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 25,
  },
  created: {
    type: Date,
    default: Date.now()
  },
  droplets: [Droplet]
});

const Cloud = mongoose.model('Cloud', cloudSchema);

module.exports = Cloud;