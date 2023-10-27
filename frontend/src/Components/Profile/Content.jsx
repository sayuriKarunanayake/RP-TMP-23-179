import { TbFilter } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { jobTable } from "../../db/data";
import { useParams, Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import React, { useState, useEffect } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';

const Content = () => {
  const { id } = useParams();
  const [jobDetails, setJobDetails] = useState([]);

  useEffect(() => {
    // Fetch job posts from the Node.js backend
    axios.get("http://localhost:8070/job/getalljob")
      .then(response => {
        setJobDetails(response.data);
      })
      .catch(error => {
        console.error("Error fetching job posts:", error);
      });
  }, []);

// Filter jobs based on the recruiter ID
const filteredJobs = jobDetails.filter(job => job.recruiterID === id);


  return (
    <div className=" w-full">
      {/* top section */}
      <div className=" w-full p-7 flex items-center justify-between">
        {/* left side */}
        <h3 className=" text-4xl font-semibold ml-5">Job Posting</h3>
        {/* right side */}
        <div className=" flex items-center gap-5">
          
        <Link to={`/addjob/${id}`} className="flex items-center py-2 px-5 border-2 border-blue-600 bg-blue-600 hover:bg-blue-700 rounded-lg text-white no-underline">
          Post Job <AiOutlinePlus className="text-lg ml-2" />
        </Link>
        </div>
      </div>
      {/* table */}
      <div className=" w-full px-7">
        <Table
          sx={{ minWidth: 650 }}
          className=" shadow-lg rounded-lg overflow-hidden"
          aria-label="simple table"
        >
          <TableHead className=" bg-[#1976b2]">
            <TableRow>
              <TableCell className="tabal-color">Job Title</TableCell>
              <TableCell className="tabal-color" align="right">
                Company Name
              </TableCell>
              <TableCell className="tabal-color" align="right">
                Job Level
              </TableCell>
          
              <TableCell className="tabal-color" align="right">
                Location
              </TableCell>
              <TableCell className="tabal-color" align="right">
                Created Date
              </TableCell>
              <TableCell className="tabal-color" align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredJobs.map((job) => (
              <TableRow key={job._id}>
                <TableCell>{job.title}</TableCell>
                <TableCell align="right">{job.companyName}</TableCell>
                <TableCell align="right">{job.jobLevel}</TableCell>
                <TableCell align="right">{job.location}</TableCell>
                <TableCell align="right">2023/02</TableCell>
                <TableCell align="right">
                  <AiOutlineDelete
                  className="cursor-pointer text-red-500"
                  
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Content;
