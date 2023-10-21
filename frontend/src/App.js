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

function App() {
  return (
    <Router>
    <div>
      <Headermain />

      <Routes>
        <Route path="/addjob" element={<JobPostForm />} />
        <Route path="/joblist" element={<Joblist />} />
        <Route path="/" element={<Homepage />} />
        

      </Routes>
    </div>
  </Router>
  );
}

export default App;
