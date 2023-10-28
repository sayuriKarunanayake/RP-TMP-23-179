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

  return (


    <div>
      <div style={containerStyle}>
        <div style={textStyle}>Apply Here!</div>

        <form action="#">
          <div style={formRowStyle}>
            <div style={{ ...inputStyle, marginRight: '20px' }}>
              <input type="text" required />
              <div style={underlineStyle}></div>
              <div style={labelStyle}>Full Name</div>
            </div>
            <div style={inputStyle}>
              <input type="text" required />
              <div style={underlineStyle}></div>
              <div style={labelStyle}>Phone Number</div>
            </div>
          </div>

          <div style={formRowStyle}>
            <div style={inputStyle}>
              <input type="text" required />
              <div style={underlineStyle}></div>
              <div style={labelStyle}>Email</div>
            </div>
          </div>

          <div style={formRowStyle}>
            <div style={inputStyle}>
              <input type="text" required />
              <div style={underlineStyle}></div>
              <div style={labelStyle}>Link to Your Video</div>
            </div>
          </div>

          <div style={formRowStyle}>
            <div style={inputStyle}>
              <div style={underlineStyle}></div>
              <label>Upload Your video (Something about you)</label><br />
              <input type="file" accept="video/*" onChange={(e) => handleVideoUpload(e)} />
            </div>
          </div>

          <div style={formRowStyle}>
            <div style={inputStyle}>
              <div style={underlineStyle}></div>
              <label>Upload Your recently taken photo</label><br />
              <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e)} />
            </div>
          </div>

          <div style={formRowStyle}>
            <div style={inputStyle}>
              <div style={underlineStyle}></div>
              <label>Upload Your CV</label><br />
              <input type="file" id="customFile" />
            </div>
          </div>

          <div className="form-row submit-btn">
            <div style={{ ...inputStyle, overflow: 'hidden', height: '45px' }}>
              <div style={innerButtonStyle}></div>
              <input
                type="submit"
                value="Submit"
                onClick={onVerifyClick}
                style={{ ...inputStyle, background: 'none', border: 'none', color: '#fff', fontSize: '17px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer', position: 'relative', zIndex: '2' }}
              />
            </div>
          </div>
        </form>
      </div>
    </div>


  );
}

export default UploadForm;
