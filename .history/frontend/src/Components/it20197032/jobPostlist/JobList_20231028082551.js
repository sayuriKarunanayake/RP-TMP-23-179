import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Card, CardBody, CardTitle, CardSubtitle, CardText, Nav, NavItem, NavLink, Navbar } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from "axios";



const JobList = () => {
  const [jobPosts, setJobPosts] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);


    useEffect(() => {
      // Fetch job posts from the Node.js backend
      axios.get("http://localhost:8070/job/getalljob")
        .then(response => {
          setJobPosts(response.data);
          console.log(response.data);
          
        })
        .catch(error => {
          console.error("Error fetching job posts:", error);
        });
    }, []);

   // Function to handle card click and display full description
  const handleCardClick = (job) => {
    setSelectedJob(job);
    setIsPopupOpen(true);
   
  };

  // Function to close the popup
  const closePopup = () => {
    setIsPopupOpen(false);
  };
  
  // Define CSS styles using objects
  const popupStyle = {
    display: isPopupOpen ? 'block' : 'none',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)', // Center the popup
    width: '80%',
    maxWidth: '500px', // Adjust the width as needed
    maxHeight: '80%',
    overflowY: 'auto',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
  };
  
  const popupInnerStyle = {
    padding: '20px',
  };
  
  const closeBtnStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '24px',
    color: 'red',
  };
  
  const applyButtonStyle = {
    backgroundColor: '#2ECC71',
    color: 'white',
    border: 'none',
    padding: '5px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
  };
  
  const applyButtonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  };

  const activeStyle = {
    
    borderBottom: '2px solid #0c7cba',
  };

  const pageStyle = {
    backgroundColor:'#F2F2F2',
    minHeight: '100vh', 
    padding: '50px', 
    margin: '0', 

  };

  return (
    <div style={pageStyle}>
      <Navbar color="light" light expand="md" className="my-custom-navbar">
      <Nav className="mx-auto" navbar>
        <NavItem style={{ marginRight: '20px' }}>
          <NavLink style={activeStyle} tag={Link} to="/joblist">All Jobs</NavLink>
        </NavItem>
        <NavItem style={{ marginRight: '20px' }}>
          <NavLink tag={Link} to="/selist">Development and Programming</NavLink>
        </NavItem>
        <NavItem style={{ marginRight: '20px' }}>
          <NavLink tag={Link} to="/netlist">Infrastructure and Networking</NavLink>
        </NavItem>
        <NavItem style={{ marginRight: '20px' }}>
          <NavLink tag={Link} to="/dslist">Data and Analytics</NavLink>
        </NavItem>
        <NavItem style={{ marginRight: '20px' }}>
          <NavLink tag={Link} to="/cyblist">Security and Compliance</NavLink>
        </NavItem>
        <NavItem style={{ marginRight: '20px' }}>
          <NavLink tag={Link} to="/pmlist">Management and Support</NavLink>
        </NavItem>
      </Nav>
    </Navbar>

      <br/>
      <Row>
        {jobPosts.map((job) => (
          <Col md="4" key={job.id}>
            <div onClick={() => handleCardClick(job)} style={{ cursor: 'pointer' }}>
              <Card className="mb-4" style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', borderRadius: '10px', overflow: 'hidden' }}>
                <CardBody>
                  <CardTitle tag="h5" style={{ color: '#2C3E50', marginBottom: '10px' }}>{job.jobLevel} {job.title}</CardTitle>
                  <CardSubtitle tag="h6" className="mb-2 text-muted">{job.companyName}</CardSubtitle>
                  <CardText style={{ color: '#7F8C8D', marginBottom: '15px' }}>Location: {job.location}</CardText>
                  <CardText style={{ color: '#34495E', lineHeight: '1.6', marginBottom: '15px' }}>{job.jobDescription.substring(0, 150)}...</CardText>
                </CardBody>
                <div className="card-footer" style={{ backgroundColor: '#ECF0F1', borderTop: '1px solid #BDC3C7' }}>
                  <Button
                    color="success"
                    className="float-right"
                    style={{ backgroundColor: '#1976d2', border: 'none', borderRadius: '5px' }}
                  >
                    View Job
                  </Button>
                </div>
              </Card>
            </div>
          </Col>
        ))}
      </Row>


     {/* Define your popup styles using inline styles */}
     <div style={popupStyle}>
      <div style={popupInnerStyle}>
        <button style={closeBtnStyle} onClick={closePopup}>
          <span style={{ fontSize: '24px', fontWeight: 'bold' }}>&times;</span>
        </button><br/>
        <Card>
          <CardBody>
            <CardTitle tag="h5">{selectedJob?.jobLevel} {selectedJob?.title}</CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">{selectedJob?.companyName}</CardSubtitle>
            <CardText>Location: {selectedJob?.location}</CardText>
            <CardText>{selectedJob?.jobDescription}</CardText>
          </CardBody>
        </Card>
        <div style={applyButtonContainerStyle}>
          <button style={applyButtonStyle}>
            Apply
          </button>
        </div>
      </div>
    </div>
    </div>
    
    
  );
};

export default JobList;
