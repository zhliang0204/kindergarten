const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const finalschema = new Schema({
  // userName:{type:String},
  _user:{type:Schema.Types.ObjectId, ref: 'User'},
  _event:{type:Schema.Types.ObjectId, ref: 'Event'},
  tag:{type:String, enum:["apply", "organize", "participate", "assigned","assigned Org"]},
  serviceHours: {type: Number},
  expectDate:{type:Number},
  isChecked:{type:Boolean, default:false},
  isShow:{type:Boolean, default:true},
  isDone:{type:Boolean, default:false},
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

const Final = mongoose.model('Final', finalschema);
module.exports = Final;