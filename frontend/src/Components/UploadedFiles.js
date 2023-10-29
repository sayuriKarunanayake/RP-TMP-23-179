import React, { useEffect, useState } from "react"
import { getUploadedFiles, deleteUploadedFile } from "../Components/api"
import Table from "react-bootstrap/Table"
import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"

const UploadedFiles = () => {
  const [uploads, setUploads] = useState([])

  useEffect(() => {
    async function fetchUploadedFiles() {
      try {
        const response = await getUploadedFiles()
        setUploads(response.data)
      } catch (error) {
        console.error("Error fetching uploaded files:", error)
      }
    }
    fetchUploadedFiles()
  }, [])

  const handleDelete = async (id) => {
    try {
      await deleteUploadedFile(id)
      setUploads((prevUploads) =>
        prevUploads.filter((upload) => upload._id !== id)
      )
    } catch (error) {
      console.error("Error deleting uploaded file:", error)
    }
  }

  const tableStyle = {
    maxWidth: "800px",
    margin: "0 auto",
    color: "#1976d2", // Text color
  }

  return (
    <div>
      <br />
      <h2
        style={{
          textAlign: "center",
          color: "#1976d2",
          textSizeAdjust: "auto",
        }}
      >
        Uploaded Resumes
      </h2>
      <br />
      <Table striped bordered hover style={tableStyle}>
        <thead>
          <tr>
            <th>Job Level</th>
            <th>File Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {uploads.map((upload) => (
            <tr key={upload._id}>
              <td>{upload.jobLevel}</td>
              <td>{upload.pdfPath.split("\\").pop()}</td>
              <td>
                {/* <a
                  href="/uploads/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="primary">View</Button> */}
                {/* </a> */}
                <br />
                <br />
                <Button
                  variant="danger"
                  onClick={() => handleDelete(upload._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <br></br>
      {/* <div
        style={{
          display: "flex",

          alignItems: "center", // Vertically align the buttons
        }} */}
      {/* > */}
      {/* <Link to="/ResumeHome">
          <Button variant="primary" style={{ backgroundColor: "#1976d2" }}>
            Back
          </Button>
          
        </Link> */}
      <center>
        <Link to="/ResumeForms">
          <center>
            <Button
              variant="primary"
              style={{ backgroundColor: "#1976d2" }}
              size="20px"
            >
              Get new Resume
            </Button>
          </center>
        </Link>
      </center>
    </div>
    // </div>
  )
}

export default UploadedFiles
