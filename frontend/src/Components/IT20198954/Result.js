import React, { useContext, useState, useEffect } from "react";
import { Box, Button, Typography, Paper, Container } from "@mui/material";
import { QuizContext } from "./QuizHolder";
import quiz1 from "../../Assets/IT20198954/quiz5.png";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Divider from "@mui/material/Divider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

export default function Result({ email }) {
  const { correct, setExit, setStart, quizSets, setCorrect } =
    useContext(QuizContext);
  const navigate = useNavigate();
  
  const { state } = useLocation();
  const { updatedUser } = state || {};

  const [jobRole, setJobRole] = useState(
    updatedUser && updatedUser.jobRole ? updatedUser.jobRole : "");
  const [userSkills, setUserSkills] = useState( updatedUser && updatedUser.skills ? updatedUser.skills : "");
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState("");

  const dataArray = [];
  console.log("jobRole row result page", jobRole);
  // Access the quiz questions for the user's job role
  console.log(quizSets, "quizSets RP");
  // Access the quiz questions for the user's job role using the jobRole prop
  const quizzes = quizSets[jobRole];

  console.log("quizzes result", quizzes);
  const playAgain = () => {
    setExit(false);
    setStart(true);
    setCorrect(0);
  };


  const handleSubmit = async () => {
    // e.preventDefault();
    if(correct >= 7 ){
    try {
      const response = await axios.post("http://192.168.16.100:5001/recommend", {
        user_skills: userSkills,
      });
      if (response.status === 200) {
        const data = response.data;
        setRecommendations(data.recommendations);

        setError("");

         // Push jobRole and recommendations to dataArray
        dataArray.push(jobRole);
        dataArray.push(data.recommendations);
        console.log(dataArray,"dataArray");
        localStorage.setItem("results", correct);
        navigate("/viewrec", { state: { updatedUser: dataArray } });

      } else {
        setError("Error: Unable to retrieve recommendations.");
      }
    } catch (error) {
      setError("An error occurred while fetching recommendations.");
    }
  }else{
    setCorrect(0);
    setExit(false);
    setStart(false);
  navigate("/fail", { state: { updatedUser: dataArray } });
}
  };

  const nextStep = () => {
    setExit(false);
    setStart(false);

    if (correct >= 7) {
      //navigate('/jobs');
      handleSubmit();
      console.log(dataArray,"dataArray after next clcik");
     // navigate("/jobs", { state: { dataArray } });
     // navigate("/jobs", { state: { updatedUser } });
        localStorage.setItem("results", correct);
        
      navigate("/jobs", { state: { updatedUser: dataArray } });
      
    } else {
      //   setExit(false);
      // setStart(true);
      // setCorrect(0);
      setCorrect(0);
      navigate("/fail", { state: { updatedUser } });
      //navigate('/fail');
    }
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${quiz1})`,
          maxWidth: "sm",
          height: "900px",
        }}
      >
        <center>
          {" "}
          <Container
            backgroundSize="cover"
            backgroundPosition="center"
            maxWidth="sm"
            style={{ height: "700px", display: "flex", alignItems: "center" }}
          > 
          
            <Paper  elevation={6} className="resultpaper" >
              {" "}
             
              <Table>
                <TableHead>
                  {/* <TableRow>
                    <TableCell classname="tableCell">
                      <Typography>
                        <div>
                          {error && <p>{error}</p>}{" "}
                          {recommendations.length > 0 && (
                            <div>
                              {" "}
                              <h2>Recommended Job Titles:</h2>{" "}
                              <ul>
                                {" "}
                                {recommendations.map((rec, index) => (
                                  <li key={index}>
                                    {" "}
                                    {rec.title} (Similarity Score:{" "}
                                    {rec.score.toFixed(2)}){" "}
                                  </li>
                                ))}{" "}
                              </ul>{" "}
                            </div>
                          )}
                        </div>
                      </Typography>
                    </TableCell>
                  </TableRow> */}
                  <TableRow>
                    <TableCell classname="tableCell">
                      <Typography
                        className="bold-question"
                        variant="h4"
                        marginRight="50px"
                        marginLeft="50px"
                        marginTop={5}
                        gutterBottom
                        style={{
                          textAlign: "center",
                          margin: "5 auto",
                          marginLeft: "5px",
                          marginRight: "5px",
                        }}
                      >
                        RESULTS
                      </Typography>
                      
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableCell classname="tableCell">
                    <Typography
                      className="bold-question"
                      variant="h6"
                      marginRight="5px"
                      marginLeft="5px"
                      gutterBottom
                      style={{
                        margin: "5 auto",
                        marginLeft: "5px",
                        marginRight: "5px",
                      }}
                    >
                      Number of Questions
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {" "}
                    <button className="totalquestionsbutton">
                      {quizzes.length}
                    </button>
                  </TableCell>
                  <TableRow>
                    <TableCell classname="tableCell">
                      <Typography
                        className="bold-question"
                        variant="h6"
                        marginRight="5px"
                        marginLeft="5px"
                        gutterBottom
                        style={{
                          margin: "5 auto",
                          marginLeft: "5px",
                          marginRight: "5px",
                        }}
                      >
                        Number of Correct Answers{" "}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {" "}
                      <button className="correctnumberbutton">{correct}</button>
                    </TableCell>
                  </TableRow>
                  <br></br> <br></br>
                  <center>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={playAgain}
                      style={{
                        marginBottom: "8px",
                        marginRight: "5px",
                        marginLeft: "50px",
                        width: "500px",
                        height: "auto",
                        textAlign: "center",
                      }}
                    >
                      Retry
                    </Button>
                    {/* <Button
                      variant="contained"
                      color="primary"
                      onClick={nextStep}
                      style={{
                        marginBottom: "8px",
                        marginRight: "5px",
                        marginLeft: "50px",
                        width: "500px",
                        height: "auto",
                        textAlign: "center",
                      }}
                    >
                      next
                    </Button> */}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
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
                  </center>
                </TableBody>
              </Table>
            </Paper>
          </Container>
        </center>
      </div>
    </>
    
  );
}

