import React, { useState } from 'react';
import { Container, Paper, Box, FormControl, MenuItem, InputLabel, TextField, Button, Grid, Typography, Select } from '@mui/material';
import './JobPostForm.css'; // Import custom CSS file
import axios from 'axios'; // Import Axios

const JobPostForm = () => {
  
  const [companyName,setcompanyName] = useState("");
  const [title,setjobTitle] = useState("");
  const [location,setlocation] = useState("");
  const [jobDescription,setjobDescription] = useState("");
  const [jobLevel,setjobLevel] = useState("");
  const [jobCategory,setjobCategory] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();

    const newJob = {
        companyName,
        title,
        location,
        jobDescription,
        jobLevel,
        jobCategory
    }
        console.log(newJob);

        axios.post("http://localhost:8070/job/addjob",newJob).then(()=>{
            alert("Job Post Added Sucessfully");
            window.location = `/joblist`;
        }).catch((err)=>{
            alert(err.response.data.message);
            console.log(err.message);
            
        })
  };

  return (
    <div>
      <br/><br/>
      <Container maxWidth="md">
        <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px' }}>
          <Grid container spacing={2}>
            {/* Left side with an image */}
            <Grid item xs={12} md={6}>
              <img
                src="https://img.freepik.com/free-vector/cartoon-employees-working-computers-office-open-space_74855-20035.jpg"
                alt="IT Job Posting"
                style={{ width: '100%', height: '100%' }}
              />
            </Grid>

            {/* Right side with the form */}
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom>
                Job Post Form
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Company Name"
                  name="companyName"
                  value={companyName}
                  onChange={(e) => setcompanyName(e.target.value)}
                  fullWidth
                  required
                />
                <TextField
                  label="Job Title"
                  name="jobTitle"
                  value={title}
                  onChange={(e) => setjobTitle(e.target.value)}
                  fullWidth
                  required
                />
                <FormControl fullWidth required>
                <InputLabel htmlFor="jobLevel">Job Level</InputLabel>
                <Select
                  style={{ margin: 0 }}
                  label="Job Level"
                  name="jobLevel"
                  value={jobLevel}
                  onChange={(e) => setjobLevel(e.target.value)}
                  
                >
                  <MenuItem value="Intern">Intern</MenuItem>
                  <MenuItem value="Trainee">Trainee</MenuItem>
                  <MenuItem value="Associate">Associate</MenuItem>
                  <MenuItem value="Mid Level">Mid level</MenuItem>
                  <MenuItem value="Senior">Senior level</MenuItem>
                </Select>
                </FormControl>
                <FormControl fullWidth required>
                <InputLabel htmlFor="jobLevel">Job Category</InputLabel>
                <Select
                  style={{ margin: 0 }}
                  label="Job Category"
                  name="category"
                  value={jobCategory}
                  onChange={(e) => setjobCategory(e.target.value)}
                >
                  <MenuItem value="devProg">Dev & Programming</MenuItem>
                  <MenuItem value="infraNet">Infra & Networking</MenuItem>
                  <MenuItem value="dataAnaly">Data & Analytics</MenuItem>
                  <MenuItem value="secComp">Security & Compliance</MenuItem>
                  <MenuItem value="mangSuppt">Management & Support</MenuItem>
                </Select>
                </FormControl>
                <TextField
                  label="Location"
                  name="location"
                  value={location}
                  onChange={(e) => setlocation(e.target.value)}
                  fullWidth
                  required
                />
                <TextField
                  label="Job Description"
                  name="jobDescription"
                  value={jobDescription}
                  onChange={(e) => setjobDescription(e.target.value)}
                  multiline
                  fullWidth
                  required
                />
                
                <Button type="submit" variant="contained" color="primary">
                  Post
                </Button>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div> 
  );
};

export default JobPostForm;
