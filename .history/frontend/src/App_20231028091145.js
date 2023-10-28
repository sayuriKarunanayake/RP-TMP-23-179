import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.css"
import "@mui/material"
import "@mui/icons-material"
import "@mui/system"
import axios from "axios";
//IT20197032
import JobPostForm from "./Components/it20197032/createJobPost/JobPostForm.js"
import Headermain from "./Components/Headermain.js"
import Joblist from "./Components/it20197032/jobPostlist/JobList"
import Pmlist from "./Components/it20197032/jobPostlist/Pmlist"
import Cyblist from "./Components/it20197032/jobPostlist/Cyblist"
import Netlist from "./Components/it20197032/jobPostlist/Netlist"
import Dslist from "./Components/it20197032/jobPostlist/Dslist"
import SElist from "./Components/it20197032/jobPostlist/SElist"
import FakeCheck from "./Components/it20197032/fakeCheckJobPost/FakeCheck"
import RegRecruiter from "./Components/it20197032/registerRecruiter/RegRecruiter"
import RecruiterLogin from "./Components/it20197032/loginRecruiter/RecruiterLogin"

import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Profile from "./pages/Profile"

//IT20198954
import React, { useState, lazy, Suspense, useEffect } from "react"
import Result from "./Components/IT20198954/Result"
import Start from "./Components/IT20198954/Start"
import Quiz from "./Components/IT20198954/Quiz"
import { QuizContext, QuizHolder } from "./Components/IT20198954/QuizHolder"
import { useContext } from "react"
import AddUser from "./Components/IT20198954/CreateAccount"
//import NavBar from "./Components/Header";
import Job from "./Components/IT20198954/DesiredJobForm"
//import {QuizHolder} from './Components/IT20198954/QuizHolder';
import Signin from "./Components/IT20198954/Signin"
import UpdateUser from "./Components/IT20198954/UpdateUser"
import JobView from "./Components/IT20198954/ViewJobs"
import Fail from "./Components/IT20198954/FailedPage"
import ViewRecommendations from "./Components/IT20198954/ViewRecommendations"
import HomeTest from "./Components/IT20198954/Home"

//IT20192532
import ResumeHome from "./Components/IT20192532/ResumeHome"
import Resume from "./Components/IT20192532/Resume"
import InputFormPage from "./Components/IT20192532/InputFormPage"
import Resume2 from "./Components/IT20192532/Resume2"
import ResumeSuggestions from "./Components/IT20192532/ResumeSuggestions"
// import Combined from "./Components/IT20192532/Combined";

//IT20201296
import UploadForm from './Components/IT20201296/UploadForm';
import AboutUs from './Components/IT20201296/AboutUs';

function App() {
  //add paths to pages where Headermain should not be visible like login/register
  const shouldRenderHeader = ![
    "/regrecruiter",
    "/recruiterLogin",
    "/",
  ].includes(window.location.pathname)

  //IT20192532 - RESUME BUILDER Storage
  // Remove details from the form
  useEffect(() => {
    localStorage.removeItem("resumeData")
  })

  //IT20198954
  const { start, exit } = useContext(QuizContext)
  const [email, setEmail] = useState("")
  //const LazyHeader = lazy(() => import("./Components/Header"));
  const [jobRole, setJobRole] = useState("") // Add jobRole state here



  //IT20201296
  const [verificationResult, setVerificationResult] = useState(null);
  const [image1, setImage1] = useState(null);
  const [video, setVideo] = useState(null);
  const [headPosePercentage, setHeadPosePercentage] = useState(null); // New state for head pose percentage

  const handleVerification = async (e) => {
    e.preventDefault();

    if (!image1 || !video) {
      console.error('Please upload an image and a video.');
      return;
    }

    const formData = new FormData();
    formData.append('image', image1);
    formData.append('video', video);

    try {
      const response = await axios.post('http://localhost:4000/verify', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const result = response.data;
      setVerificationResult(result);
      setHeadPosePercentage(result.headPosePercentage); // Set head pose percentage state
    } catch (error) {
      console.error('Error:', error);
    }
  };






  return (
    <>
      <Router>
        <div>
          {shouldRenderHeader && <Headermain />}

          <Routes>
            {/* IT20197032 */}
            <Route path="/addjob/:id" element={<JobPostForm />} />
            <Route path="/joblist" element={<Joblist />} />
            <Route path="/pmlist" element={<Pmlist />} />
            <Route path="/cyblist" element={<Cyblist />} />
            <Route path="/netlist" element={<Netlist />} />
            <Route path="/dslist" element={<Dslist />} />
            <Route path="/selist" element={<SElist />} />
            <Route path="/fakecheck" element={<FakeCheck />} />
            <Route path="/regrecruiter" element={<RegRecruiter />} />
            <Route path="/recruiterLogin" element={<RecruiterLogin />} />

            <Route path="/" Component={Home} />
            <Route path="/dashboard" Component={Dashboard} />
            <Route path="/profile/:id" Component={Profile} />

            {/* thisara */}
            {exit === false ? (
              <>
                {start === true ? (
                  <Route exact path="/quiz" element={<Quiz />} />
                ) : (
                  <Route exact path="/quiz" element={<Start />} />
                )}
              </>
            ) : (
              <Route exact path="/quiz" element={<Result />} />
            )}

            <Route exact path="/signup" element={<AddUser />} />
            <Route
              exact
              path="/signin"
              element={<Signin setEmail={setEmail} />}
            />

            <Route exact path="/jobform" element={<Job email={email} />} />
            <Route
              exact
              path="/updateuser"
              element={<UpdateUser email={email} />}
            />
            <Route exact path="/jobs" element={<JobView email={email} />} />
            <Route exact path="/fail" element={<Fail email={email} />} />
            <Route
              exact
              path="/viewrec"
              element={<ViewRecommendations email={email} />}
            />
            <Route exact path="/home" element={<HomeTest email={email} />} />
          </Routes>

          {/* IT 20192532 */}
          <Routes>
            <Route
              exact
              path="/ResumeForms"
              element={<InputFormPage />}
            ></Route>
            <Route
              exact
              path="/resumesugg"
              element={<ResumeSuggestions />}
            ></Route>
            <Route exact path="/ResumeHome" element={<ResumeHome />}></Route>
            <Route path="/resume" element={<Resume />} />
            <Route path="/resume2" element={<Resume2 />} />
          </Routes>


          {/*IT20201296*/}
          <Routes>
            <Route path="/applyform" element={<UploadForm
              onImageUpload={(file) => {
                setImage1(file);
              }}
              onVideoUpload={(file) => {
                setVideo(file);
              }}
              verificationResult={verificationResult}
              headPosePercentage={headPosePercentage}
              onVerifyClick={handleVerification} // Pass handleVerification function as prop
            />} />
            <Route path="/about" element={<AboutUs />} />
          </Routes>



        </div>
      </Router>
    </>
  )
}

export default App;
