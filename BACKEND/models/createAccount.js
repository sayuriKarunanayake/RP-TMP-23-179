const mongoose = require('mongoose'); //export
const Schema = mongoose.Schema; //store attributes in schema

const registerSchema = new Schema({ //create new object

     
  //properties

   name :{
    type: String, //data type
    required :true //validation
   },
 
    email :{
        type: String, //data type
        required :true //validation
    },

   
    pwd:{
        type: String, //data type
        required :true, //validation
        maxlength: 20,
        minlength: 5
    },
 
   jobRole:{
        type: String, //data type
        required :true, //validation
        
    },
    skills:{
        type: String, //data type
        required :true, //validation
         
    },
  
})

const Register = mongoose.model("users",registerSchema); //feedback schema data goes to feedback table

module.exports = Register;