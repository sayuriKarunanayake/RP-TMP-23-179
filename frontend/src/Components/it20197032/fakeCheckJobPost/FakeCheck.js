import React, { useState } from 'react';
import axios from 'axios';
import spinner from '../../../Assets/loader-unscreen.gif';
import '../Styles.css';
import { useLocation } from 'react-router-dom';

function FakeCheck() {
   const [jobDescription, setJobDescription] = useState('');
   const [result, setResult] = useState('');
   const [loading, setLoading] = useState(false);
   const location = useLocation();
   const queryParams = new URLSearchParams(location.search);
   const jobdescription = queryParams.get('jobDescription');

   const analyzeJob = () => {
      setLoading(true); // Set loading to true when the request is initiated.

      axios
         .post('http://127.0.0.1:5000/analyze_job', { job_description: jobDescription })
         .then((response) => {
            setResult(response.data.result);
         })
         .catch((error) => {
            console.error('Failed to fetch data:', error);
         })
         .finally(() => {
            setLoading(false); // Set loading to false when the request is complete.
         });
   };

   return (
      <>
      <br/><br/>
         <div className="container2">
            <h3 style={{textAlign:"center"}}>Job Scam Checker</h3>
            <br/>
            <div className="form2">
               <div className="form2-group fj-container">
                  <textarea className="form2-control" type="text" placeholder="Enter Job Description" value={jobdescription} onChange={(e) => setJobDescription(e.target.value)} />
                  <button className="btn2" onClick={analyzeJob}>
                     Analyze Job
                  </button>
                  <div className="result-container" style={{ textAlign:'center' }}>{loading ? <img className="loader" src={spinner} /> : <p style={{ color: 'black', fontSize: '20px'}}>Result: {result}</p>}</div>
               </div>
            </div>
         </div>
      </>
   );
}

export default FakeCheck;