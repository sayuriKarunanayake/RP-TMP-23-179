import React, { useState,useEffect } from "react";
import {
  Box,
  Typography,
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

const JobView = () => {
  const navigate = useNavigate();

  const [expanded, setExpanded] = React.useState(false);
  const [expandedCard, setExpandedCard] = useState(null);
  const cardsPerPage = 6; // Number of cards to display per page
  const [currentPage, setCurrentPage] = useState(1);
 
  const [jobPosts, setJobPosts] = useState([]);
  const [filteredJobPosts, setFilteredJobPosts] = useState([]);

  const [email, setEmail] = useState(localStorage.getItem("email"));
  const { state } = useLocation();
const { dataArray, userSkills } = state || {};
const { jobRole, recommendations } = dataArray || [];

console.log(jobRole, "jobRole");
console.log(recommendations, "recommendations");

 // Now you can access `dataArray` if it was passed in the state
 
   console.log(dataArray,"dataArray");
  
  //const [dataArray,setdataArray]=useState(updatedUser && updatedUser.jobRole ? updatedUser.jobRole : '');
  // const [jobRole,setJobRole] = useState(dataArray && dataArray.jobRole ? dataArray.jobRole : '');
  const [skills,setSkills] = useState(dataArray && dataArray.skills ? dataArray.skills : '');
  const [message, setMessage] = useState('');

  console.log("jobRole and recommendations row job posts page", jobRole , recommendations);
  //   const handleExpandClick = () => {
  //     setExpanded(!expanded);
  //   };

   // Filter criteria for company and location
   const [companyFilter, setCompanyFilter] = useState('');
   const [locationFilter, setLocationFilter] = useState('');

   //const handle


   useEffect(() => {
    // Fetch job posts from your API or database
    axios.get("http://localhost:8070/register/getjobs").then((response) => {
      setJobPosts(response.data); // Assuming response.data contains job posts
      console.log(response,"response");
    });
  }, []);
  
  // useEffect(() => {
  //   // Filter job posts based on jobRole and recommendations
  //   if (jobRole && recommendations) {
  //     const filteredPosts = jobPosts.filter((post) => {
  //       return (
  //         post.title.toLowerCase().includes(jobRole.toLowerCase()) ||
  //         recommendations.some((rec) => rec.title.toLowerCase().includes(post.title.toLowerCase()))
  //       );
  //     });
  //     setFilteredJobPosts(filteredPosts);
  //   }
  // }, [jobRole, recommendations, jobPosts]);

  // const filteredPosts = jobPosts.filter((post) => {
  //   const titleLower = post.title.toLowerCase();
  //   const jobRoleLower = jobRole.toLowerCase();
  //   console.log(titleLower ,"  titleLower")
  //   console.log(jobRoleLower ,"  jobRoleLower")
  //   // Check if the post title contains the jobRole
  //   if (titleLower.includes(jobRoleLower)) {
  //     return true;
  //   }
  //   // Check if any recommendation contains a similar title
  //   return recommendations.some((rec) => {
  //     const recTitleLower = rec.title.toLowerCase();
  //     console.log(recTitleLower ,"  recTitleLower")

  //     return recTitleLower.includes(titleLower);
  //   });
   

  // });
  // const filteredPosts = jobPosts.filter((post) => {
  //   // Preprocess the jobRole and recommendations
  //   const jobRoleProcessed = jobRole.toLowerCase().replace(/\s/g, "");
  //   console.log(jobRoleProcessed ,"  jobRoleProcessed")
  //   const recommendationsProcessed = recommendations.map((rec) =>
  //     rec.title.toLowerCase().replace(/\s/g, "")
  //   );
  
  //   // Preprocess the post title
  //   const titleProcessed = post.title.toLowerCase().replace(/\s/g, "");
  //   console.log(titleProcessed ,"  titleProcessed")
  //   // Check if the preprocessed jobRole is in the preprocessed post title
  //   if (titleProcessed.includes(jobRoleProcessed)) {
  //     return true;
  //   }
  
  //   // Check if any recommendation contains a similar title
  //   return recommendationsProcessed.some((recProcessed) =>
  //     titleProcessed.includes(recProcessed)
  //   );

  //   const matchingPosts = filteredPosts.filter((post) => {
  //     const titleProcessed = post.title.toLowerCase().replace(/\s/g, "");
    
  //     // Check if the preprocessed jobRole is in the preprocessed post title
  //     if (titleProcessed.includes(jobRoleProcessed)) {
  //       return true;
  //     }
    
  //     // Check if any recommendation contains a similar title
  //     return recommendationsProcessed.some((recProcessed) =>
  //       titleProcessed.includes(recProcessed)
  //     );
  //   });
  // });
  const filteredPosts = jobPosts.filter((post) => {
    // Preprocess the jobRole and recommendations
    const jobRoleProcessed = jobRole.toLowerCase().replace(/\s/g, "");
    const recommendationsProcessed = recommendations.map((rec) =>
      rec.title.toLowerCase().replace(/\s/g, "")
    );
  
    // Preprocess the post title
    const titleProcessed = post.title.toLowerCase().replace(/\s/g, "");
  
    // Check if the preprocessed jobRole is in the preprocessed post title
    if (titleProcessed.includes(jobRoleProcessed)) {
      return true;
    }
  
    // Check if any recommendation contains a similar title
    return recommendationsProcessed.some((recProcessed) =>
      titleProcessed.includes(recProcessed)
    );
  });
  
  console.log(filteredPosts, "jobPosts and filteredPosts");
  
   
  
  
  //console.log(filteredJobPosts ,"jobPosts and filteredJobPosts")

   
//   // Calculate the total number of pages based on the number of job cards
//   const totalPages = Math.ceil(job.length / cardsPerPage);
 
//   // Calculate the range of job cards to display for the current page
//   const startIndex = (currentPage - 1) * cardsPerPage;
//   const endIndex = startIndex + cardsPerPage;
//   //const jobCardsToShow = job.slice(startIndex, endIndex);

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };
//   const filteredJobData = job.filter((job) => {
//     return (
//       job.company.toLowerCase().includes(companyFilter.toLowerCase()) &&
//       job.location.toLowerCase().includes(locationFilter.toLowerCase())
//     );
//   });
//   const jobCardsToShow = filteredJobData.slice(startIndex, endIndex);

//   const handleCompanyFilterChange = (event) => {
//     setCompanyFilter(event.target.value);
//   };

//   const handleLocationFilterChange = (event) => {
//     setLocationFilter(event.target.value);
//   };

  const handleClearFilters = () =>{
    setLocationFilter('');
    setCompanyFilter('');
  }

 // Filter criteria for company and location
//  const [companyFilter, setCompanyFilter] = useState('');
//  const [locationFilter, setLocationFilter] = useState('');

 // Calculate the total number of pages based on the number of job cards
 const totalPages = Math.ceil(filteredPosts.length / cardsPerPage);

//  // Calculate the range of job cards to display for the current page

// Filter job cards based on company and location criteria
const filteredJobData = filteredPosts.filter((filteredPosts) => {
  return (
    filteredPosts.companyName.toLowerCase().includes(companyFilter.toLowerCase()) &&
    filteredPosts.location.toLowerCase().includes(locationFilter.toLowerCase())
  );
});

// Calculate the range of job cards to display for the current page old way
  const startIndex = (currentPage - 1) * cardsPerPage;  const endIndex = startIndex + cardsPerPage;

//  // Filter job cards based on company and location criteria
//  const filteredJobData = filteredPosts.filter((filteredPosts) => {
//    return (
//     filteredPosts.company.toLowerCase().includes(companyFilter.toLowerCase()) &&
//      filteredPosts.location.toLowerCase().includes(locationFilter.toLowerCase())
//    );
//  });

 const jobCardsToShow = filteredJobData.slice(startIndex, endIndex);

//  const handleExpandClick = () => {
//    setExpanded(!expanded);
//  };
 
 const handleExpandClick = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

 const handleNextPage = () => {
   if (currentPage < totalPages) {
     setCurrentPage(currentPage + 1);
   }
 };

 const handlePrevPage = () => {
   if (currentPage > 1) {
     setCurrentPage(currentPage - 1);
   }
 };

 const handlePageChange = (page) => {
   setCurrentPage(page);
 };

 const handleCompanyFilterChange = (event) => {
   setCompanyFilter(event.target.value);
 };

 const handleLocationFilterChange = (event) => {
   setLocationFilter(event.target.value);
 };
  
  const handleStart =() => {
    navigate("/jobform", { state: { email } });
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
    <TextField
      label="Company"
      variant="outlined"
      size="small"
      margin="dense"
      value={companyFilter}
      onChange={handleCompanyFilterChange}
    />
  </Box>
  <Box ml={2}> {/* Add space to the left */}
    <TextField
      label="Location"
      variant="outlined"
      size="small"
      margin="dense"
      value={locationFilter}
      onChange={handleLocationFilterChange}
      style={{ marginRight: "16px" }}
    />
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
  
<Button variant="contained" color="primary" onClick={handleStart}>
              Retake QUIZ
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
         
      </Grid>  

      <Grid container spacing={2}>
  {/* {filteredPosts.map((post, index) => ( */}
     {jobCardsToShow.map((post, index) => (
    <Grid item xs={12} sm={6} md={4} key={post._id}>
      <Card sx={{ maxWidth: 345 }}>
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
          title={post.title}
          subheader="September 14, 2016"
          style={{ color: "#0096FF" }}
        />

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Company: {post.companyName} <br />
            Location: {post.location} <br />
            <br />
            {post.jobDescription} <br />
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" size="large">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share" size="large">
            <ShareIcon />
          </IconButton>
          <ExpandMore
            expand={expandedCard === index}
            onClick={() => handleExpandClick(index)}
            aria-expanded={expandedCard === index}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse
          in={expandedCard === index}
          timeout="auto"
          unmountOnExit
        >
          <CardContent>
            <Typography paragraph>Requirements:</Typography>
            <Typography paragraph>{post.jobDescription}</Typography>
            <Typography paragraph>
              Benefits <br />
              {/* Add post-specific benefits here */}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>{" "}
    </Grid>
  ))}
  
  {/* ))} */}
           
           
</Grid>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Button variant="outlined" onClick={handlePrevPage}>
            Previous
          </Button>
          {Array.from({ length: totalPages }, (_, index) => (
            <Button
              key={index}
              variant={currentPage === index + 1 ? 'contained' : 'outlined'}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Button>
          ))}
          <Button variant="outlined" onClick={handleNextPage}>
            Next
          </Button>
        </div>
      </div>
  );
};

