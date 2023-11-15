import React, { useContext, useState ,useEffect} from "react"; 
import axios from "axios";
import { Box, Typography, Paper, Container } from "@mui/material";
import { QuizContext } from "./QuizHolder";
import quiz1 from "../../Assets/IT20198954/quiz5.png";
import { useNavigate, useLocation } from "react-router-dom"; 
import Button from "@mui/material/Button";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export default function Quiz() {
  const navigate = useNavigate();

  const [current, setCurrent] = useState(0);
  const [skills, setSkills] = useState("");
  const location = useLocation();
  const [value, setValue] = useState("");
  const { state } = useLocation();
  const { updatedUser } = state || {}; // Read values passed on state
  const [user, setUser] = useState("");
   
   
  const [jobRole, setJobRole] = useState(
    updatedUser && updatedUser.jobRole ? updatedUser.jobRole : ""
  );
   
  // Access the quiz questions for the user's job role
  const [email, setEmail] = useState(localStorage.getItem("email"));
 
  useEffect(() => {
    // Moved the API call inside useEffect
    
    getResults();
    // setRecommendations(resultsData.recommendations);
    // setJobRole(resultsData.jobRole);
  }, [email,jobRole]);
  
  const getResults = async () => {
    try {
      const response = await axios.get(`https://itconnect-backend-8c64d94c6e02.herokuapp.com/register/find/${email}`);
      
      if (response.status === 200 && response.data.success) {
        setUser(response.data.data);
        setSkills(response.data.data.skills);
        setJobRole(response.data.data.jobRole);
        console.log(response.data.data, "resultsData");
      } else {
        console.log("Error while loading data");
      }
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <ThemeProvider theme={theme} >
      <div style={{ backgroundImage: `url(${quiz1})`, backgroundSize: "cover", backgroundPosition: "center"  }}> 
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
         
      >
        <Box marginTop={10} marginBottom="150px">
          
            <QuizBox current={current} next={setCurrent} jobRole={jobRole} />
         
        </Box>
      </Box>{" "} 
      </div>
    </ThemeProvider>
  );
}

const QuizBox = ({ current, next, jobRole }) => {
  const { quizSets, questions, quizzesT, correct, setCorrect, setExit } =
    useContext(QuizContext);
  const [ans, setAns] = useState([]);
  console.log(jobRole, "jobRole quiB");

  console.log(quizSets, "quizSets");
  // Access the quiz questions for the user's job role using the jobRole prop
  const quizzes = quizSets[jobRole];

  console.log(jobRole, "jobRole");
  console.log(quizzes, "quizzes");

  const saveHandler = () => {
    const isAnswerCorrect = ans.sort().join("") === quizzes[current].correct;
    if (isAnswerCorrect) {
      setCorrect(correct + 1);
    }
    setAns([]);
    if (current + 1 === quizzes.length) {
      setExit(true);
    } else {
      next(current + 1);
    }
  };

  const handleAnswerSelection = (option) => {
    const newAns = [...ans];
    const optionIndex = newAns.indexOf(option);
    if (optionIndex === -1) {
      newAns.push(option);
    } else {
      newAns.splice(optionIndex, 1);
    }
    setAns(newAns);
  };

  const backgroundImageUrl = "url(your-image-url.jpg)";

  const pageStyle = {
    background: `url(${quiz1})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh", // Ensure the image covers the entire viewport height
  };

  return (
    <div>
      {/* <Container 
        backgroundSize="cover"
        backgroundPosition="center"
        maxWidth="sm"
        style={{ height: "900px", display: "flex", alignItems: "center" }}
      > */}
       {/* <Container maxWidth="sm" style={{ height: "100%" }}>
       
        <Paper elevation={5}> */}
         <Container maxWidth="md">
        <Paper elevation={3} className="quizpaper" style={{   height:"auto" ,maxWidth:"650px" }}>
          <center>
            {" "}
            <br></br> 
            <Box p={1}>
              {" "}
              <center>
                {/* <Typography
                class="bold-question"
                variant="h2"
                 marginRight= "10px"
                      marginLeft= "20px"
                gutterBottom
                style={{
                  textAlign: "center",
                }}
              >
                {current + 1}){quizzes[current].question}
              </Typography>{" "} */}
                <Typography
                  className="bold-questionTest"
                  
                  variant="h6"
                  
                  gutterBottom
                  style={{
                    textAlign: "center",
                    margin: "5 auto",
                    marginLeft: "10px",
                    marginRight: "10px",
                    fontFamily: "Open Sans, sans-serif",
                  }}
                >
                  {current + 1}) {quizzes[current].question}
                </Typography>{" "}
                <Typography
                  variant="h6"
                  marginRight="10px"
                  marginLeft="10px"
                  gutterBottom
                  style={{
                    textAlign: "center",
                    margin: "5 auto",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                >
                  (Select one or more)
                </Typography>
                {/* <br></br> */}
              </center>
            </Box>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mt={5}
              >
                {["a", "b", "c", "d"].map((option, index) => (
                  <div>
                    {" "}
                    <Button  
                      key={option}
                      variant="contained"
                      color={ans.includes(option) ? "primary" : "inherit"}
                      onClick={() => handleAnswerSelection(option)}
                      style={{
                        marginBottom: "8px",
                        marginRight: "20px",
                        marginLeft: "20px",
                        width: "500px",
                        height: "auto",
                        textAlign: "center",
                      }}
                    >
                      {index + 1}
                      {") "}
                      {quizzes[current][option]}
                    </Button>
                    <br></br> <br></br>
                  </div>
                ))}
              </Box>
            </div>
            
            <Box display="flex" justifyContent="space-between" mt={3}>
              <Button
                variant="contained"
                style={{
                  marginRight: "10px",
                  backgroundColor: "#ff9800",
                  color: "error",
                  marginLeft: "90px" ,
                  marginBottom:"40px",
                  width:"100px"
                }}
                onClick={() => setAns([])}
              >
                Reset
              </Button>
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: "10px" ,marginBottom:"40px" }}
                onClick={saveHandler}
              >
                Save & Next
              </Button>
              <Button
              marginRight="6px"
              style={{ marginRight: "90px" ,marginBottom:"40px" , width:"100px" }}
                variant="contained"
                color="secondary"
                onClick={() => setExit(true)}
              >
                Exit
              </Button>
            </Box>
          </center>
        </Paper>
      </Container>{" "}
    </div>
  );
};
