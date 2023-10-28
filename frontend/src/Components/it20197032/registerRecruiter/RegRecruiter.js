import React, { useState } from 'react';
import { Container, Paper, Box, FormControl, MenuItem, InputLabel, TextField, Button, Grid, Typography, Select } from '@mui/material';
import axios from 'axios'; 
import { useFormik } from 'formik';
import * as Yup from 'yup';

const RegRecruiter = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company_name, setCompanyName] = useState("");
  const [currentJob, setCurrentJob] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [workMail, setWorkMail] = useState("");
  const [pwd, setPassword] = useState("");

  //add validations to form fields 
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required").min(2, "Too short"),
    lastName: Yup.string().required("Last name is required").min(2, "Too short"),
    company_name: Yup.string().required("Company name is required").min(2, "Too short"),
    currentJob: Yup.string().required("Current job is required").min(2, "Too short"),
    contactNo: Yup.string().required("Contact number is required").matches(/^\d{10}$/, "Invalid contact number"),
    workMail: Yup.string().required("Work email is required").email( "Invalid email address"),
    pwd: Yup.string()
      .required("Password is required")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, "Password must contain at least one uppercase letter, one lowercase letter, and one number, and be at least 8 characters long"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      company_name: "",
      currentJob: "",
      contactNo: "",
      workMail: "",
      pwd: "",
    },

    validationSchema: validationSchema,
    onSubmit: (newRecruiter) => {
      axios.post("http://localhost:8070/recruiter/addRecruiter", newRecruiter)
      .then(() => {
        alert("Recruiter Registration Successful!");
        window.location = `/recruiterLogin`;

      })
      .catch((err) => {
        alert(err.response.data.message);
        console.log(err.message);
      });
    },
  });



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
                style={{ width: '100%', height: '90%' }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom style={{ textAlign: 'center', fontFamily: 'Open Sans, sans-serif'}}>
                Join Us
              </Typography>
              <form onSubmit={formik.handleSubmit} style={{ padding: '20px' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      type="text"
                      placeholder="First Name"
                      name="firstName"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      fullWidth
                      required
                      variant="standard"
                      InputLabelProps={{ shrink: true }}
                      helperText={formik.touched.firstName && formik.errors.firstName}
                      error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                      InputProps={{
                        style: {
                          borderBottom: '1px solid #2196F3',  // Adjust the color as needed
                          borderRadius: '0',  // No border-radius
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      fullWidth
                      required
                      variant="standard"
                      InputLabelProps={{ shrink: true }}
                      helperText={formik.touched.lastName && formik.errors.lastName}
                      error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                      InputProps={{
                        style: {
                          borderBottom: '1px solid #2196F3',  // Adjust the color as needed
                          borderRadius: '0',  // No border-radius
                          marginBottom: '20px', // Adjusted spacing
                        },
                      }}
                    />
                  </Grid>
                </Grid>

                <TextField
                  type="text"
                  placeholder="Company Name"
                  name="company_name"
                  value={formik.values.company_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  required
                  variant="standard"
                  InputLabelProps={{ shrink: true }}
                  helperText={formik.touched.company_name && formik.errors.company_name}
                  error={formik.touched.company_name && Boolean(formik.errors.company_name)}
                  InputProps={{
                    style: {
                      borderBottom: '1px solid #2196F3',  // Adjust the color as needed
                      borderRadius: '0',  // No border-radius
                      marginBottom: '20px', // Adjusted spacing
                    },
                  }}
                />

                <TextField
                  type="text"
                  placeholder="Current Job"
                  name="currentJob"
                  value={formik.values.currentJob}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  required
                  variant="standard"
                  InputLabelProps={{ shrink: true }}
                  helperText={formik.touched.currentJob && formik.errors.currentJob}
                  error={formik.touched.currentJob && Boolean(formik.errors.currentJob)}
                  InputProps={{
                    style: {
                      borderBottom: '1px solid #2196F3',  // Adjust the color as needed
                      borderRadius: '0',  // No border-radius
                      marginBottom: '20px', // Adjusted spacing
                    },
                  }}
                />

                <TextField
                  type="tel"
                  placeholder="Contact Number"
                  name="contactNo"
                  value={formik.values.contactNo}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  required
                  variant="standard"
                  InputLabelProps={{ shrink: true }}
                  helperText={formik.touched.contactNo && formik.errors.contactNo}
                  error={formik.touched.contactNo && Boolean(formik.errors.contactNo)}
                  InputProps={{
                    style: {
                      borderBottom: '1px solid #2196F3',  // Adjust the color as needed
                      borderRadius: '0',  // No border-radius
                      marginBottom: '20px', // Adjusted spacing
                    },
                  }}
                />

                <TextField
                  type="email"
                  placeholder="Work Email"
                  name="workMail"
                  value={formik.values.workMail}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  required
                  variant="standard"
                  InputLabelProps={{ shrink: true }}
                  helperText={formik.touched.workMail && formik.errors.workMail}
                  error={formik.touched.workMail && Boolean(formik.errors.workMail)}
                  InputProps={{
                    style: {
                      borderBottom: '1px solid #2196F3',  // Adjust the color as needed
                      borderRadius: '0',  // No border-radius
                      marginBottom: '20px', // Adjusted spacing
                    },
                  }}
                />

                <TextField
                  type="password"
                  placeholder="Password"
                  name="pwd"
                  value={formik.values.pwd}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  required
                  variant="standard"
                  InputLabelProps={{ shrink: true }}
                  helperText={formik.touched.pwd && formik.errors.pwd}
                  error={formik.touched.pwd && Boolean(formik.errors.pwd)}
                  InputProps={{
                    style: {
                      borderBottom: '1px solid #2196F3',  // Adjust the color as needed
                      borderRadius: '0',  // No border-radius
                      marginBottom: '20px', // Adjusted spacing
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
