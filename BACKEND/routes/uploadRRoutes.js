const express = require("express")
const router = express.Router()
const multer = require("multer")
const Upload = require("../models/Upload")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage })

// Upload a file
router.post("/upload", upload.single("pdf"), async (req, res) => {
  try {
    const { jobLevel } = req.body
    const pdfPath = req.file.path
    const upload = new Upload({ jobLevel, pdfPath })
    await upload.save()
    res.json(upload)
  } catch (error) {
    res.status(500).json({ error: "File upload failed" })
  }
})

// Get all uploads
router.get("/uploads", async (req, res) => {
  try {
    const uploads = await Upload.find()
    res.json(uploads)
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve uploads" })
  }
})

// Delete an upload by ID
router.delete("/uploads/:id", async (req, res) => {
  try {
    const upload = await Upload.findByIdAndDelete(req.params.id)
    res.json(upload)
  } catch (error) {
    res.status(500).json({ error: "Could not delete upload" })
  }
})

module.exports = router
