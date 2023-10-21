import React, { useState } from 'react';
import { Container, Paper, Box, TextField, Button, Grid, Typography } from '@mui/material';
import './JobPostForm.css'; // Import custom CSS file
import axios from 'axios'; // Import Axios

const JobPostForm = () => {
  
  const [companyName,setcompanyName] = useState("");
  const [title,setjobTitle] = useState("");
  const [location,setlocation] = useState("");
  const [jobDescription,setjobDescription] = useState("");
  const [benefits,setbenefits] = useState("");
  const [applProcess,setapplProcess] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();

    const newJob = {
        companyName,
        title,
        location,
        jobDescription,
        benefits,
        applProcess
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
                <TextField
                  label="Benefits"
                  name="benefits"
                  value={benefits}
                  onChange={(e) => setbenefits(e.target.value)}
                  multiline
                  fullWidth
                  required
                />
                <TextField
                  label="Application Process"
                  name="applicationProcess"
                  value={applProcess}
                  onChange={(e) => setapplProcess(e.target.value)}
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
