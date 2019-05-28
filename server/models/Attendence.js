const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendenceSchema = new Schema({
  // userName:{type:String},
  _user:{type:Schema.Types.ObjectId, ref: 'User'},
  _event:{type:Schema.Types.ObjectId, ref: 'Event'},
  tag:{type:String, enum:["apply", "organize", "participate", "assigned","assigned Org"]},
  serviceHours: {type: Number},
  expectDate:{type:Number},
  isChecked:{type:Boolean, default:false},
  isShow:{type:Boolean, default:true},
  isCancel:{type:Boolean, default:false},
  isDone:{type:Boolean, default:false},
  Note:[{type:String}],
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Attendence = mongoose.model('Attendence', attendenceSchema);
module.exports = Attendence;
