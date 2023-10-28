const mongoose = require("mongoose")

const uploadSchema = new mongoose.Schema({
  jobLevel: String,
  pdfPath: String,
})

module.exports = mongoose.model("Upload", uploadSchema)
