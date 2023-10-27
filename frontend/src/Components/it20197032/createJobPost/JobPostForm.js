import React, { useState } from 'react';
import { Container, Paper, Box, FormControl, MenuItem, InputLabel, TextField, Button, Grid, Typography, Select } from '@mui/material';
import axios from 'axios'; // Import Axios
import { useParams } from 'react-router-dom';

const JobPostForm = () => {
  
  const [companyName,setcompanyName] = useState("");
  const [title,setjobTitle] = useState("");
  const [location,setlocation] = useState("");
  const [jobDescription,setjobDescription] = useState("");
  const [jobLevel,setjobLevel] = useState("");
  const [jobCategory,setjobCategory] = useState("");
  
  const { id } = useParams();
  console.log('Recruiter ID:', id);
  
  const [recruiterID, setrecruiterID] = useState(id);


  const handleSubmit = (e) => {
    e.preventDefault();

    const newJob = {
        companyName,
        title,
        location,
        jobDescription,
        jobLevel,
        jobCategory,
        recruiterID
    }
        console.log(newJob);

        axios.post("http://localhost:8070/job/addjob",newJob).then(()=>{
            alert("Job Post Added Sucessfully");
            window.location = `/profile/${id}`;
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
            src="https://cdn.dribbble.com/users/1610871/screenshots/14521608/media/447511e1805368b288d938843ca7887a.gif"
            alt="IT Job Posting"
            style={{ width: '100%', height: '100%' }}
          />
        </Grid>

        {/* Right side with the form */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom style={{ textAlign: 'center', fontFamily: 'Open Sans, sans-serif' }}>
            Create Job Post
          </Typography>
          <form onSubmit={handleSubmit} style={{ padding: '16px' }}>
            <TextField
              placeholder="Company Name"
              name="companyName"
              value={companyName}
              onChange={(e) => setcompanyName(e.target.value)}
              fullWidth
              required
              variant="standard"
              InputLabelProps={{ shrink: true }}
              InputProps={{
                style: {
                  borderBottom: '1px solid #2196F3',
                  borderRadius: '0',
                  marginBottom: '15px',
                },
              }}
            />
            <TextField
              placeholder="Job Title"
              name="jobTitle"
              value={title}
              onChange={(e) => setjobTitle(e.target.value)}
              fullWidth
              required
              variant="standard"
              InputLabelProps={{ shrink: true }}
              InputProps={{
                style: {
                  borderBottom: '1px solid #2196F3',
                  borderRadius: '0',
                  marginBottom: '15px',
                },
              }}
            />
            <FormControl fullWidth required variant="standard">
              <InputLabel
                shrink={jobLevel !== ''}
                style={{
                  color: '#757575',
                }}
              >
                Job Level
              </InputLabel>
              <Select
                style={{
                  borderBottom: '1px solid #2196F3',
                  borderRadius: '0',
                  marginBottom: '15px',
                }}
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
            <FormControl fullWidth required variant="standard">
              <InputLabel
                style={{
                  marginBottom: jobCategory ? '8px' : '0',
                  pointerEvents: 'none',
                }}
                htmlFor="category"
              >
                {jobCategory ? 'Job Category' : 'Select Job Category'}
              </InputLabel>
              <Select
                style={{
                  borderBottom: '1px solid #2196F3',
                  borderRadius: '0',
                  marginBottom: '15px',
                }}
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
              placeholder="Location"
              name="location"
              value={location}
              onChange={(e) => setlocation(e.target.value)}
              fullWidth
              required
              variant="standard"
              InputLabelProps={{ shrink: true }}
              InputProps={{
                style: {
                  borderBottom: '1px solid #2196F3',
                  borderRadius: '0',
                  marginBottom: '15px',
                },
              }}
            />
            <TextField
              placeholder="Job Description"
              name="jobDescription"
              value={jobDescription}
              onChange={(e) => setjobDescription(e.target.value)}
              multiline
              fullWidth
              required
              variant="standard"
              InputLabelProps={{ shrink: true }}
              InputProps={{
                style: {
                  borderBottom: '1px solid #2196F3',
                  borderRadius: '0',
                  marginBottom: '15px',
                },
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
              <Button type="submit" variant="contained" color="primary" style={{ backgroundColor: '#2196f3' }}>
                Post
              </Button>
            </div>
          </form>
        </Grid>
      </Grid>
    </Paper>
  </Container>
</div>

  );
};

export default JobPostForm;
