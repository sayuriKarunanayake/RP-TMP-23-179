import React, { useState } from 'react';
import './UploadForm.css'; // Import the CSS file

function UploadForm({ onImageUpload, onVideoUpload, verificationResult, headPosePercentage, onVerifyClick }) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [, setSelectedImage] = useState(null);
  const [, setSelectedVideo] = useState(null);

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


  const container = {
    maxWidth: '800px',
    background: '#fff',
    width: '800px',
    padding: '25px 40px 10px 40px',
    boxShadow: '0px 0px 10px rgba(0,0,0,0.1)'
  };

  return (


    <div>

      <div class="container">
        <div class="text">
          Apply Here!
        </div>

        <form action="#">

          <div class="form-row">
            <div class="input-data">
              <input type="text" required />
              <div class="underline"></div>
              <label for="">Full Name</label>
            </div>
            <div class="input-data">
              <input type="text" required />
              <div class="underline"></div>
              <label for="">Phone Number</label>
            </div>
          </div>

          <div class="form-row">
            <div class="input-data">
              <input type="text" required />
              <div class="underline"></div>
              <label for="">Email</label>
            </div>
          </div>



          <div class="form-row">
            <div class="input-data">
              <input type="text" required />
              <div class="underline"></div>
              <label for="">Link to Your Video</label>
            </div>
          </div>



          <div class="form-row">
            <div class="input-data">
              <div class="underline"></div>
              <label class="form-label" for="customFile">Upload Your video (Some thing about you)</label><br />
              <input type="file" class="form-control" accept="video/*" onChange={handleVideoUpload} />
            </div>
          </div>

          <br />

          <div class="form-row">
            <div class="input-data">
              <div class="underline"></div>
              <label class="form-label" for="customFile">Upload Your recently taken photo</label><br />
              <input type="file" class="form-control" accept="image/*" onChange={handleImageUpload} />
            </div>
          </div>

          <br />

          <div class="form-row">
            <div class="input-data">
              <div class="underline"></div>
              <label class="form-label" for="customFile">Upload Your CV</label><br />
              <input type="file" class="form-control" id="customFile" />
            </div>
          </div>

          <br />


          <br />

          <div className='form-raw'>
            <div className='input-data'>
              {displayVerificationResult()}
              {displayProgressBar()}
            </div>
          </div>


          <div className="form-row submit-btn">
            <div className="input-data">
              <div className="inner"></div>
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
