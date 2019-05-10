const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendenceSchema = new Schema({
  userName:{type:String},
  _user:{type:Schema.Types.ObjectId, ref: 'User'},
  _event:{type:Schema.Types.ObjectId, ref: 'Event'},
  tag:{type:String, enum:["apply", "organize", "participate", "assigned","assigned Org"]},
  expectDate:{type:Date},
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

const Attendence = mongoose.model('Attendence', attendenceSchema);
module.exports = Attendence;
