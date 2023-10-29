import React, { useState, useRef } from "react"
import { Carousel, Container, Row, Col, Button, Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import axios from "axios"
import { uploadFile } from "../api"

const ResumeSuggestions = () => {
  const [file, setFile] = useState(null)
  const [experienceYears, setExperienceYears] = useState("")
  const [jobLevel, setJobLevel] = useState("")
  const [review, setReview] = useState("")

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleUpload = () => {
    if (!file || !jobLevel) {
      alert("Please select a file and provide a job level.")
      return
    }
    const formData = new FormData()
    formData.append("pdf", file)
    formData.append("jobLevel", jobLevel)

    try {
      uploadFile(formData)
      alert("File uploaded successfully")
      setFile(null) // Reset the file selection
      // Do not reset jobLevel here
    } catch (error) {
      console.error("File upload failed:", error)
    }

    axios
      .post(
        "http://192.168.8.100:5003/extract_experience_time_durations",
        formData
      )

      .then((response) => {
        const experience = response.data.experience_time_durations

        setExperienceYears(experience)
        console.log(response.data.experience_time_durations)
      })

      .catch((error) => {
        console.error("Error:", error)
      })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()

    const data = {
      Experience: experienceYears,

      Job_Lev: jobLevel,
    }

    axios
      .post("http://192.168.8.100:5004/predict", data)

      .then((response) => {
        const prediction = response.data.prediction
        //suggestions
        const reviewText =
          prediction === 1
            ? " Great !!! You can apply for the Selected Job Level "
            : "Sorry............ You can't apply for the Selected Job Level"

        setReview(`${reviewText}`)
      })

      .catch((error) => {
        console.error("Error:", error)
      })
  }
  const cardStyle = {
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "50px",
    textAlign: "center",
    transition: "0.5s",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
    width: "600px",
    fontSize: "18px",
  }
  const instructionCardStyle = {
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "20px",
    margin: "10px",
    width: "420px",
    transition: "0.5s",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
  }
  const buttonStyle = {
    backgroundColor: "#1976d2",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    hoover: "0.5s",
    width: "175px",
  }
  return (
    <div>
      <br />
      <Container>
        <div className="container" style={{ color: "#1976d2" }}>
          <h1>
            <b>
              ...........................Get Your Own Resume
              Suggestion..............................
            </b>
            <br></br>
          </h1>
        </div>
        <br></br>
        <Row>
          <Col>
            <Carousel>
              <Carousel.Item interval={900}>
                <img
                  width={1600}
                  height={30}
                  className="d-block w-100"
                  src="https://res.cloudinary.com/dpzujklzp/image/upload/v1684930692/cv_vs_resume_feature-860x465_pcrtzs.png"
                  alt="First slide"
                />
                <Carousel.Caption>
                  {/* Add carousel content here */}
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval={900}>
                <img
                  width={1600}
                  height={30}
                  className="d-block w-100"
                  src="https://res.cloudinary.com/dpzujklzp/image/upload/v1684931828/resume-format-in-India_dui8ay.jpg"
                  alt="Second slide"
                />
                <Carousel.Caption>
                  {/* Add carousel content here */}
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </Container>
      <br></br>

      <center>
        <div>
          <br></br>
          <Container>
            <Row>
              <Col>
                <Card style={instructionCardStyle}>
                  <h2>
                    <strong>!!! Instructions to Use !!!</strong>
                  </h2>
                  <p>Step 1. Upload Your Resume</p>
                  <p>Step 2. Select Job Level</p>
                  <p>Step 3. Click Upload Resume</p>
                  <p>Step 4. Click ok button in the Window</p>
                  <p>
                    To view the uploaded Resumes and Selected Job Levels, you
                    can click the View Button
                  </p>
                  <center>
                    <Button
                      style={buttonStyle}
                      as={Link}
                      to="/uploads" // Add the URL of your view page
                    >
                      View Resumes
                    </Button>
                  </center>
                  <br></br>
                  <center>
                    <Button style={buttonStyle} as={Link} to="/ResumeHome">
                      Back
                    </Button>
                  </center>
                </Card>
              </Col>
              <Col>
                <Card style={cardStyle}>
                  <h2 style={{ color: "#1976d2" }}>
                    <strong>Upload Your Resume Here</strong>
                  </h2>
                  <br />
                  <center>
                    <input type="file" onChange={handleFileChange} />
                  </center>
                  <br></br>
                  <form onSubmit={handleFormSubmit}>
                    <label>
                      <b>Job Level:</b>
                      <div
                        style={{
                          border: "1px solid #ccc",
                          borderRadius: "5px",
                          padding: "10px",
                          width: "200px",
                        }}
                      >
                        <select
                          value={jobLevel}
                          onChange={(e) => setJobLevel(e.target.value)}
                        >
                          <option value="">Select Job Level</option>
                          <option value="Intern">Intern</option>
                          <option value="Associate">Associate</option>
                          <option value="Trainee">Trainee</option>
                          <option value="Mid level">Mid level</option>
                          <option value="Senior">Senior</option>
                        </select>
                      </div>
                    </label>
                    <br></br>
                    <center>
                      <br></br>
                      <button style={buttonStyle} onClick={handleUpload}>
                        Upload Resume
                      </button>
                      <br></br>
                    </center>
                  </form>
                  <br></br>
                  <h5>Your Experience: </h5>
                  <p>{experienceYears}</p>
                  <br></br>

                  <center>
                    <strong>
                      <h2>
                        <p>{review}</p>
                      </h2>
                    </strong>
                    {/* <button style={buttonStyle} type="submit">
                      Get Suggestion
                    </button> */}
                  </center>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
        {/* <p>{review}</p> */}
      </center>
    </div>
  )
}
export default ResumeSuggestions
