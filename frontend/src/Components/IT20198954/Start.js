import React, { useContext, lazy, Suspense, useState, useEffect } from "react";
import { QuizContext } from "./QuizHolder";
import "../../CSS/it20198954.css";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
//import makeStyles from '@mui/styles/makeStyles';
//import image from "../../Assets/IT20198954/quiz3.png";
import image from "../../Assets/IT20198954/test.gif";
import image1 from "../../Assets/IT20198954/quiz3.png";
import {
  Navigate,
  useHistory,
  useNavigate,
  Link,
  useLocation,
} from "react-router-dom"; 
import axios from "axios";

import { yellow } from "@mui/material/colors";

export default function Start() {
  const { setStart } = useContext(QuizContext);

  const [value, setValue] = useState("");
  const { state } = useLocation();
  const { updatedUser } = state || {}; // Read values passed on state

  //console.log("adduser row", updatedUser);
  const navigate = useNavigate();
  const [jobRole, setJobRole] = useState(
    updatedUser && updatedUser.jobRole ? updatedUser.jobRole : ""
  );

  //console.log("jobRole in start page", updatedUser.jobRole);

  const handleStart = () => {
    setStart(true);
    setJobRole(jobRole); // Set the jobRole herentainer">

    console.log(jobRole, "jobRole in handle start");
  };

  return (
    <div
      style={{
        backgroundImage: `url(${image1})`,
        width: "fullWidth",
        height: "100vh",
      }}
    >
      <Container maxWidth="md" className="buttoncontainer">
        <br></br>
        <br></br>
        <Paper elevation={6} className="paperRec">
          <div className="leftSide" padding= "20px" >
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Typography
              style={{
                marginLeft: "80px",
                fontFamily: "Open Sans, sans-serif",
                fontSize: "50px", // Increase font size for beauty
                fontWeight: "bold", // Make the text bold
                color: "#1976d2", // Change text color to a shade of blue
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Add a subtle text shadow
              }}
              variant="h4"
              sm={4}
              className="description"
            >
              Welcome!
            </Typography>
            <Typography
              style={{ marginLeft: "90px", marginTop:"6px", color: "#666362"}}
              sm={4}
              
            >
              Take the Skill Test to Unlock Job &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Recommendations.
            </Typography>
            <Button
              variant="contained"
              style={{ marginLeft: "120px" ,marginTop:"6px", width:"170px"}}
              color="primary"
              onClick={handleStart}
              className="start-link:hover"
            >
              Start QUIZ
            </Button>
          </div>
          <div sm={6} className="rightSide">
            <img
              src={image}
              alt="Your Image"
              style={{ height: "500px" , marginTop:"100px" , }}
              width="500"
            />
          </div>
        </Paper>
      </Container>
    </div>
  );
}
