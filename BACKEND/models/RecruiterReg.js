const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RecruiterRegSchema = new Schema({

    firstName:{
        type : String,
        required : true
    },
    lastName:{
        type : String,
        required : true
    },
    company_name:{
        type : String,
        required : true
    },
    currentJob:{
        type : String,
        required : true
    },
    contactNo:{
        type : String,
        required : true
    },
    workMail:{
        type : String,
        required : true
    },
    pwd:{
        type : String,
        required : true
    },
    
})

const Recruiters = mongoose.model("Recruiters",RecruiterRegSchema);
module.exports = Recruiters;