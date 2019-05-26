const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const datepickerSchema = new Schema({
  // userName:{type:String},
  _user:{type:Schema.Types.ObjectId, ref: 'User'},
  _event:{type:Schema.Types.ObjectId, ref: 'Event'},
  _eventSchedule:{type:Schema.Types.ObjectId, ref: 'EventSchedule'},
  pick:[Number],
  Note:{type:[{
    apply:String, 
    organize:String, 
    participate:String, 
    assigned:String
    }]
  },
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const DatePicker = mongoose.model('DatePicker', datepickerSchema);
module.exports = DatePicker;