const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteSchema = new Schema({
  _user:{type:Schema.Types.ObjectId, ref: 'User'},
  _event:{type:Schema.Types.ObjectId, ref: 'Event'},
  voted:{type:Number},
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Vote = mongoose.model('Vote', voteSchema);
module.exports = Vote;
