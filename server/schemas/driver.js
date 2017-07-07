const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true
  },

  available: {
    type: Boolean,
    default: false
  }
  // location:
});

const Driver = mongoose.model('drivers', DriverSchema);

module.exports = Driver;
