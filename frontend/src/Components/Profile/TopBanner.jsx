import { HiOutlineUserCircle, HiOutlinePencil   } from "react-icons/hi2";
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import React, { useState, useEffect } from 'react';


const TopBanner = () => {
  const { id } = useParams();
  const [recruiterDetails, setRecruiterDetails] = useState(null);
  const [isEditing, setEditing] = useState(false);
  const [editedDetails, setEditedDetails] = useState({
    firstName: '',
    lastName: '',
    company_name: '',
    currentJob: '',
    contactNo: '',
    workMail: '',
    pwd: '',
  });

  useEffect(() => {
    const fetchRecruiterDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/recruiter/getRecuiter/${id}`,{ _id:id});
        setRecruiterDetails(response.data.Recruiter);
        console.log(response.data.Recruiter.firstName);
        console.log(response.data.Recruiter.currentJob);
        
      } catch (error) {
        console.error('Error fetching recruiter details:', error.message);
      }
    };

    if (id) {
      fetchRecruiterDetails();
    }
  }, [id]);

  const handleEditClick = () => {
    setEditedDetails({
      firstName: recruiterDetails?.firstName || '',
      lastName: recruiterDetails?.lastName || '',
      company_name: recruiterDetails?.company_name || '',
      currentJob: recruiterDetails?.currentJob || '',
      contactNo: recruiterDetails?.contactNo || '',
      workMail: recruiterDetails?.workMail || '',
      pwd: recruiterDetails?.pwd || '',
    });

    setEditing(true);
  };

  const handleUpdateProfile = async () => {
    try {
      await axios.put(`http://localhost:8070/recruiter/updateRecuiter/${id}`, editedDetails);
      // After the update, you might want to fetch the updated details again
      const response = await axios.get(`http://localhost:8070/recruiter/getRecuiter/${id}`);
      setRecruiterDetails(response.data.Recruiter);
      setEditing(false);
    } catch (error) {
      console.error('Error updating recruiter details:', error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <div className="w-full p-7 mb-7 grid grid-cols-[20%_80%] bg-slate-100 border-b border-b-gray-300 shadow-xl relative">
    {/* image */}
    <div className="w-full h-full flex flex-col items-center justify-center">
      <HiOutlineUserCircle className="text-gray-700 text-[77px]" />
    </div>
    {/* details */}
    <div>
      {isEditing ? (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-md w-[400px]">
            <h3 className="text-2xl font-semibold mb-4">Edit Profile</h3>
            <form>
              {/* First Name and Last Name in the same line */}
              <div className="mb-4 flex gap-4">
                <div className="w-1/2">
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-600">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={editedDetails.firstName}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded-md"
                    disabled
                  />
                </div>
                <div className="w-1/2">
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-600">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={editedDetails.lastName}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded-md"
                    disabled
                  />
                </div>
              </div>
              <div className="mb-4">
               <label htmlFor="company_name" className="block text-sm font-medium text-gray-600">
                 Company Name
               </label>
               <input
                 type="text"
                 id="company_name"
                 name="company_name"
                 value={editedDetails.company_name}
                 onChange={handleInputChange}
                 className="mt-1 p-2 w-full border rounded-md"
               />
             </div>
             <div className="mb-4">
               <label htmlFor="currentJob" className="block text-sm font-medium text-gray-600">
                 Current Job Title
               </label>
               <input
                 type="text"
                 id="currentJob"
                 name="currentJob"
                 value={editedDetails.currentJob}
                 onChange={handleInputChange}
                 className="mt-1 p-2 w-full border rounded-md"
               />
             </div>
             <div className="mb-4">
               <label htmlFor="contactNo" className="block text-sm font-medium text-gray-600">
                Contact Number
               </label>
               <input
                 type="text"
                 id="contactNo"
                 name="contactNo"
                 value={editedDetails.contactNo}
                 onChange={handleInputChange}
                 className="mt-1 p-2 w-full border rounded-md"
               />
             </div>
             <div className="mb-4">
               <label htmlFor="workMail" className="block text-sm font-medium text-gray-600">
                 Email
               </label>
               <input
                 type="text"
                 id="workMail"
                 name="workMail"
                 value={editedDetails.workMail}
                 onChange={handleInputChange}
                 className="mt-1 p-2 w-full border rounded-md"
               />
             </div>
             <div className="mb-4">
               <label htmlFor="pwd" className="block text-sm font-medium text-gray-600">
                 Password
               </label>
               <input
                 type="text"
                 id="pwd"
                 name="pwd"
                 value={editedDetails.pwd}
                 onChange={handleInputChange}
                 className="mt-1 p-2 w-full border rounded-md"
               />
             </div>
              
              {/* ... */}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                  onClick={handleUpdateProfile}
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>

      ) : (
        <>
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
          {/* edit profile button */}
          <div className="cursor-pointer mt-2" onClick={handleEditClick}>
            <HiOutlinePencil className="text-gray-700 text-2xl" />
          </div>
        </>
      )}
    </div>
  </div>
  );
};

export default TopBanner;
