import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Grid,
  Button,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "../../CSS/it20198954.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} size="large" />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Home = () => {
  //const navigate = useNavigate();
  const navigation = useNavigate();
  const [UserData, setUserData] = useState([]);

  const [jobRole, setJobRole] = useState("");
  const [skills, setSkills] = useState("");
  const location = useLocation();
  const userEmail = location.state && location.state.email;
  const [user, setUser] = useState("");
  const [email, setEmail] = useState(userEmail && userEmail ? userEmail : "");
  const history = useNavigate();

  const [expanded, setExpanded] = React.useState(false);
  const [expandedCard, setExpandedCard] = useState(null);
  const cardsPerPage = 6; // Number of cards to display per page
  const [currentPage, setCurrentPage] = useState(1);
 
  const { state } = useLocation();
  const { updatedUser } = state || {};

  //const [jobRole,setJobRole] = useState(updatedUser && updatedUser.jobRole ? updatedUser.jobRole : '');
  //const [skills,setSkills] = useState(updatedUser && updatedUser.skills ? updatedUser.skills : '');
  const [message, setMessage] = useState('');

  console.log("jobRole and skills row job posts page", jobRole , skills);
  //   const handleExpandClick = () => {
  //     setExpanded(!expanded);
  //   };

   // Filter criteria for company and location
   const [companyFilter, setCompanyFilter] = useState('');
   const [locationFilter, setLocationFilter] = useState('');

    

  

  // Dummy job data
  const job = [
    {
      title: "Software Engineer 1",
      company: "Tech Co.",
      location: "New York, NY",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      requirements: [
        "Bachelor's degree in Computer Science or related field",
        "3+ years of experience in software development",
        "Strong problem-solving skills",
      ],
      benefits: [
        "Competitive salary",
        "Healthcare coverage",
        "Flexible working hours",
      ],
    },
    // Add more job objects here
    {
      title: "Frontend Developer 2",
      company: "Web Solutions Inc.",
      location: "San Francisco, CA",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      requirements: [
        "Experience with React.js",
        "Proficiency in HTML, CSS, and JavaScript",
        "UI/UX design skills",
      ],
      benefits: [
        "Competitive salary",
        "Remote work options",
        "Professional growth opportunities",
      ],
    },
    {
      title: "Frontend Developer 3",
      company: "Web Solutions Inc.",
      location: "San Francisco, CA",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      requirements: [
        "Experience with React.js",
        "Proficiency in HTML, CSS, and JavaScript",
        "UI/UX design skills",
      ],
      benefits: [
        "Competitive salary",
        "Remote work options",
        "Professional growth opportunities",
      ],
    },
    {
      title: "Frontend Developer 4",
      company: "Web Solutions Inc.",
      location: "San Francisco, CA",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      requirements: [
        "Experience with React.js",
        "Proficiency in HTML, CSS, and JavaScript",
        "UI/UX design skills",
      ],
      benefits: [
        "Competitive salary",
        "Remote work options",
        "Professional growth opportunities",
      ],
    },
    {
      title: "Frontend Developer 5",
      company: "Web Solutions Inc.",
      location: "San Francisco, CA",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      requirements: [
        "Experience with React.js",
        "Proficiency in HTML, CSS, and JavaScript",
        "UI/UX design skills",
      ],
      benefits: [
        "Competitive salary",
        "Remote work options",
        "Professional growth opportunities",
      ],
    },
   
     
    
      
    // Add more job objects here
  ];
   
 

  const handleClearFilters = () =>{
    setLocationFilter('');
    setCompanyFilter('');
  }


 const totalPages = Math.ceil(job.length / cardsPerPage);

 // Calculate the range of job cards to display for the current page
 const startIndex = (currentPage - 1) * cardsPerPage;
 const endIndex = startIndex + cardsPerPage;

 // Filter job cards based on company and location criteria
 const filteredJobData = job.filter((job) => {
   return (
     job.company.toLowerCase().includes(companyFilter.toLowerCase()) &&
     job.location.toLowerCase().includes(locationFilter.toLowerCase())
   );
 });

 const jobCardsToShow = filteredJobData.slice(startIndex, endIndex);

//  const handleExpandClick = () => {
//    setExpanded(!expanded);
//  };
 
const getUser = async () => {
  try {
    const result = await axios.get(`http://localhost:8070/register/find`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setUserData(result.data.data);
    console.log(UserData,"UserData   homr page");
  } catch (err) {
    console.log(err);
  }
};
  
 const handleTest = async () => {
  navigation("/jobform", { state: { email } });
 }


  return (
    // <div className="job-recommendations">
    <div
      className="job-recommendations"
      style={{
        backgroundColor: "#F0FFFF",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        style={{
          color: "#80bfff",
          marginBottom: "20px",
          marginTop: "10px",
          marginLeft: "20px",
        }}
      >
        Job Recommendations
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Box mr={2}> {/* Add space to the right */}
     

<Button
                      variant="contained"
                      color="primary"
                      onClick={handleTest}
                      style={{
                        marginBottom: "8px",
                        marginRight: "5px",
                        marginLeft: "50px",
                        width: "500px",
                        height: "auto",
                        textAlign: "center",
                      }}
                    >
                      Test
                    </Button>
  </Box>
  
  <Button
  variant="outlined"
  style={{
    marginLeft: "16px",
    backgroundColor: "#0096FF", // Change background color
    color: "#FFFFFF", // Change text color
    border: "1px solid #0096FF", // Add border
    borderRadius: "4px", // Add border radius
    padding: "8px 16px", // Add padding
    transition: "background-color 0.3s ease", // Add a smooth transition
    "&:hover": {
      backgroundColor: "#0077CC", // Change background color on hover
    },
  }}
  onClick={handleClearFilters}
>
  Clear Filters
</Button>
  
        </div>
      <Grid
        container
        spacing={2}
        style={{
          marginBottom: "20px",
          marginTop: "20px",
          marginLeft: "20px",
          marginRight: "20px",
        }}
      >
        {" "}
        {/* Use Grid container */}
        {/* {job.map((job, index) => ( */}
        {jobCardsToShow.map((job, index) => (
        // {filteredJobData.map((job, index) => (
          <Grid item xs={12} sm={6} md={4} key={job.title}>
            {" "}
            {/* Use Grid item */}
            {/* <Card sx={{ maxWidth: 345 }}
         > */}
            <Card
              sx={{
                maxWidth: 345,
                backgroundColor: "white",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: "#0096FF" }} aria-label="recipe">
                    R
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings" size="large">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={job.title}
                subheader="September 14, 2016"
                style={{ color: "#0096FF" }}
              />

              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Company ={job.company} <br></br>
                  Location ={job.location} <br></br>
                  <br></br>
                  {job.description} <br></br>
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" size="large">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share" size="large">
                  <ShareIcon />
                </IconButton>
                {/* <ExpandMore
        expand={expanded}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
      > */}
                
              </CardActions>
              {/* <Collapse in={expanded} timeout="auto" unmountOnExit> */}
              <Collapse
                in={expandedCard === index}
                timeout="auto"
                unmountOnExit
              >
                <CardContent>
                  <Typography paragraph>Requirements:</Typography>
                  <Typography paragraph>{job.requirements}</Typography>
                  <Typography paragraph>
                    Benefits <br></br>
                    {job.benefits}
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>{" "}
          </Grid>
        ))}
        ;{" "}
      </Grid>
       
      </div>
  );
};

export default Home;
