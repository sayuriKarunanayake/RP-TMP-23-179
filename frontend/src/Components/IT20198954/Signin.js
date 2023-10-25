import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/IT20198954/q2.png";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import {
  Container,
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  Link as MUILink,
} from "@mui/material";
const PREFIX = 'Signin';

const classes = {
  root: `${PREFIX}-root`,
  paper: `${PREFIX}-paper`,
  avatar: `${PREFIX}-avatar`,
  form: `${PREFIX}-form`,
  submit: `${PREFIX}-submit`,
  logo: `${PREFIX}-logo`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.root}`]: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    weight:"50px",
    backgroundColor:"#F0FFFF",
  },

  [`& .${classes.paper}`]: {
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  [`& .${classes.avatar}`]: {
    backgroundColor: theme.palette.primary.main,
  },

  [`& .${classes.form}`]: {
    width: "450px", // Fix IE 11 issue.
    marginTop: theme.spacing(3),

  },

  [`& .${classes.submit}`]: {
    margin: theme.spacing(3, 0, 2),
    
  },

  [`& .${classes.logo}`]: {
    maxWidth: "100%",
    height: "auto",
  }
}));

const Signin = () => {

  const navigation = useNavigate();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  function sendData(e) {
    e.preventDefault();

    if (!email || !pwd) {
      alert("Please provide both email and password");
      return;
    } else if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      alert("Invalid email");
      return;
    }

    const newRegister = {
      email,
      pwd,
    };

    
    axios
      .post(`http://localhost:8070/register/signin`, newRegister)
      .then(() => {
        alert("Sign in successful!");
      //  navigation("/", { state: { email } });
      localStorage.setItem("email", email);
        navigation("/home", { state: { email } });
      })
      .catch((err) => {
        alert("Invalid email or password!");
      });
  }

  return (
    <Container component="main" maxWidth="100%" className={classes.root}>
      <Paper elevation={3} maxWidth="md"  className={classes.paper}>
        <Avatar style={{ backgroundColor: "#1976d2 " }} className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar><br></br>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <form className={classes.form} onSubmit={sendData}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            style={{ backgroundColor: "#1976d2 " }}
          >
            Sign In
          </Button>
          <Typography variant="body2">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </Typography>
        </form>
      </Paper>
      {/* <img src={logo} alt="logo" className={classes.logo} /> */}
    </Container>
  );
};

export default Signin;



// import React from "react";
// import { Link, useNavigate, useHistory } from "react-router-dom";
// import { useState } from "react";
// import axois from "axios";
// import { Col, Image, Form, Button, Container, Row } from "react-bootstrap";
// import logo from "../../Assets/q2.png";

// const Signin = () => {
//   const navigation = useNavigate();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [pwd, setPwd] = useState("");

//   const [selectedUser, setSelectedUser] = useState();

//   function sendData(e) {
//     if (!email || !pwd) {
//       alert("Please add both email and password");
//       return;
//     } else if (
//       !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
//         email
//       )
//     ) {
//       alert("Invalid email");
//       return;
//     }

//     e.preventDefault();

//     const newRegister = {
//       email,
//       pwd,
//     };
//     console.log(newRegister);
//     // alert("Success");
//     console.log("Email before setting:", email);
//     setEmail(email);
//     console.log("Email after setting:", email);

//     axois
//       .post(`http://localhost:8070/register/signin`, newRegister)
//       .then(() => {
//         alert("Sign in successfully!");

//         console.log("Navigating to /viewuser with email:", email);

//         // Use navigate to redirect to another route with state
//         navigation("/", { state: { email } });

//         console.log("email si", email);
//       })
//       .catch((err) => {
//         alert("Invalid email or password!");
//       });
//   }

//   return (
//     <div>
//       <center>
//         {" "}
//         <br />
//         <br />
//         <br />
//         <br />
//         <Container>
//           <Row>
//             <Col>
//               {" "}
//               <Form className="signinform" onSubmit={sendData}>
//                 <div className="signin2">
//                   <div className="signins">
//                     <Col xs={1} md={12}>
//                       <img src={logo} alt="logo" className="loginimage" />
//                     </Col>
//                     <h1 className="login">Sign In</h1>
//                     <br /> <br />
//                     <Form.Group className="mb-3" controlId="formBasicEmail">
//                       <Form.Control
//                         type="email"
//                         placeholder="Enter email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                       />
//                     </Form.Group>
//                     <Form.Group className="mb-3" controlId="formBasicPwd">
//                       <Form.Control
//                         type="password"
//                         placeholder="Password"
//                         value={pwd}
//                         onChange={(e) => setPwd(e.target.value)}
//                       />
//                     </Form.Group>
//                     <Button variant="primary" size="lg" type="submit">
//                       Sign In
//                     </Button>
//                     <br />
//                     <br />
//                     <br />
//                     <h5>
//                       <Link to="/signup" id="link">
//                         {" "}
//                         Don't have an account?{" "}
//                       </Link>
//                     </h5>
//                   </div>
//                 </div>
//               </Form>
//             </Col>
//             <Col>
//               <br />
//               <br />
//               <br />
//               <br />
//               <br />
//             </Col>
//           </Row>
//         </Container>
//       </center>
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//     </div>
//   );
// };

// export default Signin;
