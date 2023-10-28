import React, { useState } from 'react';

function UploadForm({ onImageUpload, onVideoUpload, verificationResult, headPosePercentage, onVerifyClick }) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [, setSelectedImage] = useState(null);
  const [, setSelectedVideo] = useState(null);

  const containerStyle = {
    maxWidth: '800px',
    background: '#fff',
    width: '800px',
    padding: '25px 40px 10px 40px',
    boxShadow: '0px 0px 10px rgba(0,0,0,0.1)'
  };

  const textStyle = {
    textAlign: 'center',
    fontSize: '41px',
    fontWeight: '600',
    fontFamily: 'Poppins, sans-serif',
    background: '-webkit-linear-gradient(right, #56d8e4, #9f01ea, #56d8e4, #9f01ea)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  };

  const inputStyle = {
    display: 'block',
    width: '100%',
    height: '100%',
    border: 'none',
    fontSize: '17px',
    borderBottom: '2px solid rgba(0,0,0,0.12)'
  };

  const formRowStyle = {
    display: 'flex',
    margin: '32px 0'
  };

  const underlineStyle = {
    position: 'absolute',
    bottom: '0',
    height: '2px',
    width: '100%'
  };

  const labelStyle = {
    position: 'absolute',
    pointerEvents: 'none',
    bottom: '10px',
    fontSize: '16px',
    transition: 'all 0.3s ease'
  };

  const underlineBeforeStyle = {
    position: 'absolute',
    content: '""',
    height: '2px',
    width: '100%',
    background: '#3498db',
    transform: 'scaleX(0)',
    transformOrigin: 'center',
    transition: 'transform 0.3s ease'
  };

  const innerButtonStyle = {
    height: '100%',
    width: '300%',
    position: 'absolute',
    left: '-100%',
    background: '-webkit-linear-gradient(right, #56d8e4, #9f01ea, #56d8e4, #9f01ea)',
    transition: 'all 0.4s'
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
