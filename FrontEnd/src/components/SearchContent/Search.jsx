import React, { useState, useRef } from 'react';
import { IoMdCloseCircleOutline } from "react-icons/io";
import video from 'C:/My project/sihtem/ui/canva-clone/public/video.mp4';

const Search = () => {
  const videoPath = video;
  const timestamps = [
    { time: '0:30', message: 'Introduction' },
    { time: '2:15', message: 'Main topic' },
    // ... other timestamps
  ];

  const videoRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTimestamps, setFilteredTimestamps] = useState(timestamps);

  const handleTimestampClick = (timestamp) => {
    videoRef.current.currentTime = parseTimestamp(timestamp.time);
    videoRef.current.play();
  };

  const parseTimestamp = (timestamp) => {
    const [minutes, seconds] = timestamp.split(':');
    return parseInt(minutes) * 60 + parseInt(seconds);
  };

  const handleSearch = (event) => {
    const newSearchTerm = event.target.value.toLowerCase();
    setSearchTerm(newSearchTerm);

    const filtered = timestamps.filter(
      (timestamp) =>
        timestamp.message.toLowerCase().includes(newSearchTerm) ||
        timestamp.time.toLowerCase().includes(newSearchTerm)
    );

    setFilteredTimestamps(filtered);
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          height: 48,
          borderBottom: '1px solid rgba(57,76,96,.15)',
          padding: '0 20px',
          background: '#004e92'
        }}
      >
        <p
          style={{
            lineHeight: '48px',
            fontWeight: 600,
            color: '#6DD5FA',
            flexGrow: 1,
          }}
        >
          Search your part
        </p>
        <div
          style={{
            fontSize: 20,
            flexShrink: 0,
            width: 32,
            height: 32,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          // onClick={onClose}
        >
          <IoMdCloseCircleOutline style={{ color: '#6DD5FA' }} />
        </div>
      </div>
      <div style={{ backgroundColor: 'black' }}>
        <br></br>
        <input
          type="text"
          placeholder="Search timestamps and messages..."
          value={searchTerm}
          onChange={handleSearch}
          style={{
            borderRadius: '6px',
            padding: '10px 24px',
            width: '300px',
            marginLeft: '33px',
            border: '1px solid #2F80ED',
            backgroundColor: 'inherit'
          }}
        />
        <br></br>
        <br></br>
        <video ref={videoRef} controls width="250" height="200" style={{ paddingLeft: "10px", width: '400px', height: '300px' }}>
          <source src={videoPath} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <br></br>
        <ul style={{ marginLeft: '85px', color: '#A83279', marginRight: '50px' }}>
          {filteredTimestamps.map((timestamp, index) => (
            <li key={index} onClick={() => handleTimestampClick(timestamp)}>
              <h2><strong>{timestamp.time}</strong>: {timestamp.message}</h2>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Search;