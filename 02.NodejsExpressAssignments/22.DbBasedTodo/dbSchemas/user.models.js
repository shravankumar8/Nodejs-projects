const mongoose = require("mongoose");
const userschema = new mongoose.Schema({
  userName: {
    type:String,
    required:true,
    unique:true,
    lowercase:true,
  },
});
