const mongoose = require('mongoose');
const schema = new mongoose.Schema(
  { userEmail:{type:String,required:true},
    title:{type:String},
    note: { type: String},
   
  },
  {
    timestamps: true,
  }
);
const tasks = mongoose.model("tasks",schema)
module.exports = tasks;