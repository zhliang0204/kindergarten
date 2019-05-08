const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type:String,unique:true},
  firstname: String,
  lastname: String,
  password: String,
  googleId:String,
  role: {type:String,enum:['admin','dean','teacher','parent'],default:'teacher'},
  email:{type:String, unique:true},
  phone:String,
  address1:String,
  address2:String,
  city:String,
  postal:String,
  state:String,
  country:String,
  childname:String,
  historyServiceHours: [
    {
      year: String,
      serviceHours: Number
    }
  ],
  currentServiceHours: Number,
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const User = mongoose.model('User', userSchema);
module.exports = User;
