import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import axios from "axios"; // Import Axios

import './Audio.css';

const Audio = () => {
  const [dubAudioData, setDubAudioData] = useState('');
  const [orgAudioData, setOrgAudioData] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg,setMsg]=React.useState('');


  useEffect(() => {
    fetchDubAudioData(); // Fetch audio file on component mount
    fetchOrgAudioData(); // Fetch audio file on component mount
  }, []);

    const fetchDubAudioData = () => {
    setLoading(true);
    axios.get('http://127.0.0.1:5000/get-trans-audio', { responseType: 'arraybuffer' })
      .then(response => {
        const base64Data = btoa(new Uint8Array(response.data).reduce((data, byte) => {
          return data + String.fromCharCode(byte);
        }, ''));
        setDubAudioData(base64Data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was a problem with the request:', error);
        setLoading(false);
      });
  };
    const fetchOrgAudioData = () => {
    setLoading(true);
    axios.get('http://127.0.0.1:5000/ret_audiomp3', { responseType: 'arraybuffer' })
      .then(response => {
        const base64Data = btoa(new Uint8Array(response.data).reduce((data, byte) => {
          return data + String.fromCharCode(byte);
        }, ''));
        setOrgAudioData(base64Data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was a problem with the request:', error);
        setLoading(false);
      });
  };
const AudioPlayer = ({ audioData }) => {
  return (
    <audio controls>
      <source src={`data:audio/wav;base64,${audioData}`} type="audio/wav" />
      Your browser does not support the audio element.
    </audio>
  );
};

  const handleClick = () => {
    setMsg(!msg);
  }

  return (
    <div style={{ marginTop: '50px' }}>
      <div className="hea2">
        <b style={{ fontSize: '150%' }}>Audio</b>
      </div>
      <br />

      <div className="ado">
        <div className="ado1">
          <h3>Original</h3>
          {/* <button onClick={fetchOrgAudioData} disabled={loading}>
         {loading ? 'Loading...' : 'Fetch Audio'}
       </button> */}
       {loading ? (
        <p>Loading...</p>
      ) : (
        <AudioPlayer audioData={orgAudioData} />
      )}
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className="ado2">
          <h3>Dubbed</h3>
          {/* <button onClick={fetchDubAudioData} disabled={loading}> */}
         {/* {loading ? 'Loading...' : 'Fetch Audio'} */}
       {/* </button> */}
       {loading ? (
        <p>Loading...</p>
      ) : (
        <AudioPlayer audioData={dubAudioData} />
      )}
          {/* <audio controls>
            <source src={audioFile} type="audio/mp3" />
            Your browser does not support the audio tag.
          </audio> */}
        </div>
      </div>

    </div>
  )
}

export default Audio;
