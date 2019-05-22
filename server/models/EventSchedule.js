const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventScheduleschema = new Schema({
  _event: {type: Schema.Types.ObjectId, ref: 'Event'},
  _creator: { type: Schema.Types.ObjectId, ref: 'User' },
  isdone: {type:Boolean, default:false},
  expectedDates: [{
    started:Date,
    ended:Date,
    picker:Number
  }]
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const EventSchedule = mongoose.model('EventSchedule', eventScheduleschema);
module.exports = EventSchedule;