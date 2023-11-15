import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { height } from "@mui/system";
import { Tooltip} from "@mui/material";
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';

import quiz1 from "../../Assets/IT20198954/quiz5.png";

function ViewRecommendations() {
  const { state } = useLocation();
  const { updatedUser, userSkills } = state || {};
  const [jobRole, recommendations] = updatedUser || [];
  const navigate = useNavigate();
  const [results, setResults] = useState(localStorage.getItem("results"));
  const [email, setEmail] = useState(localStorage.getItem("email"));

  const handleNavigateToViewJobs = () => {
    navigate("/jobs", { state: { dataArray: { jobRole, recommendations } } });
    console.log("dataArray view rec page", jobRole, recommendations);
  };

  const newResult = {
    email,
    results,
    recommendations,
    jobRole,
  };
  console.log("Before Axios request", newResult);

  axios
    .post(`https://itconnect-backend-8c64d94c6e02.herokuapp.com/result/addresults`, newResult)
    .then((response) => {
      console.log("Response:", response.data);
      // alert("Thanks for joining!");
      // window.location = `/signin`;
    })
    .catch((error) => {
      console.error("Axios Error saving results:", error);
      // alert("Error occurred during saving results");
    });

  return ( 
    <div
    style={{
      backgroundColor: "#eaebee", // Add your desired background color here
      //backgroundImage: `url(${quiz1})`,
      height:"auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >  
    <div> 
      
      <Typography 
        style={{
          color: "#1976d2",
          marginBottom: "20px",
          marginTop: "70px",
          marginLeft: "200px",
          marginRight:"220px"
        
      }} variant="h4" align="center"  >
            View Recommendations
          </Typography>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "auto",
        marginTop:"70px",
      }}
    >
       
      <Card style={{   maxWidth: "500px" , marginLeft:"20px", marginRight:"20px",borderRadius: "10px" , height:"auto" , borderRadius: "10px",
            boxShadow: "0px 4px 6px rgba(5, 2,2, 0.5)",}}>
        <CardContent >
          <Typography variant="h5" align="center" gutterBottom style={{marginTop: "20px", fontSize: "2rem" , marginLeft:"20px", marginRight:"20px"}}>
           Recommended Job roles
          </Typography>
        
          {/* <Typography variant="h6" gutterBottom>
            Job Role: {jobRole}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Recommended Job Titles:
          </Typography> */}

          <ul  style= {{marginTop: "30px" ,marginLeft:"40px",}}>
          <FiberManualRecordRoundedIcon  sx={{ color: "#1976d2" ,fontSize: "12px" }}></FiberManualRecordRoundedIcon>&nbsp;
                 {jobRole}
            {recommendations.map(
              (rec, index) => (
                <li key={index}>
                  <FiberManualRecordRoundedIcon  sx={{ color: "#1976d2" ,fontSize: "12px" }}></FiberManualRecordRoundedIcon>&nbsp;
                  {rec.title}
                  {/* (Similarity Score: {rec.score.toFixed(2)}) */}
                </li>
              )
              // )};  </ul>
            )}{" "}
          </ul>

          <Tooltip title="Click to View Recommended Job posts" arrow>
          {/* <button onClick={handleNavigateToViewJobs}>Go to View Jobs</button> */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleNavigateToViewJobs}
            
            style= {{marginTop: "30px" , width:"350px",marginBottom:"15px" ,marginLeft: "35px",marginRight: "35px"}}
          >
            View Jobs
          </Button> </Tooltip>
        </CardContent>   <br></br>  
      </Card>  
    </div> <br></br>  <br></br>  <br></br> 
    </div>   </div>
  );
}
export default ViewRecommendations;
