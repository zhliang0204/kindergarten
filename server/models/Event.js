const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  eventname: {type:String},
  _creator: { type: Schema.Types.ObjectId, ref: 'User' },
  content: String,
  started:Date,
  ended:Date,
  reqhours:Number,
  reqpersons:Number,
  candidates:[{type:Schema.Types.ObjectId, ref: 'Application' }],
  finals:[{type:Schema.Types.ObjectId, ref: 'User' }],
  eventState:[{type:String, enum:['new','published','followed','closed'], default:'new'}],
  discussion:[
    {
      _userId:{type: Schema.Types.ObjectId, ref: 'User' },
      username: String, 
      content:String
    }],
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;