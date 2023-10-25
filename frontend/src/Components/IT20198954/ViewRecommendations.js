import React from "react";
import { useLocation,useNavigate } from "react-router-dom";

function ViewRecommendations() {
  const { state } = useLocation();
  const { updatedUser, userSkills } = state || {};
  const [jobRole, recommendations] = updatedUser || [];
  const navigate = useNavigate();

  const handleNavigateToViewJobs = () => {
    navigate("/jobs", { state: { dataArray: { jobRole, recommendations } } });
    console.log("dataArray view rec page", jobRole,recommendations )
  };

  return (
    <div>
      <h1>View Recommendations</h1>
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
