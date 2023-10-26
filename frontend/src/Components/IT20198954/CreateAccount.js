import React, { useState } from "react";
import axios from "axios";
import logo from "../../Assets/IT20198954/user.png";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import { height } from "@mui/system";

const mainColor = "#1976d2 "; // Your main color

export default function AddUser() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [skills, setSkills] = useState("");

  function sendData(e) {
    if (!name || !email || !pwd || !jobRole || !skills) {
      alert("Fields cannot be empty!");
      return;
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      alert("Incorrect email format");
      return;
    }
    e.preventDefault();
    console.log("sendData function called"); 
    const newUser = {
      name,
      email,
      pwd,
      jobRole,
      skills,
    };
    console.log("Before Axios request", newUser);
 
    axios
    .post(`http://localhost:8070/register/adduser`, newUser)
    .then((response) => {
      console.log("Response:", response.data);
      alert("Thanks for joining!");
      window.location = `/signin`;
    })
    .catch((error) => {
      console.error("Axios Error:", error);
      alert("Error occurred during registration");
    });
  

    
  //   axios
  //     .post(`http://localhost:8070/register/adduser`, newUser)
  //     .then(() => {
  //       alert("Thanks for joining!");
  //       window.location = `/signin`;
  //       console.log("sendData function called 2",newUser);
  //     })
  //     .catch((err) => {
  //       alert("Duplicate email");
  //     });
   }

  return (
    <Container maxWidth="md">
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <br></br>
          <Typography variant="h4" align="center" gutterBottom>
            GREAT TO SEE YOU HERE!
          </Typography>
          <Typography variant="body2" align="center">
            Join with us...
          </Typography>
        </Grid>  
        <Grid item xs={12} sm={6} md={4} lg={3}>
           <div className="text-center">
            <img
              src={logo}
              alt="logo"
              className="simage"
              style={{
                width: "100px",
                height: "100px",
                marginRight: "20px",
                marginLeft: "50px",
              }}
            />
            <br></br>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              Already have an account?
            </Typography>
            <Button
              variant="contained"
              component={RouterLink}
              to="/signin"
              style={{ backgroundColor: mainColor }}
            >
              Sign In
            </Button>
          </div>
         </Grid>  
        <Grid item xs={12} sm={6} md={8} lg={9}>
          <form onSubmit={sendData}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Email address"
              variant="outlined"
              fullWidth
              margin="normal"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
            />
            <TextField
              select
              label="jobRole"
              variant="outlined"
              fullWidth
              margin="normal"
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
            >
              <MenuItem value="DataScientist">Data Science</MenuItem>
              <MenuItem value="SoftwareEngineer">
                Software Engineering
              </MenuItem>
              <MenuItem value="uiUxEngineering">UI/UX Engineering</MenuItem>
              <MenuItem value="projectManagement">Project management</MenuItem>
              <MenuItem value="networkEngineering">
                Network Engineering
              </MenuItem> 
              <MenuItem value="databaseAdministration">
                Database Administration
              </MenuItem>
              <MenuItem value="cybersecurity">Cybersecurity</MenuItem>
              <MenuItem value="systemAdministration">
                System Administration
              </MenuItem>
              <MenuItem value="qualityAssurance">Quality Assurance</MenuItem>
              <MenuItem value="businessAnalyst">Business Analyst</MenuItem>
              <MenuItem value="devopsEngineering">Devops Engineering</MenuItem>
              {/* Add more job role options as needed */}
            </TextField>
            <TextField
              label="Skills"
              variant="outlined"
              fullWidth
              margin="normal"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              style={{ backgroundColor: mainColor }}
            >
              Sign Up
            </Button>
          </form>
        </Grid>  
      </Grid>
    </Container>
  );
}