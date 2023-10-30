import React, { useState } from 'react';
import './UploadForm.css'; // Import the CSS file
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Typography } from '@mui/material';
import { useParams } from 'react-router';
import axios from 'axios';

function UploadForm({ onImageUpload, onVideoUpload, verificationResult, headPosePercentage, blinkCount, onVerifyClick }) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const [fullName, setfullName] = useState("");
  const [phoneNo, setphoneNo] = useState("");
  const [email, setemail] = useState("");
  const [videoLink, setvideoLink] = useState("");
  const [cvLink, setcvLink] = useState("");

  const newApply = {
    fullName,
    phoneNo,
    email,
    videoLink,
    cvLink

  };






  const handleSubmit = (e) => {


    //form input validations
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
      alert("Invalid Email!");
      return
    }
    else if (!(fullName.trim().length > 5)) {
      alert("Invalid Full Name!")
      return
    }
    else if (!(videoLink.trim().length > 5)) {
      alert("Invalid Full Name!")
      return
    }
    else if (!(cvLink.trim().length > 5)) {
      alert("Invalid Full Name!")
      return
    }
    else if (phoneNo.trim().length != 10) {
      alert("Invalid Phone Number!");
      return
    }


    e.preventDefault();




    axios.post("http://localhost:8070/addApplications", newApply)
      .then(() => {
        alert("Job Applied Successfully");
        window.location = `/home`;
      })
      .catch((err) => {
        alert(err.response.data.message);
        console.log(err.message);
      });
  };

  const { id } = useParams();
  console.log('job ID:', id);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    onImageUpload(file);
    setSelectedImage(URL.createObjectURL(file)); // Display selected image
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    onVideoUpload(file, setUploadProgress);
    setSelectedVideo(URL.createObjectURL(file)); // Display selected video
  };

  const displayVerificationResult = () => {
    if (verificationResult !== null) {
      return (
        <div className="verification-result">
          <p>Verification Result: {verificationResult.match ? 'Match' : 'Not a Match'}</p>
          <div className="similarity-score">
            <p>Similarity Score: {verificationResult ? verificationResult.avg_similarity_score : 'N/A'}</p>
          </div>
          {/* Display head pose percentage */}
          <div className="head-pose-percentage">
            <p>Percentage looking forward: {headPosePercentage !== null ? `${headPosePercentage.toFixed(2)}%` : 'N/A'}</p>
          </div>

        </div>
      );
    } else {
      return (
        <div className="verification-result">
          <p>No result yet</p>
        </div>
      );
    }
  };

  const displayProgressBar = () => {
    if (uploadProgress > 0 && uploadProgress < 100) {
      return (
        <div className="progress-bar">
          <progress value={uploadProgress} max="100"></progress>
          <p>{uploadProgress}%</p>
        </div>
      );
    } else {
      return null;
    }
  };

  const displayBlinkCount = () => {
    if (blinkCount !== null) {
      return (
        <div className="blink-count">
          <p>Eye Blink Count: {blinkCount}</p>
        </div>
      );
    } else {
      return null;
    }
  };

  const displayStressLevel = () => {
    if (verificationResult !== null && verificationResult.stressLevel !== undefined) {
      return (
        <div className="stress-level">
          <p>Stress Level (Above 100 = Stressed): {verificationResult.stressLevel.toFixed(2)}</p>
        </div>
      );
    } else {
      return null;
    };
  };

  return (

    <div>
      <div role="presentation"  >
        <Breadcrumbs aria-label="breadcrumb" marginLeft="100px" marginTop="20px">
          <Link underline="hover" color="inherit" href="/joblist">
            Jobs
          </Link>
          <Typography color="text.primary">Breadcrumbs</Typography>
        </Breadcrumbs>
      </div>
      <div class="containerD">
        <div class="textD">
          Apply Here!
        </div>
        <br />

        <form onSubmit={handleSubmit}>

          <div class="form-rowD">
            <div class="input-dataD">
              <input type="text" onChange={(e) => setfullName(e.target.value)} required/>
              <div class="underlineD"></div>
              <label for="">Full Name</label>
            </div>
            <div class="input-dataD">
              <input type="text" onChange={(e) => setphoneNo(e.target.value)} required/>
              <div class="underlineD"></div>
              <label for="">Phone Number</label>
            </div>
          </div>

          <div class="form-rowD">
            <div class="input-dataD">
              <input type="text" onChange={(e) => setemail(e.target.value)} required/>
              <div class="underlineD"></div>
              <label for="">Email</label>
            </div>
          </div>

          <div class="form-rowD">
            <div class="input-dataD">
              <input type="text" onChange={(e) => setvideoLink(e.target.value)} required/>
              <div class="underlineD"></div>
              <label for="">Link to Your Video</label>
            </div>
          </div>

          <div class="form-rowD">
            <div class="input-dataD">
              <input type="text" onChange={(e) => setcvLink(e.target.value)} required/>
              <div class="underlineD"></div>
              <label for="">Link to Your CV</label>
            </div>
          </div>

          <div class="form-rowD">
            <div class="input-dataD">
              <div class="underlineD"></div>
              <label class="form-labelD" for="customFile">Upload Your video (Some thing about you in 1 min)</label><br />
              {selectedVideo && <video src={selectedVideo} controls width="200" height="150" />}
              <input type="file" class="form-controlD" accept="video/*" onChange={handleVideoUpload} />
            </div>
          </div>

          <br />

          <div class="form-rowD">
            <div class="input-dataD">
              <div class="underlineD"></div>
              <label class="form-labelD" for="customFile">Upload Your recently taken photo</label><br />
              {selectedImage && <img src={selectedImage} alt="Selected" width="200" height="150" />}
              <input type="file" class="form-controlD" accept="image/*" onChange={handleImageUpload} />
            </div>
          </div>

          <br />
          <br />
          <br />

          <div className='form-rawD'>
            <div className='input-dataD'>
              {displayVerificationResult()}
              {displayProgressBar()}
              {displayBlinkCount()} {/* Display blink count */}
              {displayStressLevel()} {/* Display stress level */}
            </div>
          </div>


          <div className="form-row submit-btnD">
            <div className="input-dataD">
              <div className="innerD"></div>
              {/* Call onVerifyClick (handleVerification) when the button is clicked */}
              <button
                className='button12'
                type="submit"
                value="Submit"
                onClick={onVerifyClick}
              >
                Submit
              </button>
            </div>
          </div>


        </form>
      </div>

    </div>


  );
}

export default UploadForm;
