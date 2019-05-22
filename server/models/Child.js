const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const childSchema = new Schema({
  firstname: String,
  lastname: String,
  birthday: Date,
  age: String,
  sex: String,
  state: {type:String,enum:['stay','graduate','transfer'],default:'stay'},
  _mother: { type: Schema.Types.ObjectId, ref: 'User' },
  _father: { type: Schema.Types.ObjectId, ref: 'User' },

}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Child = mongoose.model('Child', childSchema);
module.exports = Child;