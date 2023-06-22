const mongoose = require('mongoose');

const storageProfilesSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 1,
    maxlength: 50,
    required: true,
  },
  note: {
    type: String,
    minlength: 1,
    maxlength: 50,
    required: true,
  },
});

const StorageProfiles = mongoose.model('StorageProfiles', storageProfilesSchema);

module.exports = StorageProfiles;