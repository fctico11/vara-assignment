const mongoose = require('mongoose');

const resourceConsumptionSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true
  },
  month: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  consumption: {
    type: Number,
    required: true
  }
});

const ResourceConsumption = mongoose.model('ResourceConsumption', resourceConsumptionSchema);

module.exports = ResourceConsumption;

