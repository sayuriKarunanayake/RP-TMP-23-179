import React, { useState } from 'react';
import axios from 'axios';
import spinner from '../../../Assets/loader-unscreen.gif';
import '../Styles.css';
import { useLocation } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Typography } from '@mui/material';


function FakeCheck() {
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const jobdescription = queryParams.get('jobDescription');

  const analyzeJob = () => {
    setLoading(true);

    axios
      .post('http://127.0.0.1:5008/analyze_job', { job_description: jobDescription })
      .then((response) => {
        setResult(response.data.result);
      })
      .catch((error) => {
        console.error('Failed to fetch data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div role="presentation"  >
        <Breadcrumbs aria-label="breadcrumb" marginLeft="100px" marginTop="20px">
          <Link underline="hover" color="inherit" href="/">
            Dashboard
          </Link>
          <Typography color="text.primary">Scam Checker</Typography>
        </Breadcrumbs>
      </div>
        <br/><br/>
      <div className="container2">
        <h1 style={{ textAlign: "center", color:"rgb(25, 118, 210)" }}>Job Scam Checker</h1>
        <img
            className="title-image"
            src="https://www.launchpads.com.au/assets/css/icons/animated/search/animat-search-color.gif"
            style={{ width: "20%", height: "200px", display: "block", margin: "0 auto" }}
         />
        <br/>
        <div className="form2">
          <div className="form2-group fj-container">
            <textarea className="form2-control" type="text" placeholder="Enter Job Description" value={jobdescription} onChange={(e) => setJobDescription(e.target.value)} />
            <button className="btn2" onClick={analyzeJob}>
              Analyze Job
            </button>
            <div className="result-container" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
               {loading ? (
                  <img className="loader" src={spinner} />
               ) : (
                  <p className="result-text">
                     {`Result: `}
                     <span className={`blinking-text ${result === 'Real Job :)' ? 'real-result' : 'fake-result'}`}>{result}</span>
                  </p>
               )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FakeCheck;