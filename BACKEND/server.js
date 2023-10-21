const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
   
    useNewUrlParser:true,
    useUnifiedTopology:true
   
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB connection success!");
})


//give access to route file here
//IT20197032
const JobPostRouter = require("./routes/jobPost.js");
app.use("/job", JobPostRouter);//1st parameter is the url name to call js file



app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`)
})