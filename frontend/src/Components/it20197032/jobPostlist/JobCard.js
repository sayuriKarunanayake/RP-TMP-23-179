import React from 'react';


const JobListingCard = ({ jobTitle, company, location, description }) => {
  return (
    <div className="job-listing-card">
      <div className="job-title">{jobTitle}</div>
      <div className="company">{company}</div>
      <div className="location">{location}</div>
      <div className="description">{description}</div>
    </div>
  );
};

export default JobListingCard;
