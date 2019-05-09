const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendenceSchema = new Schema({
  userName:{type:String},
  _user:{type:Schema.Types.ObjectId, ref: 'User'},
  _event:{type:Schema.Types.ObjectId, ref: 'Event'},
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Attendence = mongoose.model('Attendence', attendenceSchema);
module.exports = Attendence;
