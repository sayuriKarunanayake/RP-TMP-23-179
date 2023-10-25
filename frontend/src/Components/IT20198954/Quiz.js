import React, { useContext, useState } from "react";
import { Box, Typography, Paper, Container } from "@mui/material";
import { QuizContext } from "./QuizHolder";
import quiz1 from "../../Assets/IT20198954/quiz5.png";
import { useNavigate, useLocation } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();
export default function Quiz() {
  const [current, setCurrent] = useState(0);

  const [value, setValue] = useState("");
  const { state } = useLocation();
  const { updatedUser } = state || {}; // Read values passed on state

  console.log("adduser row", updatedUser);
  const navigate = useNavigate();
  const [jobRole, setJobRole] = useState(
    updatedUser && updatedUser.jobRole ? updatedUser.jobRole : ""
  );
  console.log("jobRole row", jobRole);
  // Access the quiz questions for the user's job role

  return (
    <ThemeProvider theme={theme}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Box width={400}>
          <Paper elevation={3}>
            <QuizBox current={current} next={setCurrent} jobRole={jobRole} />
          </Paper>
        </Box>
      </Box>{" "}
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
    <div
      style={{
        backgroundImage: `url(${quiz1})`,
        maxWidth: "sm",
        height: "900px",
      }}
    >
      <Container
        backgroundSize="cover"
        backgroundPosition="center"
        maxWidth="sm"
        style={{ height: "900px", display: "flex", alignItems: "center" }}
      >
        <Paper elevation={3} className="quizpaper" style={{ width: "100%" }}>
          <center>
            {" "}
            <br></br> <br></br>
            <Box p={6}>
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
                  className="bold-question"
                  variant="h6"
                  marginRight="10px"
                  marginLeft="20px"
                  gutterBottom
                  style={{
                    textAlign: "center",
                    margin: "5 auto",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                >
                  {current + 1}) {quizzes[current].question}
                </Typography>{" "}
                <Typography
                  variant="h6"
                  marginRight="10px"
                  marginLeft="20px"
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
                        marginLeft: "25px",
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
                  color: "#fff",
                }}
                onClick={() => setAns([])}
              >
                Reset
              </Button>
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: "10px" }}
                onClick={saveHandler}
              >
                Save & Next
              </Button>
              <Button
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
