// useless
const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const ApplicationSchema = new Schema({
  _eventId: { type: Schema.Types.ObjectId, ref: 'Event' },
  _userId: {type:Schema.Types.ObjectId, ref: "User"},
  serviceDate: Date,
 

}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Application = mongoose.model('Application', ApplicationSchema);
module.exports = Application;