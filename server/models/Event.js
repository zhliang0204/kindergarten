const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: {type:String},
  _creator: { type: Schema.Types.ObjectId, ref: 'User' },
  description: String,
  started:Date,
  ended:Date,
  applybefore: Date,
  resource:String,
  exetime:Date,
  reqhours:Number,
  reqOrghours: Number,
  isRequired:{type:Boolean, default:false},
  reqpersons:Number,
  totalHours:{type:Number, default:0},
  // _attendants:[{type:Schema.Types.ObjectId, ref: 'Attendence' }],
  eventState:{type:String, enum:['vote','apply','pre-process','process','finish','close','stop'], default:'vote'},
  // _discussion:[{type: Schema.Types.ObjectId, ref: 'Discussion' }],
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;