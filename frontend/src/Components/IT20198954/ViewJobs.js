import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Button, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Tooltip from "@mui/material/Tooltip";
import CardContent from "@mui/material/CardContent";

import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors"; 
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "../../CSS/it20198954.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Divider from "@mui/material/Divider";

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

  console.log(dataArray, "dataArray");

  //const [dataArray,setdataArray]=useState(updatedUser && updatedUser.jobRole ? updatedUser.jobRole : '');
  // const [jobRole,setJobRole] = useState(dataArray && dataArray.jobRole ? dataArray.jobRole : '');
  const [skills, setSkills] = useState(
    dataArray && dataArray.skills ? dataArray.skills : ""
  );
  const [message, setMessage] = useState("");

  console.log(
    "jobRole and recommendations row job posts page",
    jobRole,
    recommendations
  );
  //   const handleExpandClick = () => {
  //     setExpanded(!expanded);
  //   };

  // Filter criteria for company and location
  const [companyFilter, setCompanyFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  //const handle

  useEffect(() => {
    // Fetch job posts from your API or database
    axios.get("http://localhost:8070/register/getjobs").then((response) => {
      setJobPosts(response.data); // Assuming response.data contains job posts
      console.log(response, "response");
    });
  }, []);

  const filteredPosts = jobPosts.filter((post) => {
    // Preprocess the jobRole and recommendations
    const jobRoleProcessed = jobRole.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
    const recommendationsProcessed = recommendations.map((rec) =>
      rec.title.toLowerCase().replace(/[^a-zA-Z0-9]/g, "")
    );
  
    // Preprocess the post title
    const titleProcessed = post.title.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
  
    // Check if the preprocessed jobRole is in the preprocessed post title
    if (titleProcessed.includes(jobRoleProcessed)) {
      return true;
    }
  
    // Check if any recommendation contains a similar title
    return recommendationsProcessed.some((recProcessed) =>
      titleProcessed.includes(recProcessed)
    );
  });

  //originally worked one
  // const filteredPosts = jobPosts.filter((post) => {
  //   // Preprocess the jobRole and recommendations
  //   const jobRoleProcessed = jobRole.toLowerCase().replace(/\s/g, "");
  //   const recommendationsProcessed = recommendations.map((rec) =>
  //     rec.title.toLowerCase().replace(/\s/g, "")
  //   );

  //   // Preprocess the post title
  //   const titleProcessed = post.title.toLowerCase().replace(/\s/g, "");

  //   // Check if the preprocessed jobRole is in the preprocessed post title
  //   if (titleProcessed.includes(jobRoleProcessed)) {
  //     return true;
  //   }

  //   // Check if any recommendation contains a similar title
  //   return recommendationsProcessed.some((recProcessed) =>
  //     titleProcessed.includes(recProcessed)
  //   );
  // });

  // const filteredPosts = jobPosts.filter((post) => {
  //   // Preprocess the jobRole and recommendations
  //   const jobRoleProcessed = jobRole.toLowerCase().replace(/\s/g, "");
  //   const recommendationsProcessed = recommendations.map((rec) =>
  //     rec.title.toLowerCase().replace(/\s/g, "")
  //   );
  
  //   // Preprocess the post title
  //   const titleProcessed = post.title.toLowerCase().replace(/\s/g, "");
  
  //   // Extract the first word of the post title
  //   const firstWordOfTitle = post.title.toLowerCase().split(" ")[0];
  
  //   // Extract the first word of every recommendation
  //   const firstWordsOfRecommendations = recommendations.map((rec) =>
  //     rec.title.toLowerCase().split(" ")[0]
  //   );
  
  //   // Check if the preprocessed jobRole is in the preprocessed post title
  //   if (titleProcessed.includes(jobRoleProcessed)) {
  //     return true;
  //   }
  
  //   // Check if any recommendation contains a similar title
  //   if (recommendationsProcessed.some((recProcessed) =>
  //     titleProcessed.includes(recProcessed)
  //   )) {
  //     return true;
  //   }
  
  //   // Check if the first word of the post title is in the first words of recommendations
  //   if (firstWordsOfRecommendations.includes(firstWordOfTitle)) {
  //     return true;
  //   }
  
  //   // Check if the first word of the post title is the same as the preprocessed jobRole
  //   if (firstWordOfTitle === jobRoleProcessed) {
  //     return true;
  //   }
  
  //   return false;
  // });
  
  

  console.log(filteredPosts, "jobPosts and filteredPosts");

  const handleClearFilters = () => {
    setLocationFilter("");
    setCompanyFilter("");
  };

  // Calculate the total number of pages based on the number of job cards
  const totalPages = Math.ceil(filteredPosts.length / cardsPerPage);

  //  // Calculate the range of job cards to display for the current page

  // Filter job cards based on company and location criteria
  const filteredJobData = filteredPosts.filter((filteredPosts) => {
    return (
      filteredPosts.companyName
        .toLowerCase()
        .includes(companyFilter.toLowerCase()) &&
      filteredPosts.location
        .toLowerCase()
        .includes(locationFilter.toLowerCase())
    );
  });

  // Calculate the range of job cards to display for the current page old way
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;

  const jobCardsToShow = filteredJobData.slice(startIndex, endIndex);

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

  const handleStart = () => {
    navigate("/jobform", { state: { email } });
  };


  const handleApplyClick = () => {
    navigate('/applyform');
  };

  return (
    // <div className="job-recommendations">
    <div
      className="job-recommendations"
      style={{
        backgroundColor: "#F2F4F5",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        style={{
          color: "#1976d2",
          marginBottom: "20px",
          marginTop: "10px",
          marginLeft: "20px",
        }}
      >
        Job Recommendations
      </Typography>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Box mr={2}>
          {" "}
          {/* Add space to the right */}
          <TextField
            style={{ marginLeft: "300px" }}
            label="Company"
            variant="outlined"
            size="small"
            margin="dense"
            value={companyFilter}
            onChange={handleCompanyFilterChange}
          />
        </Box>
        <Box ml={2}>
          {" "}
          {/* Add space to the left */}
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
            margin: "10px 0 5px",
            marginRight: "200px",

            backgroundColor: "#1976d2", // Change background color
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

        <Button
          variant="contained"
          style={{
            backgroundcolor: "#1976d2",
            margin: "10px 0 5px",
            marginLeft: "auto",
          }}
          onClick={handleStart}
        >
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
      ></Grid>

      <Grid container spacing={2}>
        {/* {filteredPosts.map((post, index) => ( */}
        {jobCardsToShow.map((post, index) => (
          <Grid item xs={12} sm={6} md={4} key={post._id}>
            <Card
              style={{ boxShadow: "0px 4px 6px rgba(3, 2,2, 0.3)" ,marginLeft:"30px", marginRight:"30px" }}
              sx={{ maxWidth: 345 }}
            >
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: "#1976d2" }} aria-label="recipe">
                    R
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings" size="large">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={post.jobLevel + " " + post.title}
                subheader={post.location}
                style={{ color: "#1976d2" }}
              />

              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Company: {post.companyName} <br />
                  Location: {post.location} <br />
                  <br />
                  {post.jobDescription.slice(0, 150)}... <br />
                </Typography>
              </CardContent>
              <Divider style={{ backgroundColor: "silver" }} />
              <CardActions
                style={{
                  backgroundColor: "#f5f5f5", // Lighter color
                }}
                disableSpacing
              >
                <Button
                  style={{
                    backgroundColor: "#1976d2",
                    color: "white",
                    marginLeft: "10px",
                    marginRight: "1px",
                  }}
                  onClick={handleApplyClick}
                >
                  Apply
                </Button>
                {/* <IconButton aria-label="add to favorites" size="large">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share" size="large">
                  <ShareIcon />
                </IconButton>  */}
                <Tooltip title="See More">
                  <ExpandMore
                    expand={expandedCard === index}
                    style={{ color: "#1976d2" }}
                    onClick={() => handleExpandClick(index)}
                    aria-expanded={expandedCard === index}
                    aria-label="show more"
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    ></Typography>
                    <IconButton>
                      {" "}
                      <ExpandMoreIcon />{" "}
                    </IconButton>
                  </ExpandMore>
                </Tooltip>
              </CardActions>
              <Collapse
                in={expandedCard === index}
                timeout="auto"
                unmountOnExit
              >
                <CardContent>
                  <Typography paragraph>Requirements:</Typography>
                  <Typography paragraph>{post.jobDescription}</Typography>
                  {/* <Typography paragraph>
                    Benefits <br /> */}
                  {/* Add post-specific benefits here */}
                  {/* </Typography> */}
                </CardContent>
              </Collapse>
            </Card>{" "}
          </Grid>
        ))}

        {/* ))} */}
      </Grid>

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Button
          variant="outlined"
          style={{ margin: "10px 0 5px" }}
          onClick={handlePrevPage}
        >
          Previous
        </Button>
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            style={{ margin: "10px 0 5px", marginLeft: "10px" }}
            key={index}
            variant={currentPage === index + 1 ? "contained" : "outlined"}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
        <Button
          style={{ margin: "10px 0 5px", marginLeft: "10px" }}
          variant="outlined"
          onClick={handleNextPage}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default JobView;

 
