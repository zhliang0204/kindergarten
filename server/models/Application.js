// useless
const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const ApplicationSchema = new Schema({
  _user:{type:Schema.Types.ObjectId, ref: 'User'},
  _event:{type:Schema.Types.ObjectId, ref: 'Event'},
  isJoin:{type:Boolean, default:false},
  serviceHours: {type: Number},
  expectDate:{type:Date},
  expectStarted:{type:Date},
  expectEnded:{type:Date},
  Note:{type:String},
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Application = mongoose.model('Application', ApplicationSchema);
module.exports = Application;