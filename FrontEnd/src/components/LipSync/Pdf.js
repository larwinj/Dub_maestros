  import React, { useState, useEffect } from 'react';
  import axios from 'axios';

  const Pdf = () => {
    const [pdfData, setPdfData] = useState('');
    const [loading, setLoading] = useState(false);
  
    const fetchData = () => {
      setLoading(true);
      axios.get('http://127.0.0.1:5000/get-text-pdf', { responseType: 'arraybuffer' })
        .then(response => {
          const base64Data = btoa(new Uint8Array(response.data).reduce((data, byte) => {
            return data + String.fromCharCode(byte);
          }, ''));
          setPdfData(base64Data);
          setLoading(false);
        })
        .catch(error => {
          console.error('There was a problem with the request:', error);
          setLoading(false);
        });
    };
  
    useEffect(() => {
      fetchData();
    }, []);
    
    return (
      <div>
        <h1>Flask Server PDF</h1>
        <button onClick={fetchData} disabled={loading}>
          {loading ? 'Loading...' : 'Fetch PDF'}
        </button>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <iframe title="PDF Viewer" src={`data:application/pdf;base64,${pdfData}`} style={{ width: '100%', height: '600px', background:"white" }}></iframe>
        )}
      </div>
    );
  };

  export default Pdf;


//   import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AudioPlayer = ({ audioData }) => {
//   return (
//     <audio controls>
//       <source src={`data:audio/wav;base64,${audioData}`} type="audio/wav" />
//       Your browser does not support the audio element.
//     </audio>
//   );
// };

// const Pdf = () => {
//   const [audioData, setAudioData] = useState('');
//   const [loading, setLoading] = useState(false);

//   const fetchAudioData = () => {
//     setLoading(true);
//     axios.get('http://127.0.0.1:5000/get-trans-audio', { responseType: 'arraybuffer' })
//       .then(response => {
//         const base64Data = btoa(new Uint8Array(response.data).reduce((data, byte) => {
//           return data + String.fromCharCode(byte);
//         }, ''));
//         setAudioData(base64Data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('There was a problem with the request:', error);
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     fetchAudioData();
//   }, []);

//   return (
//     <div>
//       <h1>Transcription Audio</h1>
//       <button onClick={fetchAudioData} disabled={loading}>
//         {loading ? 'Loading...' : 'Fetch Audio'}
//       </button>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <AudioPlayer audioData={audioData} />
//       )}
//     </div>
//   );
// };

// export default Pdf;