export default JobView;

//old job osts display

// {/* {" "}
//         {/* Use Grid container */}
//         {/* {job.map((job, index) => ( */}
//         {jobCardsToShow.map((job, index) => (
//           // {filteredJobData.map((job, index) => (
//             <Grid item xs={12} sm={6} md={4} key={job.title}>
//               {" "}
//               {/* Use Grid item */}
//               {/* <Card sx={{ maxWidth: 345 }}
//            > */}
//               <Card
//                 sx={{
//                   maxWidth: 345,
//                   backgroundColor: "white",
//                   boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
//                 }}
//               >
//                 <CardHeader
//                   avatar={
//                     <Avatar sx={{ bgcolor: "#0096FF" }} aria-label="recipe">
//                       R
//                     </Avatar>
//                   }
//                   action={
//                     <IconButton aria-label="settings">
//                       <MoreVertIcon />
//                     </IconButton>
//                   }
//                   title={job.title}
//                   subheader="September 14, 2016"
//                   style={{ color: "#0096FF" }}
//                 />
  
//                 <CardContent>
//                   <Typography variant="body2" color="text.secondary">
//                     Company ={job.company} <br></br>
//                     Location ={job.location} <br></br>
//                     <br></br>
//                     {job.description} <br></br>
//                   </Typography>
//                 </CardContent>
//                 <CardActions disableSpacing>
//                   <IconButton aria-label="add to favorites">
//                     <FavoriteIcon />
//                   </IconButton>
//                   <IconButton aria-label="share">
//                     <ShareIcon />
//                   </IconButton>
//                   {/* <ExpandMore
//           expand={expanded}
//           onClick={handleExpandClick}
//           aria-expanded={expanded}
//           aria-label="show more"
//         > */}
//                   <ExpandMore
//                     expand={expandedCard === index}
//                     onClick={() => handleExpandClick(index)}
//                     aria-expanded={expandedCard === index}
//                     aria-label="show more"
//                   >
//                     <ExpandMoreIcon />
//                   </ExpandMore>
//                 </CardActions>
//                 {/* <Collapse in={expanded} timeout="auto" unmountOnExit> */}
//                 <Collapse
//                   in={expandedCard === index}
//                   timeout="auto"
//                   unmountOnExit
//                 >
//                   <CardContent>
//                     <Typography paragraph>Requirements:</Typography>
//                     <Typography paragraph>{job.requirements}</Typography>
//                     <Typography paragraph>
//                       Benefits <br></br>
//                       {job.benefits}
//                     </Typography>
//                   </CardContent>
//                 </Collapse>
//               </Card>{" "}
//             </Grid>
//           ))}
//           ;{" "}


