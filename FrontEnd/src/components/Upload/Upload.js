import React, { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Videos from './Videos';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import EastIcon from '@mui/icons-material/East';
import { Radio, RadioGroup } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import Props from 'react';
import Video from '../Staticrightvideo/Video';
import Editor from '../editor/Editor';
import Subtitle from '../Subtitle.js/Subtitle';
import bimage from './bimage.png';
import './Upload.css';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const Upload = ({ setIsSelect, setSelectedButtonText, setPassVideoSrc, setUtubeUrl, setDub }) => {

  const [selectedSource, setSelectedSource] = useState('english');
  const [selectedDestination, setSelectedDestination] = useState('english');
  const [isGenerateButtonEnabled, setIsGenerateButtonEnabled] = useState(false);
  const [dubSrc, setDubSrc] = React.useState(null);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [videoSrc, setVideoSrc] = useState('');
  const fileInputRef = useRef(null);
  const [open, setOpen] = React.useState(false);
  const [selectedVoice, setSelectedVoice] = useState('');
  const [url, setUrl] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleSourceChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedSource(selectedValue);
  };

  const handleDestinationChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedDestination(selectedValue);
    updateGenerateButtonState(event.target.value, selectedVoice);
  };


  const handleVoiceChange = (event) => {
    setSelectedVoice(event.target.value);
    updateGenerateButtonState(selectedDestination, event.target.value);
  };

  const updateGenerateButtonState = (destination, voice) => {
    setIsGenerateButtonEnabled(!!destination && !!voice);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleOut = () => {
    setOpen(false);
  };

  const handleClose = () => {
    setPassVideoSrc(videoSrc);
    setUtubeUrl(youtubeUrl);
    setDub(output);
    setSelectedButtonText('Subtitle');
    setIsSelect(true);
    // handleDub()
  };
  const handleDub = () => {
    console.log("Response: " + output);
    setPassVideoSrc(videoSrc);
    setUtubeUrl(youtubeUrl);
    setDub(videoSrc);
  };

  const getButtonStyle = {
    backgroundColor: "#FB2576",
    color: "white",
    border: 'none',
    borderRadius: '5px',
    padding: '8px 12px',
    cursor: 'pointer',
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleVideoFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleVideoFile(file);
    setSelectedVideo(file);
  };
  const inputRef = useRef(null);

  const handleUrlKeyDown = () => {
    setYoutubeUrl(inputRef.current.value);
  }


  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleVideoFile = (file) => {
    if (file.type.startsWith('video/')) {
      const videoURL = URL.createObjectURL(file);
      const tempVideo = document.createElement('video');
      tempVideo.src = videoURL;
      tempVideo.onloadedmetadata = () => {
        setVideoSrc(videoURL);
      };
    } else {
      alert('Please upload a valid video file!');
    }
  };


  const handleSendClick = () => {
    setLoading(true);
    console.log("--" + youtubeUrl);
    if (youtubeUrl) {
      const formData = new FormData();
      formData.append('url', youtubeUrl);
      formData.append('src', selectedSource);
      formData.append('dest', selectedDestination);
      formData.append('voice', selectedVoice);
      console.log(formData);
      axios.post('http://127.0.0.1:5000/y_dub', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob',
      })
        .then(output => {
          console.log(output.data);
          const videoBlob = new Blob([output.data], { type: 'video/mp4' });
          const url = URL.createObjectURL(videoBlob);
          setOutput(url);
          console.log(output);
          setLoading(false);
          handleClose();
          // renderVideoContent1();
        })
        .catch(error => {
          console.error('Error uploading video:', error);
        });
    } else if (selectedVideo) {
      const formData = new FormData();

      formData.append('video', selectedVideo);
      formData.append('src', selectedSource);
      formData.append('dest', selectedDestination);
      formData.append('voice', selectedVoice);

      console.log("FormData : "+formData);

      axios.post('http://127.0.0.1:5000/video_dub', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob',
      })
        .then(output => {
          console.log(output.data);

          const videoBlob = new Blob([output.data], { type: 'video/mp4' });
          const url = URL.createObjectURL(videoBlob);

          setOutput(url);
          setDubSrc(output);
          setDub(output);
          console.log("URL:"+url);
          console.log("Response: " + output);
          setLoading(false);
          handleClose();
          // renderVideoContent1();
        })
        .catch(error => {
          console.error('Error uploading video:', error);
        });
    }
  };

  // const renderVideoContent1 = () => {
  //   if (videoSrc&&output) {
  //     console.log("Local: " + videoSrc);
  //     console.log("Response: " + output);
  //     setPassVideoSrc(videoSrc);
  //     console.log(videoSrc);
  //     setDub(videoSrc)
  //     return(
  //       <Video videoSrc={videoSrc} dubSrc={output}/>
  //     )
  //   }else if(youtubeUrl && !output){
  //     console.log("youtube: " + youtubeUrl);
  //     console.log("Response: " + output);
  //     setUtubeUrl(youtubeUrl);
  //     setDub(videoSrc);
  //   }
  // };


  const renderVideoContent2 = () => {
    if ((youtubeUrl || videoSrc)) {

      if (videoSrc) {
        console.log("local");
        return (
          <Videos videoSrc={videoSrc} style={{ height: '200px', width: '200px' }} />
        );
      }
      else {
        console.log("youtube");
        return (
          <Videos url={youtubeUrl} controls width="200px" height="200px" />
        );
      }
    } else {
      console.log("else");
      return (
        <div>
          <br />
          <form onSubmit={handleUrlKeyDown} style={{ borderRadius: '15px', backgroundColor: '	#36454F', width: 'inherit', display: 'flex', alignItems: 'center', border: '1px solid black', padding: '5px', marginRight: '22%', marginLeft: '20%' }}>
            <input
              ref={inputRef}
              type='text'
              required
              style={{ padding: '8px', borderRadius: '10px', border: 'none', width: '100%', marginRight: '5px', color: 'white', backgroundColor: '	#36454F' }}
            />
            <button type="submit" style={{ padding: '6px', borderRadius: '10px', background: '#D66D75', color: '#fff', border: '1px solid #007bff', cursor: 'pointer', width: '25%' }}>
              Go
            </button>
          </form>


          <br />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '40%', borderBottom: '1px solid black', marginRight: '10px' }}></div>
            <span style={{ color: '#777', fontSize: '14px' }}>OR</span>
            <div style={{ width: '40%', borderBottom: '1px solid black', marginLeft: '10px' }}></div>
          </div>
          <br />
          <div style={{
            border: '2px solid black',
            borderRadius: '10px',
            margin: '15px 15px 15px 15px',

          }}><br/>
            <p style={{ color: 'black' }}>Drag & Drop video file here</p>
            <input
              type="file"
              accept="video/*"
              onChange={handleFileInputChange}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
            <p onClick={handleUploadButtonClick} style={{ color: 'silver' }}>
              <FileUploadIcon style={{ width: '100px', height: '100px', color: '#555555' }} /><br />
              <button style={getButtonStyle}>Upload Video</button><br/>
            </p>
          </div>

        </div>
      );
    }
  };

  return (
    <div style={{
      width: '100%',
      height: '75vh',
    }}>
      <div
        style={{
          border: '2px  #fb2576',
          borderRadius: '10px',
          boxShadow: 'rgba(0, 0, 0, 0.26) 5px 5px 5px 5px',
          textAlign: 'center',
          width: '45%',
          height: '60vh',
          marginLeft: '25%',
          marginTop: '10%',
          color: '#fff',
          background: 'rgba(255,255,255,.4)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {/* <img src={bimage}/> */}
        {renderVideoContent2()}
      </div>
      <br />
      <Button
        style={{
          backgroundColor: '#FB2576',
          color: 'white',
          marginLeft: '63%',
          marginRight: 'auto',
          display: 'block',
          position: 'inherit'
        }}
        onClick={handleClickOpen}
      >
        Generate
      </Button>

      <BootstrapDialog
        onClose={handleOut}
        aria-labelledby="customized-dialog-title"
        open={open}
        className='dialog'
      >
        <IconButton
          aria-label="close"
          onClick={handleOut}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        {loading ? (
      <div><iframe src="https://giphy.com/embed/teJYxHEPuPe5G" width="480" height="360" frameBorder="0" ></iframe> </div>
      ) : (
        <div>
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Customise
          </DialogTitle>
        <DialogContent dividers>
        <select
          label="Source"
          style={{ padding: '7px', borderRadius: '7px' }}
          value={selectedSource}
          onChange={handleSourceChange}
        >
          <option value="">Select Source Language:English</option>
          <option value="tamil">Tamil</option>
          <option value="hindi">Hindi</option>
          <option value="telugu">Telugu</option>
          <option value="telugu">Urdu</option>
          <option value="malayalam">Malayalam</option>
          <option value="rajasthani">Rajasthani</option>
          <option value="bengali">Bengali</option>
          <option value="gujarathi">Gujarathi</option>
          <option value="kanada">Kanada</option>
          <option value="manipuri">Manipuri</option>
        </select>
        <select
          label="Destination"
          style={{ padding: '7px', borderRadius: '7px' }}
          value={selectedDestination}
          onChange={handleDestinationChange}
        >
          <option value="">Select Target Language:English</option>
          <option value="tamil">Tamil</option>
          <option value="hindi">Hindi</option>
          <option value="telugu">Telugu</option>
          <option value="malayalam">Malayalam</option>
          <option value="rajasthani">Rajasthani</option>
          <option value="bengali">Bengali</option>
          <option value="gujarathi">Gujarathi</option>
          <option value="kanada">Kanada</option>
          <option value="manipuri">Manipuri</option>
        </select>
        <br /><br /><hr />
        <b>Voice</b><br />
        <RadioGroup name="voice" value={selectedVoice} onChange={handleVoiceChange}>
          <FormControlLabel
            value="male"
            control={<Radio />}
            label="Male"
          />
          <FormControlLabel
            value="female"
            control={<Radio />}
            label="Female"
          />
          <FormControlLabel
            value="alien"
            control={<Radio />}
            label="Alien"
          />
        </RadioGroup>
        <br /><br />
        <Button style={{ backgroundColor: '#FB2576', color: 'black', marginLeft: '35%' }} onClick={() => { handleSendClick();}} disabled={!isGenerateButtonEnabled}>Generate</Button>

      </DialogContent>
      </div>
      )}
       
      </BootstrapDialog>
    </div>
  );
};

export default Upload;
// import React, { useState, useRef } from 'react';
// import FileUploadIcon from '@mui/icons-material/FileUpload';
// import Videos from './Videos';
// import Button from '@mui/material/Button';
// import { styled } from '@mui/material/styles';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
// import Typography from '@mui/material/Typography';
// import axios from 'axios';
// // import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import EastIcon from '@mui/icons-material/East';
// import { Radio, RadioGroup } from '@mui/material';
// import { FormControlLabel } from '@mui/material';
// import Props from 'react';
// import Video from '../Staticrightvideo/Video';
// import './Upload.css';
// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//   '& .MuiDialogContent-root': {
//     padding: theme.spacing(2),
//   },
//   '& .MuiDialogActions-root': {
//     padding: theme.spacing(1),
//   },
// }));

// const Upload = ({ setIsSelect,setSelectedButtonText,setPassVideoSrc,setUtubeUrl,setDub}) => {

//   const [selectedSource, setSelectedSource] = useState('english');
//   const [selectedDestination, setSelectedDestination] = useState('');

//   const handleSourceChange = (event) => {
//     const selectedValue = event.target.value;
//     setSelectedSource(selectedValue);
//   };

//   const handleDestinationChange = (event) => {
//     const selectedValue = event.target.value;
//     setSelectedDestination(selectedValue);
//   };

//   const [dubSrc, setDubSrc] = React.useState(null);
//   const [youtubeUrl, setYoutubeUrl] = useState('');
//   const [videoSrc, setVideoSrc] = useState('');
//   const fileInputRef = useRef(null);
//   const [open, setOpen] = React.useState(false);
//   const [selectedVoice, setSelectedVoice] = useState('');
//   const [url,setUrl]=useState('');

//   const handleVoiceChange = (event) => {
//     setSelectedVoice(event.target.value);
//   };

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const getButtonStyle = {
//     backgroundColor:"#FB2576",
//     color:"white",
//     border: 'none',
//     borderRadius: '5px',
//     padding: '8px 12px',
//     cursor: 'pointer',
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     const file = e.dataTransfer.files[0];
//     handleVideoFile(file);
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//   };

//   const handleFileInputChange = (e) => {
//     const file = e.target.files[0];
//     handleVideoFile(file);
//     setSelectedVideo(file);
//   };
//   const handleUrlChange = (event) => {
//     event.preventDefault()
//     setYoutubeUrl(event.target.value);
//   }

//   const handleUploadButtonClick = () => {
//     fileInputRef.current.click();
//   };

//   const handleVideoFile = (file) => {
//     if (file.type.startsWith('video/')) {
//       const videoURL = URL.createObjectURL(file);
//       const tempVideo = document.createElement('video');
//       tempVideo.src = videoURL;
//       tempVideo.onloadedmetadata = () => {
//         setVideoSrc(videoURL);
//       };
//     } else {
//       alert('Please upload a valid video file!');
//     }
//   };

//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const [response, setResponse] = useState(null);

//   const handleSendClick = () => {
//     console.log("--"+youtubeUrl);
//     if (youtubeUrl) {
//       const formData = new FormData();
//       formData.append('url', youtubeUrl);
//       formData.append('src', selectedSource);
//       formData.append('dest', selectedDestination);
//       formData.append('voice', selectedVoice);
//       console.log(formData);
//       axios.post('http://127.0.0.1:5000/y_dub', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         responseType: 'blob',
//       })
//         .then(response => {
//           console.log(response.data);
//           const videoBlob = new Blob([response.data], { type: 'video/mp4' });
//           const url = URL.createObjectURL(videoBlob);
//           setResponse(url);
//           console.log(response);
//           setUtubeUrl(youtubeUrl);
//          setDub(response);
//         })
//         .catch(error => {
//           console.error('Error uploading video:', error);
//         });
//     } else if (selectedVideo) {
//       const formData = new FormData();
//       formData.append('video', selectedVideo);
//       formData.append('src', selectedSource);
//       formData.append('dest', selectedDestination);
//       formData.append('voice', selectedVoice);
//       console.log(formData);
//       axios.post('http://127.0.0.1:5000/video_dub', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         responseType: 'blob',
//       })
//         .then(response => {
//           console.log(response.data);

//           const videoBlob = new Blob([response.data], { type: 'video/mp4' });
//           const url = URL.createObjectURL(videoBlob);

//           setResponse(url);
//           console.log(response);
          
//          setPassVideoSrc(videoSrc);
//          setDub(response);
//          renderVideoContent1();
//         })
//         .catch(error => {
//           console.error('Error uploading video:', error);
//         });
//     }
//   };
  
//   const renderVideoContent1 = () => {
//     if ((youtubeUrl||videoSrc) && !response) {
//       if(videoSrc){
//         console.log("vidsrc");
//       return (
//         <Videos videoSrc={videoSrc} temp='hello' style={{ height: '200px', width: '200px' }} />
//       );}
//       else{
//         return (
//           <Videos url={youtubeUrl} controls width="400px" height="300px" />
//         );
//       }
//     } else if ((youtubeUrl||videoSrc) && response) {
//       console.log("resp");
//       return (
//         <Videos videoSrc={videoSrc} dubSrc={response} style={{ height: '200px', width: '200px' }} />
//       );
//     } else {
//       console.log("else");
//       return (
//         <div>
//           <br /><br /><br />
//           <input
//             placeholder="Url here"
//             style={{
//               border: '2px solid black',
//               borderRadius: '3px',
//               width: '400px',
//               height: '30px',
//               marginLeft: '0px',
//               padding: '5px',
//               color: 'black',
//             }}
//             onChange={handleUrlChange}
//             value={youtubeUrl} 
//           />       
//           <p style={{ color: 'black' }}>Drag & Drop video file here or</p>
//           <input
//             type="file"
//             accept="video/*"
//             onChange={handleFileInputChange}
//             ref={fileInputRef}
//             style={{ display: 'none' }}
//           />
//           <p onClick={handleUploadButtonClick} style={{ color: 'silver' }}>
//             <FileUploadIcon style={{ width: '100px', height: '100px', color: '#555555' }} /><br />
//             <button style={getButtonStyle}>Upload Video</button>
//           </p>
//         </div>
//       );
//     }
//   };

//   return (
//     <div style={{ 
//                 width:'100%',
//                 height:'75vh',
//                 }}>
//       <div
//         style={{
//           border: '2px  #fb2576',
//           borderRadius: '10px',
//           boxShadow: 'rgba(0, 0, 0, 0.26) 5px 5px 5px 5px',
//           textAlign: 'center',
//           width: '45%',
//           height:'60vh',
//           marginLeft:'25%',
//           marginTop:'10%',
//           color: '#fff',
//   background: 'rgba(255,255,255,.4)',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//         onDrop={handleDrop}
//         onDragOver={handleDragOver}
//       >
//         {/* <img src={bimage}/> */}
//         {renderVideoContent1()}
//       </div>
//       <br/>
//       <Button 
//   style={{ 
//     backgroundColor: '#FB2576', 
//     color: 'white', 
//     marginLeft: '63%', 
//     marginRight: 'auto',
//     display: 'block',
//     position: 'inherit' 
//   }} 
//   onClick={handleClickOpen}
// >
//   Generate
// </Button>

//       <BootstrapDialog
//         onClose={handleClose}
//         aria-labelledby="customized-dialog-title"
//         open={open}
//         className='dialog'
//       >
//         <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
//           Customise
//         </DialogTitle>
//         <IconButton
//           aria-label="close"
//           onClick={handleClose}
//           sx={{
//             position: 'absolute',
//             right: 8,
//             top: 8,
//             color: (theme) => theme.palette.grey[500],
//           }}
//         >
//           <CloseIcon />
//         </IconButton>
//         <DialogContent dividers>
//         <select
//         label="Source Language"
//         style={{ marginRight: '10px', padding: '7px', borderRadius: '7px' }}
//       >
//         <option value="">Source Language: English</option>
//       </select>
//       <select
//         label="Destination"
//         style={{ padding: '7px', borderRadius: '7px' }}
//         value={selectedDestination}
//         onChange={handleDestinationChange}
//       >
//             <option value="">Select Target Language</option>
//             <option value="tamil">Tamil</option>
//             <option value="hindi">Hindi</option>
//             <option value="telugu">Telugu</option>
//             <option value="malayalam">Malayalam</option>
//             <option value="rajasthani">Rajasthani</option>
//             <option value="bengali">Bengali</option>
//             <option value="gujarathi">Gujarathi</option>
//             <option value="kanada">Kanada</option>
//             <option value="manipuri">Manipuri</option>
//           </select>
//           <br /><br /><hr />
//           <b>Voice</b><br />
//           <RadioGroup name="voice" value={selectedVoice} onChange={handleVoiceChange}>
//             <FormControlLabel
//               value="male"
//               control={<Radio />}
//               label="Male"
//             />
//             <FormControlLabel
//               value="female"
//               control={<Radio />}
//               label="Female"
//             />
//             <FormControlLabel
//               value="alien"
//               control={<Radio />}
//               label="Alien"
//             />
//           </RadioGroup>
//           <br /><br />
//           <Button  style={{ backgroundColor: '#FB2576', color: 'black', marginLeft: '35%' }} onClick={()=>{handleClose();handleSendClick();}}>Generate</Button>
          
//         </DialogContent>
//       </BootstrapDialog>
//     </div>
//   );
//         };

// export default Upload;