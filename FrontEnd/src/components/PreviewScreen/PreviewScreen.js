import React, { useState } from "react";
import "./PreviewScreen.css"; // Import a CSS file for styling
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import videoUrl from './s_output.mp4';
const PreviewScreen = () => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(!open);
  };

  return (
    <div>
      {open && (
        <div className="preview-dialog-content">
          <button onClick={handleClose} className="close-button">
            <HighlightOffRoundedIcon/>
          </button>
          <div>
            {/* Video element to display the video */}
            <video controls width="100%" height="10%">
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewScreen;
