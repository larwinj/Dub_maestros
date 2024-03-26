import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import * as React from 'react';
import video2 from "./lipsync.mp4"
import './LipSync.css';
// import 'C:/Users/nkous/Desktop/SihApp/app1/src/components/LipLipsync.css';

import { useState } from 'react';
import  { useEffect } from 'react';
import axios from 'axios';
import Pdf from '../../components/LipSync/Pdf';


const LipSync = () => {

  // const [isEnabled, setIsEnabled] = useState(true);

  // const handleClick = () => {
  //   setIsEnabled(!isEnabled);
  // };

  // return (
  //   <div style={{ marginTop: '50px' }}>
  //     {/* <div className='hea'>
  //       <b style={{ fontSize: '150%' }}>LIPSYNC</b>
  //       <Button onClick={handleClick} variant='contained'
  //         sx={{
  //           backgroundColor: "#FB2576",
  //           marginLeft: '35%',
  //           '&:hover': {
  //             backgroundColor: "#fb`0055", // Change this to the color you want on hover
  //           },
  //         }}> {isEnabled ? 'Enable' : 'Disable'}</Button>
  //     </div>
  //     <br />
  //     {!isEnabled &&
  //       <div className='vdo'>
  //         <video
  //           src={video2}
  //           controls

  //         />
  //       </div>
  //     } */}
  //   <PDF/>
  //   </div>
  // );

  // const [pdfData, setPdfData] = useState('');
  // const [loading, setLoading] = useState(false);

  // const fetchData = () => {
  //   setLoading(true);
  //   axios.get('http://127.0.0.1:5000/get-text-pdf', { responseType: 'arraybuffer' })
  //     .then(response => {
  //       const base64Data = btoa(new Uint8Array(response.data).reduce((data, byte) => {
  //         return data + String.fromCharCode(byte);
  //       }, ''));
  //       setPdfData(base64Data);
  //       setLoading(false);
  //     })
  //     .catch(error => {
  //       console.error('There was a problem with the request:', error);
  //       setLoading(false);
  //     });
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <div>
      {/* <h1>Flask Server PDF</h1>
      <button onClick={fetchData} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch PDF'}
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <iframe title="PDF Viewer" src={`data:application/pdf;base64,${pdfData}`} style={{ width: '100%', height: '600px', background:"white" }}></iframe>
      )} */}
      <Pdf/>
    </div>
  );
};

export default LipSync;