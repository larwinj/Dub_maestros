import React from "react";
import ReactPlayer from "react-player";
import { ToggleButton } from '@mui/material';
import Switch from '@mui/material/Switch';
import axios from "axios";
const Video = ({ videoSrc, videourl, dubSrc }) => {
  const [toggle, setToggle] = React.useState(false);
  const [output,setOutput]=React.useState('');
  const handleToggle = () => {
    setToggle(!toggle);
    axios.get('http://127.0.0.1:5000/final_dub', {
    responseType: 'blob',
})
    .then(response => {
        console.log(response.data);
        const videoBlob = new Blob([response.data], { type: 'video/mp4' });
        const url = URL.createObjectURL(videoBlob);
        setOutput(url);
        console.log(response);
    })
    .catch(error => {
        console.error('Error fetching video:', error);
    });

  }
  const label = { inputProps: { 'aria-label': 'Size switch demo' } };
  return (
    <div
      style={{
        position: 'relative',
        top: '20%',
        width: '80%',
        height: '80%',
        marginLeft: '10%',
      }}
    >
      <Switch {...label} defaultChecked onClick={handleToggle} />
      <div>
        {toggle && 

          <div>
            <h3>Dubbed</h3>
            <video controls width="100%" height="100%" src={output} />
          </div>}

        {!toggle && 
          (videoSrc ? (
            <div>
              <h3>Original</h3>
              <video controls width="100%" height="100%" src={videoSrc} />
            </div>
          ) : (
            videourl && (
              <div>
                <h3>Original</h3>
                <ReactPlayer
                  title="YouTube video"
                  width="100%"
                  height="100%"
                  src={videourl}
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
            )
          ))
        }
      </div>
      {/* <button onClick={handleToggle}/>
      <video controls width="100%" height="100%" src={output} /> */}
    </div >
  );
};

export default Video;
