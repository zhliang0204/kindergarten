const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  eventname: {type:String},
  _creator: { type: Schema.Types.ObjectId, ref: 'User' },
  started:Date,
  ended:Date,
  reqhours:Number,
  reqpersons:Number,
  candidates:[{type:Schema.Types.ObjectId, ref: 'User' }],
  finals:[{type:Schema.Types.ObjectId, ref: 'User' }],
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Event = mongoose.model('User', eventSchema);
module.exports = Event;