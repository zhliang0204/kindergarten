const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: {type:String},
  _creator: { type: Schema.Types.ObjectId, ref: 'User' },
  description: String,
  started:Date,
  ended:Date,
  applybefore: Date,
  exetime:Date,
  reqhours:Number,
  reqOrghours: Number,
  isRequired:{type:Boolean, default:false},
  reqpersons:Number,
  _attendants:[{type:Schema.Types.ObjectId, ref: 'Attendence' }],
  // finals:[{type:Schema.Types.ObjectId, ref: 'Final' }],
  _eventState:{type:String, enum:['vote','apply','process','finish','closed'], default:'vote'},
  _discussion:[{type: Schema.Types.ObjectId, ref: 'Discussion' }],
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;