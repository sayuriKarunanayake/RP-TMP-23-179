import React, { useState } from 'react';
import { Container, Paper, Box, FormControl, MenuItem, InputLabel, TextField, Button, Grid, Typography, Select } from '@mui/material';
import axios from 'axios'; 

const RegRecruiter = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company_name, setCompanyName] = useState("");
  const [currentJob, setCurrentJob] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [workMail, setWorkMail] = useState("");
  const [pwd, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRecruiter = {
      firstName,
      lastName,
      company_name,
      currentJob,
      contactNo,
      workMail,
      pwd,
    };

    console.log(newRecruiter);

    axios.post("http://localhost:8070/recruiter/addRecruiter", newRecruiter)
      .then(() => {
        alert("Recruiter Registration Successful!");
        window.location = `/recruiterLogin`;

      })
      .catch((err) => {
        alert(err.response.data.message);
        console.log(err.message);
      });
  };

  return (
    <div>
      <br/><br/>
      <Container maxWidth="md">
        <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <img
                src="https://www.nicepng.com/png/full/363-3633723_why-offshore-rpo-services-social-recruiting-clip-art.png"
                alt="Recruiter Registration"
                style={{ width: '100%', height: '100%' }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom>
                Sign Up
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="First Name"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  fullWidth
                  required
              
                />
                <TextField
                  label="Last Name"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  fullWidth
                  required
                />
                <TextField
                  label="Company Name"
                  name="companyName"
                  value={company_name}
                  onChange={(e) => setCompanyName(e.target.value)}
                  fullWidth
                  required
                />
                <TextField
                  label="Current Job"
                  name="currentJob"
                  value={currentJob}
                  onChange={(e) => setCurrentJob(e.target.value)}
                  fullWidth
                  required
                />
                <TextField
                  label="Contact Number"
                  name="contactNo"
                  value={contactNo}
                  onChange={(e) => setContactNo(e.target.value)}
                  fullWidth
                  required
                />
                <TextField
                  label="Work Email"
                  name="workMail"
                  value={workMail}
                  onChange={(e) => setWorkMail(e.target.value)}
                  fullWidth
                  required
                />
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  value={pwd}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  required
                />
                <Button type="submit" variant="contained" color="primary">
                  Sign Up
                </Button>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Container>
      </div>
  );
};

export default RegRecruiter;
