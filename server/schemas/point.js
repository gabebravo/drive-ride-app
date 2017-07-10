const mongoose = require('mongoose');

const PointSchema = mongoose.Schema({

  type: {
    type: String,
    default: 'Point'
  },

  coordinates: {
    type: [Number],
    index: '2dsphere'
  }

});

module.exports = PointSchema;
