import React from "react";
import { Button } from "@mui/material";
import video2 from "./lipsync.mp4";
import  ".//VSummary.css";
const VSummary=()=>{
    const [isEnabled, setIsEnabled] = React.useState(true);

  const handleClick = () => {
    setIsEnabled(!isEnabled);
  };
    return(
        <div style={{ marginTop: '50px' }}>
      <div className='hea1'>
        <b style={{fontSize:'150%'}}>Video Summary</b>
        <Button onClick={handleClick} variant='contained'
       sx={{
         backgroundColor: "#FB2576",
         marginLeft: '45%',
          '&:hover': {
           backgroundColor: "#fb`0055", // Change this to the color you want on hover
           },
          }}> {isEnabled ? 'Enable' : 'Disable'}</Button>
      </div>
      <br/>
      {!isEnabled&&
      <div className='vdo1'>
              <video
                src={video2}
                controls
                
              />
      </div>
}
    </div>
  );
}
export default VSummary;