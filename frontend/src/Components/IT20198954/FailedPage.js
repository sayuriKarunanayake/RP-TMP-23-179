import React, { useContext, useState } from "react";
import { styled } from "@mui/material/styles";
import { QuizContext } from "./QuizHolder";
import {
  Button,
  Container,
  Typography,
  Card,
  CardContainer,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import image from "../../Assets/IT20198954/q2.png";

const PREFIX = "FailedPage";

const classes = {
  root: `${PREFIX}-root`,
  button: `${PREFIX}-button`,
};

const Root = styled("div")(({ theme }) => ({
  [`&.${classes.root}`]: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    // backgroundColor:"#ADD8E6",
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
  },

  [`& .${classes.button}`]: {
    marginTop: theme.spacing(2),
    width: "100%",
    maxWidth: "300px",
    color: "#ff9800", // Set the button text color here
  },
}));

export default function Fail() {
  const { setStart } = useContext(QuizContext);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { dataArray } = state || {};
  const [jobRole, setJobRole] = useState(
    dataArray && dataArray.jobRole ? dataArray.jobRole : ""
  );
  const [email, setEmail] = useState(localStorage.getItem("email"));

  console.log(jobRole, "jobRole");

  const handleStart = () => {
    setStart(true);
    setJobRole(jobRole);
  };

  const handleContinue = () => {
    navigate("/quiz", { state: { dataArray } });
  };

  return (
    <Root className={classes.root}>
      <Container classname="containerQuiz">
        <Card style={{ marginLeft: "320px", width: "450px" }}>
          <Typography
            style={{
              marginLeft: "10px",
              marginTop: "10px",
              marginRight: "10px",
            }}
            variant="h6"
            gutterBottom
          >
            You do not have enough score to proceed. Please try again!
          </Typography>
          <Button
            variant="contained"
            style={{
              marginLeft: "100px",
              marginTop: "10px",
              marginBottom: "30px",
              width: "200px",
              background: "linear-gradient(90deg, #FF0000, #FF0000)",
              color: "white",
            }}
            onClick={handleContinue}
          >
            Retake skill test
          </Button>
        </Card>{" "}
      </Container>
    </Root>
  );
}
 