// Dummy job data
// const job = [
//   {
//     title: "Software Engineer 1",
//     company: "Tech Co.",
//     location: "New York, NY",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     requirements: [
//       "Bachelor's degree in Computer Science or related field",
//       "3+ years of experience in software development",
//       "Strong problem-solving skills",
//     ],
//     benefits: [
//       "Competitive salary",
//       "Healthcare coverage",
//       "Flexible working hours",
//     ],
//   },
//   // Add more job objects here
//   {
//     title: "Frontend Developer 2",
//     company: "Web Solutions Inc.",
//     location: "San Francisco, CA",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     requirements: [
//       "Experience with React.js",
//       "Proficiency in HTML, CSS, and JavaScript",
//       "UI/UX design skills",
//     ],
//     benefits: [
//       "Competitive salary",
//       "Remote work options",
//       "Professional growth opportunities",
//     ],
//   },
//   {
//     title: "Frontend Developer 3",
//     company: "Web Solutions Inc.",
//     location: "San Francisco, CA",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     requirements: [
//       "Experience with React.js",
//       "Proficiency in HTML, CSS, and JavaScript",
//       "UI/UX design skills",
//     ],
//     benefits: [
//       "Competitive salary",
//       "Remote work options",
//       "Professional growth opportunities",
//     ],
//   },
//   {
//     title: "Frontend Developer 4",
//     company: "Web Solutions Inc.",
//     location: "San Francisco, CA",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     requirements: [
//       "Experience with React.js",
//       "Proficiency in HTML, CSS, and JavaScript",
//       "UI/UX design skills",
//     ],
//     benefits: [
//       "Competitive salary",
//       "Remote work options",
//       "Professional growth opportunities",
//     ],
//   },
//   {
//     title: "Frontend Developer 5",
//     company: "Web Solutions Inc.",
//     location: "San Francisco, CA",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     requirements: [
//       "Experience with React.js",
//       "Proficiency in HTML, CSS, and JavaScript",
//       "UI/UX design skills",
//     ],
//     benefits: [
//       "Competitive salary",
//       "Remote work options",
//       "Professional growth opportunities",
//     ],
//   },
//   {
//     title: "Frontend Developer 6",
//     company: "Web Solutions Inc.",
//     location: "San Francisco, CA",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     requirements: [
//       "Experience with React.js",
//       "Proficiency in HTML, CSS, and JavaScript",
//       "UI/UX design skills",
//     ],
//     benefits: [
//       "Competitive salary",
//       "Remote work options",
//       "Professional growth opportunities",
//     ],
//   },
//   {
//     title: "Data Scientist 7",
//     company: "Data Analytics Co.",
//     location: "Seattle, WA",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     requirements: [
//       "Master's or Ph.D. in Computer Science or related field",
//       "Experience with data analysis tools",
//       "Strong statistical and analytical skills",
//     ],
//     benefits: [
//       "Competitive salary",
//       "Comprehensive data training programs",
//       "Health and wellness benefits",
//     ],
//   },
//   {
//       title: "Data Scientist 8",
//       company: "Data Analytics Co.",
//       location: "Seattle, WA",
//       description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//       requirements: [
//         "Master's or Ph.D. in Computer Science or related field",
//         "Experience with data analysis tools",
//         "Strong statistical and analytical skills",
//       ],
//       benefits: [
//         "Competitive salary",
//         "Comprehensive data training programs",
//         "Health and wellness benefits",
//       ],
//     },
//     {
//       title: "Data Scientist 9",
//       company: "Data Analytics Co.",
//       location: "Seattle, WA",
//       description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//       requirements: [
//         "Master's or Ph.D. in Computer Science or related field",
//         "Experience with data analysis tools",
//         "Strong statistical and analytical skills",
//       ],
//       benefits: [
//         "Competitive salary",
//         "Comprehensive data training programs",
//         "Health and wellness benefits",
//       ],
//     },
//   // Add more job objects here
// ];
 