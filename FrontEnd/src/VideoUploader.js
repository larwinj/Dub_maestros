import React, { useState } from 'react';
import axios from 'axios';

const VideoPlayer = ({ videoSrc }) => {
  return (
    <div>
      <h2>Video Player</h2>
      <video controls width="500" height="300">
        <source src={videoSrc} type="video/mp4" />
      </video>
    </div>
  );
};

// const AudioPlayer = ({ audioSrc }) => {
//   return (
//     <div>
//       <h2>Audio Player</h2>
//       <audio controls>
//         <source src={audioSrc} type="audio/mp3" />
//       </audio>
//     </div>
//   );
// };

const AudioPlayer = ({ audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.createRef();

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <h2>Audio Player</h2>
      <audio ref={audioRef} controls>
        <source src={audioSrc} type="audio/mp3" />
      </audio>
      <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
    </div>
  );
};

const VideoUploader = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [response, setResponse] = useState(null);
  // const [audioSrc, setAudioSrc] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedVideo(file);
    }
  };

  const handleSendClick = () => {
    if (selectedVideo) {
      const formData = new FormData();
      formData.append('video', selectedVideo);

      axios.post('https://1e10-2409-4055-4e0c-e6f0-3c83-fc5a-5f1b-6832.ngrok-free.app/video_dub', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob',  // Move this line outside the headers object
      })
        .then(response => {
          console.log(response.data);
          const videoBlob = new Blob([response.data], { type: 'video/mp4' });
          const url = URL.createObjectURL(videoBlob);
          setResponse(url);
        })
        .catch(error => {
          console.error('Error uploading video:', error);
        });
    }
  };

  return (
    <div>
      <h1>Video Uploader</h1>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      {selectedVideo && <VideoPlayer videoSrc={URL.createObjectURL(selectedVideo)} />}
      <button onClick={handleSendClick}>Send Video</button>
      {response && (<VideoPlayer videoSrc={response} />)}
      {/* {audioSrc && <AudioPlayer audioSrc={audioSrc} />} */}
    </div>
  );
};

export default VideoUploader;