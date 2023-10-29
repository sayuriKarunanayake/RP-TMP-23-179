const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
const dotenv = require("dotenv")
const app = express()
require("dotenv").config()
const path = require("path")

const PORT = process.env.PORT || 8070

app.use(cors())
app.use(bodyParser.json())

const URL = process.env.MONGODB_URL

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const connection = mongoose.connection
connection.once("open", () => {
  console.log("MongoDB connection success!")
})

//give access to route file here
//IT20197032
const JobPostRouter = require("./routes/jobPost.js")
app.use("/job", JobPostRouter)

const RecuiterRouter = require("./routes/recruiterReg.js")
app.use("/recruiter", RecuiterRouter)

//IT20198954
const registerRouter = require("./routes/createAccount.js") //import  register routes
app.use("/register", registerRouter) //create register routes

const resultRouter = require("./routes/quiz.js") //import  register routes
app.use("/result", resultRouter) //create register routes

// //IT20192532
// const resumeRoutes = require("./routes/resumeRoutes")
// app.use("/resumes", resumeRoutes)

const uploadRoutes = require("./routes/uploadRRoutes")
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// app.use("/uploads", express.static("uploads"))
// Serve uploaded files
app.use("/api", uploadRoutes)

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`)
})
