
// useless
const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const discussionSchema = new Schema({
  _event: { type: Schema.Types.ObjectId, ref: 'Event' },
  _user: {type: Schema.Types.ObjectId, ref:"User"},
  // username: {type:String},
  _to:{type:Schema.Types.ObjectId,ref:"Discussion"},
  content: {type: String, required:true}
  
 }, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Discussion = mongoose.model('Discussion', discussionSchema);
module.exports = Discussion;