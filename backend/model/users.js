const mongoose = require('mongoose');
const schema = new mongoose.Schema(
  {
    name:{type:String},
    email: { type: String, required: true, unique : true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const users = mongoose.model("users",schema)
module.exports = users;