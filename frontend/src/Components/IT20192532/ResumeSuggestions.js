import React, { useState, useRef } from "react"
import { Carousel, Container, Row, Col, Button, Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import axios from "axios"

const ResumeSuggestions = () => {
  const [file, setFile] = useState(null)
  const [experienceYears, setExperienceYears] = useState("")
  const [jobLevel, setJobLevel] = useState("")
  const [review, setReview] = useState("")

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleUpload = () => {
    const formData = new FormData()

    formData.append("pdf", file)

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

        setReview(`The suggestion is: ${reviewText}`)
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

  const buttonStyle = {
    backgroundColor: "#1976d2",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  }
  return (
    <div>
      <br />
      <Container>
        <div className="container">
          <h1 style={{ color: "#1976d2" }}>
            <b>
              <center>
                ...........................Get Your Own Resume
                Suggestion..............................
              </center>{" "}
            </b>
          </h1>
        </div>
        <br />
        <Row>
          <Col>
            <Carousel>
              <Carousel.Item interval={900}>
                <img
                  width={1600}
                  height={400}
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
                  height={400}
                  className="d-block w-100"
                  src="https://res.cloudinary.com/dpzujklzp/image/upload/v1684931828/resume-format-in-India_dui8ay.jpg"
                  alt="Second slide"
                />
                <Carousel.Caption>
                  {/* Add carousel content here */}
                </Carousel.Caption>
              </Carousel.Item>
              {/* <Carousel.Item interval={1500}>
                <img
                  width={1600}
                  height={400}
                  className="d-block w-100"
                  src="https://res.cloudinary.com/dpzujklzp/image/upload/v1684930698/success1_d0f8if.png"
                  alt="Third slide"
                />
                <Carousel.Caption>
                  {/* Add carousel content here */}
              {/* </Carousel.Caption>
              </Carousel.Item> */}
            </Carousel>
          </Col>
        </Row>
      </Container>
      <br></br>
      <center>
        <div style={cardStyle}>
          <h2 style={{ color: "#1976d2" }}>
            <strong>Upload Your Resume Here</strong>
          </h2>
          <br />
          <input type="file" onChange={handleFileChange} />
          <button style={buttonStyle} onClick={handleUpload}>
            Upload CV
          </button>
          <br />
          <br />
          <h5>Your Experience: </h5>
          <p>{experienceYears}</p>

          <h2 style={{ color: "#1976d2" }}>
            <strong>!!! Add Your Job Level For Amazing Result !!!</strong>
          </h2>

          <form onSubmit={handleFormSubmit}>
            <label>
              Job Level :<br></br>
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
            </label>

            <br />
            <br />
            <button style={buttonStyle} type="submit">
              Get Suggestion
            </button>
          </form>
          <br />
        </div>
      </center>
      <br />
      <center>
        <strong>
          <h3 style={{ color: "#1976d2" }}>
            <p>{review}</p>
          </h3>
        </strong>
      </center>
    </div>
  )
}

export default ResumeSuggestions
