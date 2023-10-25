import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import '@mui/material';
import '@mui/icons-material';
import '@mui/system';
import JobPostForm from './Components/it20197032/createJobPost/JobPostForm.js';
import Headermain from './Components/it20197032/header/Headermain.js';
import Joblist from './Components/it20197032/jobPostlist/JobList';
import Homepage from './Components/it20197032/homepage/Homepage';
import Pmlist from './Components/it20197032/jobPostlist/Pmlist';
import Cyblist from './Components/it20197032/jobPostlist/Cyblist';
import Netlist from './Components/it20197032/jobPostlist/Netlist';
import Dslist from './Components/it20197032/jobPostlist/Dslist';
import SElist from './Components/it20197032/jobPostlist/SElist';
import FakeCheck from './Components/it20197032/fakeCheckJobPost/FakeCheck';
import RegRecruiter from './Components/it20197032/registerRecruiter/RegRecruiter';
import RecruiterLogin from './Components/it20197032/loginRecruiter/RecruiterLogin';


//IT20198954
import React, { useState, lazy, Suspense } from "react";
import Result from "./Components/IT20198954/Result";
import Start from "./Components/IT20198954/Start";
import Quiz from "./Components/IT20198954/Quiz";
import { QuizContext, QuizHolder } from "./Components/IT20198954/QuizHolder";
import { useContext } from "react";
import AddUser from "./Components/IT20198954/CreateAccount";
import NavBar from "./Components/Header";
import Job from "./Components/IT20198954/DesiredJobForm";
//import {QuizHolder} from './Components/IT20198954/QuizHolder';
import Signin from "./Components/IT20198954/Signin";
import UpdateUser from "./Components/IT20198954/UpdateUser";
import JobView from "./Components/IT20198954/ViewJobs";
import Fail from "./Components/IT20198954/FailedPage";
import ViewRecommendations from "./Components/IT20198954/ViewRecommendations";
import Home from "./Components/IT20198954/Home";

function App() {

  //it20198954
  const { start, exit } = useContext(QuizContext);
  const [email, setEmail] = useState("");
  const LazyHeader = lazy(() => import("./Components/Header"));
  const [jobRole, setJobRole] = useState(""); // Add jobRole state here
   
  return (
    <> 
    <Router>
    <div>
      <Headermain />

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
        <Route path="/" element={<Homepage />} />
        

      </Routes>
    </div>
  </Router>

  {/* It20198954 */}
  
  <Router>

  {" "}
        <Suspense fallback={<div>Loading...</div>}>
          {/* <LazyHeader /> */}

          <NavBar  email={email} ></NavBar>
          <Routes>
            {exit === false ? (
              <>
                {start === true ? (
                  <Route exact path="/quiz" element={<Quiz  />} />
                ) : (
                  <Route exact path="/quiz" element={<Start/>} />
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
            <Route exact path="/viewrec" element={<ViewRecommendations email={email} />} />
            <Route exact path="/home" element={<Home email={email} />} />
          </Routes>
        </Suspense>

  </Router>
   </> 
  );
}

export default App;
