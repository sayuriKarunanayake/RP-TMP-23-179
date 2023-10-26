import React, { useContext, lazy, Suspense, useState, useEffect } from "react";
import { QuizContext } from "./QuizHolder";
import "../../CSS/it20198954.css";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
//import makeStyles from '@mui/styles/makeStyles';
import image from "../../Assets/IT20198954/quiz3.png";
import image1 from "../../Assets/IT20198954/quiz3.png";
import {
  Navigate,
  useHistory,
  useNavigate,
  Link,
  useLocation,
} from "react-router-dom";
import axios from "axios";

import { yellow } from '@mui/material/colors';

export default function Start() {
  const { setStart } = useContext(QuizContext);

  const [value, setValue] = useState("");
  const { state } = useLocation();
  const { updatedUser } = state || {}; // Read values passed on state
   
  console.log("adduser row", updatedUser);
  const navigate = useNavigate();
  const [jobRole, setJobRole] = useState(
    updatedUser && updatedUser.jobRole ? updatedUser.jobRole : ""
  );

  console.log("jobRole in start page", updatedUser.jobRole);

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
          <div className="leftSide">
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
            <Typography variant="h4" sm={4} className="description">
              Welcome!
            </Typography>
            <Typography sm={4} className="description">
              Take the Skill Test to Unlock Job Recommendations.
            </Typography>
            <Button variant="contained" color="primary" onClick={handleStart}>
              Start QUIZ
            </Button>
          </div>
          <div sm={6} className="rightSide">
            <img src={image} alt="Your Image" width="500" height="600" />
          </div>
        </Paper>
      </Container>
    </div>
  );
}
