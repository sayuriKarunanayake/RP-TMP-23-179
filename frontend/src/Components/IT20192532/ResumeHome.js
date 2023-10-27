import React from "react"
import { Container, Row, Col, Button, Card } from "react-bootstrap"
import { Link } from "react-router-dom"

const ResumeHome = () => {
  const CardWithHover = ({ title, description, buttonText, linkTo }) => {
    const [isHovered, setIsHovered] = React.useState(false)

    const customCardStyle = {
      width: "calc(33.33% - 20px)",
      borderRadius: "15px",
      overflow: "hidden",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
      transform: isHovered ? "scale(1.05)" : "scale(1.0)",
      cursor: "pointer",
      transition: "transform 0.5s",
    }

    const cardImageStyle = {
      transition: "filter 0.6s",
      filter: isHovered ? "blur(0)" : "blur(2px)",
    }

    return (
      <Card
        style={customCardStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Card.Img
          variant="top"
          src="https://mdbootstrap.com/img/Photos/Horizontal/Work/4-col/img%20%2814%29.webp"
          style={cardImageStyle}
          className="card-image"
        />
        <Card.Body>
          <h3 className="card-title pt-2" style={{ color: "#1976d2" }}>
            {title}
          </h3>
          <p>{description}</p>
          <br></br>
          <Link to={linkTo} style={{ textDecoration: "none" }}>
            <Button
              className="btn btn btn-lg mb-2"
              style={{ backgroundColor: "#1976d2" }}
            >
              {buttonText}
            </Button>
          </Link>
        </Card.Body>
      </Card>
    )
  }

  return (
    <div>
      <Container>
        <br />
        <br />
        <br />
        <Row>
          <Col lg={12}>
            <center>
              {" "}
              <h1>
                <strong style={{ color: "#1976d2" }}>
                  Resume Optimizer and Enhancement System
                </strong>
              </h1>
            </center>
            <br />
            <br />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <CardWithHover
                title="Go Back To Home"
                description="Let's Go Back and Explore more Services"
                buttonText="Home"
                linkTo="/"
              />
              <CardWithHover
                title="Resume Suggestions"
                description="!! Upload your Resume and get personalized suggestions !! "
                buttonText="Upload Resume"
                linkTo="/resumesugg"
              />
              <CardWithHover
                title="Generate New Resume"
                description="Getting started is easy, just browse our templates and click on the one you want to use."
                buttonText="Generate New Resume"
                linkTo="/ResumeForms"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ResumeHome
