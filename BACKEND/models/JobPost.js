//model is a blueprint like a class
const mongoose = require('mongoose');//require is used to export
//template given as a document to store in mongo DB
const Schema = mongoose.Schema;//schema is the place where attributes stored
//object creation
const JobPostSchema = new Schema({
    //properties declare
    companyName:{
        type : String,
        required : true//backend validation
    },

    title:{
        type : String,
        required : true
    },
    
    location: {
        type : String,
        required : true//backend validation

    },

    jobDescription: {
        type : String,
        required : true//backend validation

    },

    jobLevel: {
        type : String,
        required : true//backend validation

    },

    jobCategory: {
        type : String,
        required : true//backend validation

    },
    recruiterID: {
        type : String,
        required : true
    },
})
//data coming from routes go to DB through models
//declare which schema goes to which table
const jobPosts = mongoose.model("JobPosts",JobPostSchema);//table name,schema created 
module.exports = jobPosts;//export the module