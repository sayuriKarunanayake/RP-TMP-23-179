import React, { useState } from "react"
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
        const reviewText = prediction === 1 ? "Good" : "Bad"

        setReview(`The suggestion is: ${reviewText}`)
      })

      .catch((error) => {
        console.error("Error:", error)
      })
  }

  return (
    <div>
      <h1>CV Analyzer</h1>

      <div>
        <h2>Step 1: Upload Your CV</h2>

        <input type="file" onChange={handleFileChange} />

        <button onClick={handleUpload}>Upload CV</button>

        <p>{experienceYears}</p>
      </div>

      <div>
        <h2>Step 2: Get a Review</h2>

        <form onSubmit={handleFormSubmit}>
          <label>
            Job Level:
            <input
              type="text"
              value={jobLevel}
              onChange={(e) => setJobLevel(e.target.value)}
            />
          </label>

          <br />

          <button type="submit">Get Review</button>
        </form>

        <p>{review}</p>
      </div>
    </div>
  )
}

export default ResumeSuggestions
