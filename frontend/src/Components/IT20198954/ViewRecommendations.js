import React,{useState, useEffect } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import axios from "axios";

function ViewRecommendations() {
  const { state } = useLocation();
  const { updatedUser, userSkills } = state || {};
  const [jobRole, recommendations] = updatedUser || [];
  const navigate = useNavigate();
  const [results, setResults] = useState(localStorage.getItem("results"));
  const [email, setEmail] = useState(localStorage.getItem("email"));
 
  const handleNavigateToViewJobs = () => {
    navigate("/jobs", { state: { dataArray: { jobRole, recommendations } } });
    console.log("dataArray view rec page", jobRole,recommendations )

    
  };

  const newResult = {
    email,
    results,
    recommendations,
    jobRole,
    
  };
  console.log("Before Axios request", newResult);

  axios
  .post(`http://localhost:8070/result/addresults`, newResult)
  .then((response) => {
    console.log("Response:", response.data);
    // alert("Thanks for joining!");
    // window.location = `/signin`;
  })
  .catch((error) => {
    console.error("Axios Error saving results:", error);
    alert("Error occurred during saving results");
  });

  return (
    <div>
      <h1 className="h1rec">View Recommendations</h1>
      <p>Job Role: {jobRole}</p>
      <p>Recommended Job Titles: {userSkills}</p>
      <h2>Recommended Job Titlesn:</h2>
      <ul>
        {recommendations.map((rec, index) => (
          <li key={index}>
            {rec.title}
              {/* (Similarity Score: {rec.score.toFixed(2)}) */}
          </li>
        
      
  )
        // )};  </ul>
        )}   </ul>

<button onClick={handleNavigateToViewJobs}>Go to View Jobs</button>
        
        </div>
        )}
export default ViewRecommendations;
