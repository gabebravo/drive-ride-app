const mongoose = require('mongoose');
const PointSchema = require('./point')

const DriverSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true
  },

  available: {
    type: Boolean,
    default: false
  },

  geometry: PointSchema

});

const Driver = mongoose.model('drivers', DriverSchema);

module.exports = Driver;
