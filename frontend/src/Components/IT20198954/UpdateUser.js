import React, { useState, useEffect, forwardRef } from "react"; 
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";   
import {
  Navigate,
  useHistory,
  useNavigate,
  Link,
  useLocation,
} from "react-router-dom"; 
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";

export default function UpdateUser(prop) {
   
  const { state } = useLocation(); 
  const { user } = state || {};  // Read values passed on state
 // const userData = user.data.user;
  console.log("user Data ", user.skills);
  console.log("adduser row", user);
 
 const [name,setName] = useState(user && user.name ? user.name : '');
  const [email,setEmail] = useState(user && user.email ? user.email : ''); 
 const [pwd,setPwd] = useState(user && user.pwd ? user.pwd : '');
 const [jobRole,setJobRole] = useState(user && user.jobRole ? user.jobRole : '');
 const [skills,setSkills] = useState(user && user.skills ? user.skills : '');
 
//   const [name, setName] = useState(row && row.name ? row.name : '');
//  // const [bd, setbd] = useState(row && row.name ? row.name : '');  
//   const [email, setEmail] = useState(row && row.email ? row.email : '');
const navigate = useNavigate()
 // console.log("name and email", row.id, row.name, row.email);
 
 const handleUser = async (e) => {
    e.preventDefault();

    const updatedUser = {
      name, 
      email,
      pwd,
      jobRole,
      skills, 
    };

    try {
      const response = await axios.put(
        `http://localhost:8070/register/updateuser/${user._id}`,
        updatedUser
      );

      if (response.status === 200) {
        alert("User updated successfully!");
        console.log("update data", updatedUser)
        // navigate("/quiz"); // Redirect to the homepage or another page
        
         navigate('/quiz', { state: { updatedUser } });
         console.log("Navigating to / with data of user:", updatedUser);

      } else {
        alert("Error updating user.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Error updating user.");
    }
  }
 console.log("name", name)
 

  console.log(name, email, "daa");

  return (
    <>
      <br></br>
      <br></br>
      <br></br>
      <center>
        <Typography variant="h5" component="div">
            {user ? "Update Or Confirm  " : "Add User"}
          <br></br>
          <br></br>
        </Typography>
        <div>
          <Card
            sx={{
              minWidth: 200,
              minHeight: 400,
              maxHeight: 700,
              maxWidth: 500,
            }}
          >
            <form onSubmit={handleUser}>
              <CardContent>
                {" "}
                <br></br>
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                >
                    <TextField
                    id="email"
                     label="email"
                     value={email}
                    variant="outlined"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    disabled
                  />
                  <br></br>
                  <TextField
                    id="skills"
                     label="skills"
                     value={skills}
                    variant="outlined"
                    onChange={(e) => {
                      setSkills(e.target.value);
                    }}
                    required
                  />
                  <br></br>
                  <TextField
                  select
                    variant="outlined"
                    id="jobRole"
                    label="jobRole"
                    // type="experienceLevel"
                    value={ jobRole }
                    onChange={(e) => {
                      setJobRole(e.target.value);
                    }}
                     
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

                  </TextField>
                  <br></br>
                   
                </Box>
              </CardContent>

              <Button variant="contained"  style={{ backgroundColor: "#80bfff" }} type="submit" size="large">
                {" "}
                {user ? "Update / Continue" : "submit"}
                {/* <Button type="submit" size="large"> submit
                 */}
              </Button>
            </form>
          </Card>
        </div>
      </center>
    </>
  );
}
 