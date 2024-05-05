var mongoose = require("mongoose");




var employeeSchema = mongoose.Schema({

    employeeid:String,
    firstName:String,
    lastName:String,
    emailid:String,
    mobileno:String,
    gender:String,
    bankname:String,
    accountno:String,
    ifsccode:String,
    salary:String


})




var employeeModel = mongoose.model("details", employeeSchema, "details");
module.exports = employeeModel;