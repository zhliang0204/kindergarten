const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const avaerageServiceHoursSchema = new Schema({
  year: String,
  childNum: Number,
  AveHours: Number,
  TotalHours: Number,
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const AverageServiceHours = mongoose.model('AverageServiceHours', avaerageServiceHoursSchema);
module.exports = AverageServiceHours;