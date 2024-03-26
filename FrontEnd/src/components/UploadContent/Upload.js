import React, { useState } from 'react';
import 'D:/SihReact/tryingss/video-anno/src/Assets/Upload1.css';

const UploadPopup = ({ onClose }) => {
  const [sourceLanguage, setSourceLanguage] = useState('');
  const [destinationLanguage, setDestinationLanguage] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleGenerateVideo = () => {
    // Add logic to generate video using selected options, YouTube URL, and selected file
    console.log('Generating video...');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <h2 style={{fontFamily:'cursive'}}>Upload Options</h2>

        {/* <div className="chofi">
          <label htmlFor="fileInput">Choose File:</label>
          <input type="file" id="fileInput" onChange={handleFileChange} />
          <button onchange={handleFileChange}>Select file</button>
        </div>   */}
        <div className="chofi">
  <label htmlFor="fileInput"></label>
  <div className="file-input-container">
    <input
      type="file"
      id="fileInput"
      onChange={handleFileChange}
      style={{ display: 'none' }}
    />
    <button onClick={() => document.getElementById('fileInput').click()}>
      Select File
    </button>
  </div>
</div>

          <br></br>
        <div>
          <label htmlFor="youtubeUrl" style={{fontFamily:'cursive'}}>YouTube URL:</label>
          <input type="text" id="youtubeUrl" value={youtubeUrl} onChange={(e) => setYoutubeUrl(e.target.value)} className="utu"/>
        </div>

        <hr />
        
        <div className="chofii">
          <div>
            <label htmlFor="sourceLanguage" className="sel2 "><h3>Source Language:</h3></label>
            <select id="sourceLanguage" value={sourceLanguage} onChange={(e) => setSourceLanguage(e.target.value)} className="sel1">
              <option value="english">English</option>
              <option value="Punjabi">Punjabi</option>
              <option value="gujarati">Gujarati</option>
              <option value="marathi">Marathi</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="destinationLanguage" className="sel1"><h3>Destination Language:</h3></label>
            <select id="destinationLanguage" value={destinationLanguage} onChange={(e) => setDestinationLanguage(e.target.value)} className="sel2">
            <option value="Punjabi">Punjabi</option>
              <option value="gujarati">Gujarati</option>
              <option value="marathi">Marathi</option>
              <option value="Tamil">Tamil</option>
              <option value="Malayalam">Malayalam</option>
            </select>
          </div>
        </div>

        <hr />
        <div className="atlas">
        <div >
          <button onClick={onClose} >Back</button>
        </div>
        <div>
          <button onClick={handleGenerateVideo} style={{marginLeft:'205px'}}>Generate Video</button>
        </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [popupVisible, setPopupVisible] = useState(false);

  const handleUploadButtonClick = () => {
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  return (
    <div>
      <button onClick={handleUploadButtonClick}>Upload</button>
      {popupVisible && <UploadPopup onClose={handleClosePopup} />}
    </div>
  );
};

export default App;