import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.css"
import "@mui/material"
import "@mui/icons-material"
import "@mui/system"
import JobPostForm from "./Components/it20197032/createJobPost/JobPostForm.js"
import Headermain from "./Components/it20197032/header/Headermain.js"
import Joblist from "./Components/it20197032/jobPostlist/JobList"
import Pmlist from "./Components/it20197032/jobPostlist/Pmlist"
import Cyblist from "./Components/it20197032/jobPostlist/Cyblist"
import Netlist from "./Components/it20197032/jobPostlist/Netlist"
import Dslist from "./Components/it20197032/jobPostlist/Dslist"
import SElist from "./Components/it20197032/jobPostlist/SElist"
import FakeCheck from "./Components/it20197032/fakeCheckJobPost/FakeCheck"
import RegRecruiter from "./Components/it20197032/registerRecruiter/RegRecruiter"
import RecruiterLogin from "./Components/it20197032/loginRecruiter/RecruiterLogin"
import ResumeSuggestions from "./Components/IT20192532/ResumeSuggestions"

import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Profile from "./pages/Profile"

//IT20198954

function App() {
  //add paths to pages where Headermain should not be visible like login/register
  const shouldRenderHeader = ![
    "/regrecruiter",
    "/recruiterLogin",
    "/",
  ].includes(window.location.pathname)

  return (
    <>
      <Router>
        <div>
          {shouldRenderHeader && <Headermain />}

          <Routes>
            <Route path="/addjob" element={<JobPostForm />} />
            <Route path="/joblist" element={<Joblist />} />
            <Route path="/pmlist" element={<Pmlist />} />
            <Route path="/cyblist" element={<Cyblist />} />
            <Route path="/netlist" element={<Netlist />} />
            <Route path="/dslist" element={<Dslist />} />
            <Route path="/selist" element={<SElist />} />
            <Route path="/fakecheck" element={<FakeCheck />} />
            <Route path="/regrecruiter" element={<RegRecruiter />} />
            <Route path="/recruiterLogin" element={<RecruiterLogin />} />
            <Route path="/resumesugg" element={<ResumeSuggestions />} />

            <Route path="/" Component={Home} />
            <Route path="/dashboard" Component={Dashboard} />
            <Route path="/profile" Component={Profile} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
