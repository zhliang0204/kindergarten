const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const finalSchema = new Schema({
  _eventId: {type: Schema.Types.ObjectId, ref: 'Event'},
  _userId: {type: Schema.Types.ObjectId, ref: 'User'},
  role:{type: String, enum:['oragnizer','participant'],default:'participant'},
  username:String,
  serviceDate: {type: Date},
},
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
})

const Final = mongoose.model('Final', finalSchema);
module.exports = Final;