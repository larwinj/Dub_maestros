import React, { useState } from 'react';
import axios from 'axios';

const LoadingGif = () => (
  <div>
    <h2>Loading...</h2>
    <img src="C:\Users\Raviselvam\Downloads\download.gif" alt="Buffering..." />
    {/* Use the correct path to your GIF file */}
  </div>
);

const VideoPlayer = ({ videoSrc }) => (
  <div>
    <h2>Video Player</h2>
    <video controls width="500" height="300">
      <source src={videoSrc} type="video/mp4" />
    </video>
  </div>
);

const VideoUploader = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedVideo(file);
    }
  };

  const handleSendClick = () => {
    if (selectedVideo) {
      setLoading(true);

      const formData = new FormData();
      formData.append('video', selectedVideo);

      axios.post('https://1e10-2409-4055-4e0c-e6f0-3c83-fc5a-5f1b-6832.ngrok-free.app/video_dub', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob',
      })
        .then(response => {
          const videoBlob = new Blob([response.data], { type: 'video/mp4' });
          const url = URL.createObjectURL(videoBlob);
          setResponse(url);
        })
        .catch(error => {
          console.error('Error uploading video:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div>
      <h1>Video Uploader</h1>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      {selectedVideo && <VideoPlayer videoSrc={URL.createObjectURL(selectedVideo)} />}
      <button onClick={handleSendClick}>Send Video</button>
      {loading && <LoadingGif />}
      {response && !loading && <VideoPlayer videoSrc={response} />}
    </div>
  );
};

export default VideoUploader;