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
        <Paper elevation={3} style={{ padding: '20px', paddingBottom: '2px', borderRadius: '20px' }}>
          <Grid container spacing={5}>
            <Grid item xs={12} md={6}>
              <img
                src="https://www.nicepng.com/png/full/363-3633723_why-offshore-rpo-services-social-recruiting-clip-art.png"
                alt="Recruiter Registration"
                style={{ width: '100%', height: '100%' }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom style={{ textAlign: 'center', fontFamily: 'Open Sans, sans-serif'}}>
                Sign Up
              </Typography>
              <form onSubmit={handleSubmit} style={{ padding: '16px' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      type="text"
                      placeholder="First Name"
                      name="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      fullWidth
                      required
                      variant="standard"
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        style: {
                          borderBottom: '1px solid #2196F3',  // Adjust the color as needed
                          borderRadius: '0',  // No border-radius
                          marginBottom: '30px', // Adjusted spacing
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      fullWidth
                      required
                      variant="standard"
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        style: {
                          borderBottom: '1px solid #2196F3',  // Adjust the color as needed
                          borderRadius: '0',  // No border-radius
                          
                        },
                      }}
                    />
                  </Grid>
                </Grid>

                <TextField
                  type="text"
                  placeholder="Company Name"
                  name="companyName"
                  value={company_name}
                  onChange={(e) => setCompanyName(e.target.value)}
                  fullWidth
                  required
                  variant="standard"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    style: {
                      borderBottom: '1px solid #2196F3',  // Adjust the color as needed
                      borderRadius: '0',  // No border-radius
                      marginBottom: '30px', // Adjusted spacing
                    },
                  }}
                />

                <TextField
                  type="text"
                  placeholder="Current Job"
                  name="currentJob"
                  value={currentJob}
                  onChange={(e) => setCurrentJob(e.target.value)}
                  fullWidth
                  required
                  variant="standard"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    style: {
                      borderBottom: '1px solid #2196F3',  // Adjust the color as needed
                      borderRadius: '0',  // No border-radius
                      marginBottom: '30px', // Adjusted spacing
                    },
                  }}
                />

                <TextField
                  type="tel"
                  placeholder="Contact Number"
                  name="contactNo"
                  value={contactNo}
                  onChange={(e) => setContactNo(e.target.value)}
                  fullWidth
                  required
                  variant="standard"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    style: {
                      borderBottom: '1px solid #2196F3',  // Adjust the color as needed
                      borderRadius: '0',  // No border-radius
                      marginBottom: '30px', // Adjusted spacing
                    },
                  }}
                />

                <TextField
                  type="email"
                  placeholder="Work Email"
                  name="workMail"
                  value={workMail}
                  onChange={(e) => setWorkMail(e.target.value)}
                  fullWidth
                  required
                  variant="standard"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    style: {
                      borderBottom: '1px solid #2196F3',  // Adjust the color as needed
                      borderRadius: '0',  // No border-radius
                      marginBottom: '30px', // Adjusted spacing
                    },
                  }}
                />

                <TextField
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={pwd}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  required
                  variant="standard"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    style: {
                      borderBottom: '1px solid #2196F3',  // Adjust the color as needed
                      borderRadius: '0',  // No border-radius
                      marginBottom: '15px', // Adjusted spacing
                    },
                  }}
                />
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
                  <Button type="submit" variant="contained" color="primary" style={{ backgroundColor: '#2196f3' }}>
                    Sign Up
                  </Button>
                  </div>
                  
                  <p style={{ textAlign: 'center', marginTop: '15px' }}>
                    Already have an account? <a href="/recruiterLogin">Sign In</a> here
                  </p>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Container>
      </div>
  );
};

export default RegRecruiter;
