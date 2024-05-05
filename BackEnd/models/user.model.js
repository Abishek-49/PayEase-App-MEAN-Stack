const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
































/*var mongoose = require("mongoose");

var signupSchema = mongoose.Schema({


    fullName:String,
    email:String,
    password:String,
    mobile:String,
   


})




var signupModel = mongoose.model("signup", signupSchema, "signup");





module.exports = signupModel;*/
