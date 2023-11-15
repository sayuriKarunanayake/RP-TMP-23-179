import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Container,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import ColorizeIcon from "@mui/icons-material/Colorize";
import EastIcon from '@mui/icons-material/East';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

export default function JobRecommendationForm() {
  const [jobRole, setJobRole] = useState("");
  const [skills, setSkills] = useState("");
  const location = useLocation();
  const userEmail = location.state && location.state.email;
  const [user, setUser] = useState("");
  //const [email, setEmail] = useState(userEmail && userEmail ? userEmail : "");
  const history = useNavigate();
  //const userSkills = userData.skills;
  //const userJobRole = userData.jobRole;
  const [email, setEmail] = useState(localStorage.getItem("email"));
 

  useEffect(() => {
    // Moved the API call inside useEffect
    
    getResults();
    // setRecommendations(resultsData.recommendations);
    // setJobRole(resultsData.jobRole);
  }, []);
  
  const getResults = async () => {
    try {
      const response = await axios.get(`https://itconnect-backend-8c64d94c6e02.herokuapp.com/register/find/${email}`);
      
      if (response.status === 200 && response.data.success) {
        setUser(response.data.data);
        setSkills(response.data.data.skills);
        setJobRole(response.data.data.jobRole);
        console.log(response.data.data, "resultsData");
      } else {
        console.log("Error while loading data");
      }
    } catch (err) {
      console.log(err);
    }
  };

 
    
  const sendData = (e) => {
    e.preventDefault();
    // Your logic for form submission here
  };

  const onUpdate = () => {
    history("/updateuser", { state: { user } });
  };

  return (
  <> 
    <div role="presentation"  >
    <Breadcrumbs aria-label="breadcrumb" marginLeft="100px" marginTop="20px">
      <Link underline="hover" color="inherit" href="/dashboard">
        Home
      </Link>
    
      <Typography color="text.primary">Guidelines</Typography>
    </Breadcrumbs>
    </div>
    <Container classname="containerQuiz" style={{ textAlign: "center" }}>
    

      {/* <Box sx={{ backgroundColor: "#1976d2 ", padding: 4, marginTop: 4, fontFamily: "Open Sans, sans-serif" }}>
        <Typography variant="h4" color="white" style={{ fontFamily: "Open Sans, sans-serif" }}>
          Guidelines
        </Typography>
        <Typography variant="body1" color="white" >
          1. Please take a look at the below job role and skills you've specified in your job profile.
        </Typography>
        <Typography variant="body1" color="white" >
          2. You can edit the given job role and skills in next step.
        </Typography>
        <Typography variant="body1" color="white">
          3. After selecting your desired job role, you will navigate to a
          personalized skill test.
        </Typography>
        <Typography variant="body1" color="white">
          4. Backward navigation is disabled in the skill test.
        </Typography>
        <Typography variant="body1" color="white">
          5. You must score 7 out of 10 questions to continue the Recommendation process.
        </Typography>
        <Typography variant="body1" color="white">
          6. After successfully completing the quiz, you will get recommended job titles with posts for you.
        </Typography>
      </Box> */}
      <Box sx={{ backgroundColor: "#1976d2", padding: 4, marginTop: 4, fontFamily: "Open Sans, sans-serif", }}>
  <Typography variant="h4" color="white" style={{ fontFamily: "Open Sans, sans-serif", marginBottom: 16 }}>
    Guidelines
  </Typography>

  <div style={{ display: "grid", gap: 10 }}>
    <div style={{ display: "flex", alignItems: "center" }}>
      <span style={{ fontSize: 20, fontWeight: "bold", marginRight: 8 ,color:"white" }}>1.</span>
      <Typography variant="body1" color="white">
        Please take a look at the below job role and skills you've specified in your job profile.
      </Typography>
    </div>

    <div style={{ display: "flex", alignItems: "center" }}>
      <span style={{ fontSize: 20, fontWeight: "bold", marginRight: 8 ,color:"white" }}>2.</span>
      <Typography variant="body1" color="white">
        You can edit the given job role and skills in the next step.
      </Typography>
    </div>

    <div style={{ display: "flex", alignItems: "center" }}>
      <span style={{ fontSize: 20, fontWeight: "bold", marginRight: 8 ,color:"white" }}>3.</span>
      <Typography variant="body1" color="white">
        After selecting your desired job role, you will navigate to a personalized skill test.
      </Typography>
    </div>

    <div style={{ display: "flex", alignItems: "center" }}>
      <span style={{ fontSize: 20, fontWeight: "bold", marginRight: 8 ,color:"white" }}>4.</span>
      <Typography variant="body1" color="white">
        Backward navigation is disabled in the skill test.
      </Typography>
    </div>

    <div style={{ display: "flex", alignItems: "center" }}>
      <span style={{ fontSize: 20, fontWeight: "bold", marginRight: 8 ,color:"white" }}>5.</span>
      <Typography variant="body1" color="white">
        You must score 7 out of 10 questions to continue the Recommendation process.
      </Typography>
    </div>

    <div style={{ display: "flex", alignItems: "center" }}>
      <span style={{ fontSize: 20, fontWeight: "bold", marginRight: 8 ,color:"white" }}>6.</span>
      <Typography variant="body1" color="white">
        After successfully completing the quiz, you will get recommended job titles with posts for you.
      </Typography>
    </div>
  </div>
</Box>


      <form>
        {/* Your dropdown and other form elements here */}
      </form>

      <Box sx={{ marginTop: 4 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: "#1976d2", color: "white" }}>
              <TableRow>
                <TableCell  sx={{ color: "white" }}>Email</TableCell>
                <TableCell sx={{ color: "white" }} >Job role</TableCell>
                <TableCell sx={{ color: "white" }} >Skills</TableCell>
                <TableCell sx={{ color: "white" }} >Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell style={{ fontSize: "16px", color: "#555", fontWeight: "bold" }}>{email}</TableCell>
                <TableCell style={{ fontSize: "16px", color: "#555", fontWeight: "bold" }}>{jobRole}</TableCell>
                <TableCell style={{ fontSize: "16px", color: "#555", fontWeight: "bold" }}>{skills}</TableCell>
                <TableCell >
                  <Tooltip title="Next">
                    <IconButton onClick={onUpdate} size="large">
                      <EastIcon  color="primary"  fontSize="large"/>
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
    </>
  );
}
