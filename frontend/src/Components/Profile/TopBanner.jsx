import { HiOutlineUserCircle } from "react-icons/hi2";
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import React, { useState, useEffect } from 'react';

const TopBanner = () => {
  const { id } = useParams();
  const [recruiterDetails, setRecruiterDetails] = useState(null);

  useEffect(() => {
    const fetchRecruiterDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/recruiter/getRecuiter/${id}`,{ _id:id});
        setRecruiterDetails(response.data.Recruiter);
        console.log(response.data.Recruiter.firstName);
        
      } catch (error) {
        console.error('Error fetching recruiter details:', error.message);
      }
    };

    if (id) {
      fetchRecruiterDetails();
    }
  }, [id]);

  return (
    <div className="w-full p-7 mb-7 grid grid-cols-[20%_80%] bg-slate-100 border-b border-b-gray-300 shadow-xl">
      {/* image */}
      <div className="w-full h-full flex flex-col items-center justify-center">
        <HiOutlineUserCircle className="text-gray-700 text-[77px]" />
      </div>
      {/* details */}
      <div>
        {recruiterDetails ? (
          <>
            <h3 className="text-2xl font-semibold mb-2">
              {recruiterDetails.firstName} {recruiterDetails.lastName}
            </h3>
            <p>{recruiterDetails.currentJob}</p>
            <p>{recruiterDetails.company_name}</p>
          </>
        ) : (
          <p>Loading recruiter details...</p>
        )}
      </div>
    </div>

  );
};

export default TopBanner;
