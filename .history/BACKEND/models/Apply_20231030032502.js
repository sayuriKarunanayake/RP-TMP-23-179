const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ApplicationsSchema = new Schema({

    fullName:{
        type : String,
        required : true
    },
    phoneNo:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true
    },
    videoLink:{
        type : String,
      
    },
    linkedIn:{
        type : String,
     
    },
    jobid:{
        type : String,
        
    },
})

const Applications = mongoose.model("Applications",ApplicationsSchema);
module.exports = Applications;