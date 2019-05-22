const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username:String,
  firstname: String,
  lastname: String,
  password: String,
  role: {type:String,enum:['admin','dean','teacher','parent'],default:'teacher'},
  subrole:{type:String, enum:["father", "mother"]},
  _child:[{type:Schema.Types.ObjectId, ref: 'Child' }],
  email:{type:String, unique:true},
  phone:String,
  address1:String,
  address2:String,
  city:String,
  postal:String,
  state:String,
  country:String,
  childname:String,
  childNum:Number,
  isActive:Boolean,
  activeCode:String,
  historyServiceHours: [
    {
      year: String,
      totalHours: Number,
      aveHours:Number,
    }
  ],
  totalHours: {type: Number, default:0},
  aveHours: {type: Number, default:0},
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const User = mongoose.model('User', userSchema);
module.exports = User;
