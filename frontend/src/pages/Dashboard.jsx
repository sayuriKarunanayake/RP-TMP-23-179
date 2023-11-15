import React, { useState, useEffect } from "react"
import DashboardHeader from "../layout/DashboardHeader"
import { useNavigate, useLocation } from "react-router-dom"
import axios from "axios"
import { Button, TextField } from "@mui/material"
const buttons = ["Finds Jobs", "CV", "Job Reccomendations", "Job Scam Checker"]

const Dashboard = () => {
  const [email, setEmail] = useState(localStorage.getItem("email"))
  const [resultsData, setResultsData] = useState()
  const [recommendations, setRecommendations] = useState(
    resultsData && resultsData.recommendations
      ? resultsData.recommendations
      : ""
  )
  const [jobRole, setJobRole] = useState("")

  const navigation = useNavigate()

  useEffect(() => {
    // Moved the API call inside useEffect

    getResults()
    // setRecommendations(resultsData.recommendations);
    // setJobRole(resultsData.jobRole);
  }, [email, resultsData, recommendations, jobRole])

  const getResults = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8070/result/find/${email}`
      )

      if (response.status === 200 && response.data.success) {
        setResultsData(response.data.data)
        setRecommendations(response.data.data.recommendations)
        setJobRole(response.data.data.jobRole)
        console.log(response.data.data, "resultsData")
      } else {
        console.log("Error while loading data")
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleTest = async () => {
    if (resultsData && resultsData.recommendations && resultsData.jobRole) {
      navigation("/jobs", {
        state: { dataArray: { jobRole, recommendations } },
      })
    } else navigation("/jobform", { state: { email } })
  }

  const [isHovered, setIsHovered] = useState(false)

  const buttonStyles = {
    marginTop: "40px",
    marginBottom: "15px",
    marginTop: "40px",
    marginBottom: "15px",
    background: isHovered
      ? "linear-gradient(90deg, #1976d2, #00bcd4)"
      : "linear-gradient(90deg, #00bcd4, #1976d2)",
    color: "white",
    transition: "background 0.3s, transform 0.3s, opacity 0.3s",
    cursor: "pointer",
  }

  return (
    <div className="w-full h-screen overflow-hidden bg-[url('https://static.vecteezy.com/system/resources/previews/007/340/656/non_2x/job-interview-illustration-free-vector.jpg')]">
      {/* content */}
      <div className=" w-full px-12 h-full flex flex-col items-center justify-center">
        <div className=" w-full grid grid-cols-[40%_60%]">
          {/* button container */}
          <div className=" w-full grid grid-cols-2 gap-5">
            {/* {buttons.map((btn) => (
              <button
                key={btn}
                className=" bg-blue-600 hover:bg-blue-700 drop-shadow-md font-semibold p-5 h-20 text-center rounded-lg"
              >
                {btn}
              </button>
            ))} */}
            <Button
              style={buttonStyles}
              className=" bg-blue-600 hover:bg-blue-700 drop-shadow-md font-semibold p-5 h-20 text-center rounded-lg"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <a
                href="/joblist"
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontSize: "18px",
                }}
                className="start-link"
              >
                Find Jobs
              </a>
            </Button>
            <Button
              style={buttonStyles}
              className=" bg-blue-600 hover:bg-blue-700 drop-shadow-md font-semibold p-5 h-20 text-center rounded-lg"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <a
                href="/ResumeHome"
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontSize: "18px",
                }}
                className="start-link"
              >
                Resume Enhancement
              </a>
            </Button>
            <Button
              style={buttonStyles}
              className=" bg-blue-600 hover:bg-blue-700 drop-shadow-md font-semibold p-5 h-20 text-center rounded-lg"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handleTest}
            >
              <a
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontSize: "18px",
                }}
                className="start-link"
              >
                Job Recommendations
              </a>
            </Button>
            <Button
              style={buttonStyles}
              className=" bg-blue-600 hover:bg-blue-700 drop-shadow-md font-semibold p-5 h-20 text-center rounded-lg"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <a
                href="/fakecheck"
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontSize: "18px",
                }}
                className="start-link"
              >
                Job Scam Checker
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
