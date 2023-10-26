const mongoose = require('mongoose'); //export
const Schema = mongoose.Schema; //store attributes in schema

const quizSchema = new Schema({ //create new object

     
  //properties
  email :{
    type: String, //data type
    required :true //validation
},

   results :{
    type: String, //data type
    required :true //validation
   },
 
   recommendations:{
        type: Array, //data type
        required :true, //validation
        
    },

   jobRole:{
        type: String, //data type
        required :true, //validation
        
    },
  
})

const Results = mongoose.model("results",quizSchema); //feedback schema data goes to feedback table

module.exports = Results;