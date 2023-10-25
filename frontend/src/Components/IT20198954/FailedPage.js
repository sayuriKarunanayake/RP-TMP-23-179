import React, { useContext, useState } from "react";
import { styled } from '@mui/material/styles';
import { QuizContext } from "./QuizHolder";
import { Button, Container, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import image from "../../Assets/IT20198954/q2.png";

const PREFIX = 'FailedPage';

const classes = {
  root: `${PREFIX}-root`,
  button: `${PREFIX}-button`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`&.${classes.root}`]: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
   // backgroundColor:"#ADD8E6",
     backgroundImage: `url(${image})`,
    backgroundSize: "cover",
  },

  [`& .${classes.button}`]: {
    marginTop: theme.spacing(2),
    width: "100%",
    maxWidth: "300px",
    color: "#ff9800", // Set the button text color here
    
  }
}));

export default function Fail() {

  const { setStart } = useContext(QuizContext);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { updatedUser } = state || {};
  const [jobRole, setJobRole] = useState(
    updatedUser && updatedUser.jobRole ? updatedUser.jobRole : ""
  );

  const handleStart = () => {
    setStart(true);
    setJobRole(jobRole);
  };

  const handleContinue = () => {
    navigate("/quiz", { state: { updatedUser } });
  };

  return (
    <Root className={classes.root}>
      <Container>
        <Typography variant="h4" gutterBottom>
          You do not have enough score to proceed. Please try again!
        </Typography>
        <Button variant="contained" className={classes.button} onClick={handleContinue}>
          Continue
        </Button>
      </Container>
    </Root>
  );
}

// import React, { useContext ,lazy, Suspense,useState,useEffect} from "react";
// import { QuizContext } from "./QuizHolder";
// import "../../CSS/it20198954.css";
// import { Box, Button, Container, Paper, Typography } from "@mui/material";
// import { makeStyles } from "@mui/material/styles";
// import image from "../../Assets/quiz3.png";
// import image1 from "../../Assets/quiz3.png";
// import yellow from "@mui/material/colors/yellow";
// import {
//   Navigate,
//   useHistory,
//   useNavigate,
//   Link,
//   useLocation,
// } from "react-router-dom"; 

// import axios from "axios";

// export default function Fail() {
//   const { setStart } = useContext(QuizContext);

//   const [value, setValue] = useState("");
// const { state } = useLocation(); 
// const { updatedUser } = state || {};  // Read values passed on state
// // const userData = user.data.user;
// //console.log("user Data start page", updatedUser.skills);
// console.log("adduser row", updatedUser);
//   const navigate = useNavigate();
//   const [jobRole,setJobRole] = useState(updatedUser && updatedUser.jobRole ? updatedUser.jobRole : '');


//   console.log("jobRole in start page",updatedUser.jobRole);

//  const Continue =() =>{
//     navigate('/quiz', { state: { updatedUser } });
//     console.log("Navigating to / with data of user:", updatedUser);
//  }

//   const handleStart = () => {
//     setStart(true);
//     setJobRole(jobRole); // Set the jobRole here
//     console.log(jobRole,"jobRole in handle start");

//   };

//   return (
//     // <div
//     //   style={{
//     //     backgroundImage: `url(${image1})`,
//     //     width: "fullWidth",
//     //     height: "100vh",
//     //   }}
//     // > <h1>You do not have enough score to proceed.Please try again!</h1>
//     // <Button onClick={Continue} ></Button>
//     // <Button

//     //                 variant="contained"
//     //                   onClick={Continue}

//     //               >

//     //               </Button></div>
// <div>
// <Button  color="default"
//                      variant="contained"
//                       onClick={Continue}
//                     style={{
//                       marginBottom: "8px",
//                       marginRight: "20px",
//                       marginLeft: "25px",
//                       width: "500px",
//                       height: "auto",
//                       textAlign: "center",
//                     }}
//                   >

//                   </Button>
// </div>
//   )
// }