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
  }, [email, user,skills,jobRole]);
  
  const getResults = async () => {
    try {
      const response = await axios.get(`http://localhost:8070/register/find/${email}`);
      
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

//old way
  // useEffect(() => {
  //   allUsers();
  // }, [email,user]);

  // const allUsers = async () => {
  //   try {
      
  //     const response = await axios.get(
  //       `http://localhost:8070/register/find/${email}`
  //     );
  //     if (response) {
  //       const userData = response.data.data;

  //       setUser(userData);

  //       // const userSkills = userData.skills;
  //       // const userJobRole = userData.jobRole;

  //       setSkills(userData.skills);
  //       setJobRole(userData.jobRole);
  //     }
  //   } catch (error) {
  //     console.log("Error fetching user data:", error);
  //   }
  // };

    
  const sendData = (e) => {
    e.preventDefault();
    // Your logic for form submission here
  };

  const onUpdate = () => {
    history("/updateuser", { state: { user } });
  };

  return (
    <Container classname="containerQuiz">
    

      <Box sx={{ backgroundColor: "#80bfff", padding: 4, marginTop: 4 }}>
        <Typography variant="h4" color="white">
          Guidelines
        </Typography>
        <Typography variant="body1" color="white">
          1. Please take a look at the job role and skills you've specified in your job profile.
        </Typography>
        <Typography variant="body1" color="white">
          2. After selecting your desired job role, you will navigate to a
          personalized skill test.
        </Typography>
        <Typography variant="body1" color="white">
          3. You must get 7 out of 10 questions to continue the Recommendation process.
        </Typography>
        <Typography variant="body1" color="white">
          4. After successfully completing the quiz, you will get recommended jobs for you.
        </Typography>
      </Box>

      <form>
        {/* Your dropdown and other form elements here */}
      </form>

      <Box sx={{ marginTop: 4 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell align="right">Job role</TableCell>
                <TableCell align="center">Skills</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{email}</TableCell>
                <TableCell align="right">{jobRole}</TableCell>
                <TableCell align="center">{skills}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Edit">
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
  );
}
