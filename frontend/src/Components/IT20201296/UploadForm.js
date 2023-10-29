import React, { useState } from 'react';
import './UploadForm.css'; // Import the CSS file
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Typography } from '@mui/material';
import { useParams } from 'react-router';

function UploadForm({ onImageUpload, onVideoUpload, verificationResult, headPosePercentage, blinkCount, onVerifyClick }) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [, setSelectedImage] = useState(null);
  const [, setSelectedVideo] = useState(null);

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

        <form action="#">

          <div class="form-rowD">
            <div class="input-dataD">
              <input type="text" required />
              <div class="underlineD"></div>
              <label for="">Full Name</label>
            </div>
            <div class="input-dataD">
              <input type="text" required />
              <div class="underlineD"></div>
              <label for="">Phone Number</label>
            </div>
          </div>

          <div class="form-rowD">
            <div class="input-dataD">
              <input type="text" required />
              <div class="underlineD"></div>
              <label for="">Email</label>
            </div>
          </div>



          <div class="form-rowD">
            <div class="input-dataD">
              <input type="text" required />
              <div class="underlineD"></div>
              <label for="">Link to Your Video</label>
            </div>
          </div>



          <div class="form-rowD">
            <div class="input-dataD">
              <div class="underlineD"></div>
              <label class="form-labelD" for="customFile">Upload Your video (Some thing about you in 1 min)</label><br />
              <input type="file" class="form-controlD" accept="video/*" onChange={handleVideoUpload} />
            </div>
          </div>

          <br />

          <div class="form-rowD">
            <div class="input-dataD">
              <div class="underlineD"></div>
              <label class="form-labelD" for="customFile">Upload Your recently taken photo</label><br />
              <input type="file" class="form-controlD" accept="image/*" onChange={handleImageUpload} />
            </div>
          </div>

          <br />

          <div class="form-rowD">
            <div class="input-dataD">
              <div class="underlineD"></div>
              <label class="form-labelD" for="customFile">Upload Your CV</label><br />
              <input type="file" class="form-controlD" id="customFile" />
            </div>
          </div>

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
              <input type="submit" value="Submit" onClick={onVerifyClick} />
            </div>
          </div>


        </form>
      </div>

    </div>


  );
}

export default UploadForm;
