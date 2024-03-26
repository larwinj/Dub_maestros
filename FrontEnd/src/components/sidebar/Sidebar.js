// import * as React from 'react';
// import { styled, useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import MuiDrawer from '@mui/material/Drawer';
// import MuiAppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import CssBaseline from '@mui/material/CssBaseline';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import Editor from '../editor/Editor';
// import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
// import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
// import SubtitlesIcon from '@mui/icons-material/Subtitles';
// import "./Sidebar.css"
// import 'resize-observer-polyfill';
// import { Button, Link } from '@mui/material';
// import VolumeUpIcon from '@mui/icons-material/VolumeUp';
// import Tooltip from '@mui/material/Tooltip';
// import { TiPin } from "react-icons/ti";
// import { FaSyncAlt } from "react-icons/fa";
// import { MdTextFields } from "react-icons/md";
// import video from './s_output.mp4';
// // import { useState } from 'react';
// import PreviewScreen from '../PreviewScreen/PreviewScreen';
// import Upload from '../Upload/Upload';
// import bg from "./bg.jpg";
// import audioUrl from 'L:\\SIH\\on\\cmrfedub\\app1\\src\\components\\sidebar\\vt.mp3';
// import pdfUrl from "L:\\SIH\\on\\cmrfedub\\app1\\src\\components\\sidebar\\output_json.pdf";
// import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
// // import VolumeUpIcon from '@mui/icons-material/VolumeUp';
// import SummarizeIcon from '@mui/icons-material/Summarize';



// const ColorButton = styled(Button)(({ theme }) => ({
//   color: theme.palette.getContrastText("#FB2576"),
//   backgroundColor: "#FB2576",
//   '&:hover': {
//     backgroundColor: "pink",
//   },
// }));

// const drawerWidth = 240;

// const openedMixin = (theme) => ({
//   width: drawerWidth,
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: 'hidden',
// });

// const closedMixin = (theme) => ({
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: 'hidden',
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up('sm')]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },
// });

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'flex-end',
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
// }));

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(['width', 'margin'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     width: drawerWidth,
//     flexShrink: 0,
//     whiteSpace: 'nowrap',
//     boxSizing: 'border-box',
//     ...(open && {
//       ...openedMixin(theme),
//       '& .MuiDrawer-paper': openedMixin(theme),
//     }),
//     ...(!open && {
//       ...closedMixin(theme),
//       '& .MuiDrawer-paper': closedMixin(theme),
//     }),
//   }),
// );

// export default function Sidebar() {
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(false);
//   const [isselect, setIsSelect] = React.useState(false);
//   const [selectedButtonText, setSelectedButtonText] = React.useState('');
//   const [isLightMode, setIsLightMode] = React.useState(true);
//   const [activeButton, setActiveButton] = React.useState(null);
//   const [isModalOpen, setIsModalOpen] = React.useState(false);
//   const [content, setContent] = React.useState(null);
//   const [openDialog, setOpenDialog] = React.useState(false);
//   const [Utubeurl, setUtubeUrl] = React.useState('');
//   const [passvideoSrc, setPassVideoSrc] = React.useState('');
//   const [dub, setDub] = React.useState('');
//   const [selectedButton, setSelectedButton] = React.useState(null);

//   const handleBtnClick = (button) => {
//     setActiveButton(button);
//   };

//   const handleButtonClick = (text) => {
//     setIsSelect(true);
//     setSelectedButtonText(text);
//   };
//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   const openModal = () => {
//     setIsModalOpen(!isModalOpen);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setContent(null); // Reset content when modal closes
//   };

//   const handleModeToggle = () => {
//     setIsLightMode(!isLightMode); // Toggle the mode
//   };

//   React.useEffect(() => {

//     const defaultContent = (
//       <div>
//         <h4 className='format'>Download.MP3s file<DownloadForOfflineIcon /></h4>
//       </div>
//     );
//     setContent(defaultContent);
//   }, []);

//   const handleOptionClick = (type) => {
//     const iconStyle = { color: 'white', position: 'absolute', right: 0 }; // Define the common style
//     switch (type) {
//       case 'audio':
//         setContent(<div><h4 className='format'>Download.MP3s file<DownloadForOfflineIcon onClick={downloadAudio} style={{ color: 'white' }} />
//         </h4></div>);
//         break;
//       case 'video':
//         setContent(<div><h4 className='format'>Download.MP4 file<DownloadForOfflineIcon onClick={downloadVideo} /></h4></div>);
//         break;
//       // case 'subtitle':
//       //     setContent(<div><h4 className='format'>Download.SRT file<DownloadForOfflineIcon/></h4>
//       //     <h4 className='format'>Download.VTT file<DownloadForOfflineIcon /></h4></div>);
//       //     break;
//       case 'text':
//         setContent(<div><h4 className='format'>Download.TXT file<DownloadForOfflineIcon onClick={downloadPdf} /></h4></div>);
//         break;
//       default:
//         setContent(null);
//         break;
//     }
//   };
//   const videoUrl = video;

//   const downloadVideo = () => {
//     const a = document.createElement('a');
//     a.href = videoUrl;
//     a.download = 'downloaded_audio.mp4';
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//   };

//   const downloadAudio = () => {
//     const a = document.createElement('a');
//     a.href = audioUrl;
//     a.download = 'downloaded_video.mp3';
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//   };
//   const downloadPdf = () => {
//     const a = document.createElement('a');
//     a.href = pdfUrl;
//     a.download = 'downloaded_document.pdf';
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//   };
  

//   const handleOpenDialog = () => {
//     setOpenDialog(!openDialog);
//   };

//   const setEditorContent = (buttonText) => {
//     setSelectedButtonText(buttonText);
//   };
//   const handlereset = () => {
//     setIsSelect(false);
//   }

//   const handlehighlight = (buttonName) => {
//     setSelectedButton(buttonName);
//     // Your existing logic for button click here
//   };
//   const modalRef = React.useRef();
//   // React.useEffect(() => {
//   //   const handleClickOutside = (event) => {
//   //     if (modalRef.current && !modalRef.current.contains(event.target)) {
//   //       closeModal();
//   //     }
//   //   };

//   //   if (isModalOpen) {
//   //     document.addEventListener('mousedown', handleClickOutside);
//   //   }

//   //   return () => {
//   //     document.removeEventListener('mousedown', handleClickOutside);
//   //   };
//   // }, [isModalOpen]);
//   return (
//     <Box sx={{ display: 'flex', backgroundColor: 'azure' }}>
//       <CssBaseline />
//       <AppBar position="fixed" open={open} sx={{ backgroundColor: "inherit" }}>
//         <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
//           <div style={{ display: 'flex', alignItems: 'center' }}>
//             <IconButton
//               color={open ? "secondary" : "black"} 
//               aria-label="open drawer"
//               onClick={handleDrawerOpen}
//               edge="start"
//               sx={{
//                 marginRight: 2,
//                 ...(open && { display: 'none' }),
//                 color: open ? 'secondary' : 'black',
//               }}
//             >
//               <MenuIcon />
//             </IconButton>
//             <Typography variant="h6" noWrap component="div" style={{ color: "#FB2576", cursor: "pointer" }}
//               onClick={() => window.location.reload()}>
//               DUB MAESTROS
//             </Typography>
//           </div>
//           <div style={{ display: 'flex', alignItems: 'center' }}>
//             <Button
//               variant="contained"
//               sx={{ color: 'white', backgroundColor: "#FB2576", mr: 1 }}
//               onClick={handlereset}
//             >
//               Reset
//             </Button>

//             <Button variant="contained" onClick={openModal} sx={{ color: 'white', backgroundColor: "#FB2576", mr: 1 }}>Export</Button>
//             {isModalOpen && (
//               <div className="modal">
//                 <div className="modal-content">
//                   <span className="close" onClick={closeModal}>
//                   </span>
//                   <div className="options">
//                     <h4 className='button' onClick={() => handleOptionClick('audio')}>Audio</h4>
//                     <h4 className='button' onClick={() => handleOptionClick('video')}>Video</h4>
//                     <h4 className='button' onClick={() => handleOptionClick('text')}>Text</h4>
//                   </div><br /><br />
//                   <div className="content-display">
//                     {content}
//                   </div>
//                 </div>
//               </div>
//             )}
//             <Button variant="contained" sx={{ color: 'white', backgroundColor: "#FB2576" }} onClick={handleOpenDialog}>Preview</Button>
//             {openDialog && <PreviewScreen />}
//           </div>
//         </Toolbar>
//       </AppBar>
//       <Drawer variant="permanent" open={open} >
//         <DrawerHeader sx={{ backgroundColor: "azure " }} >
//           <IconButton onClick={handleDrawerClose} sx={{ color: "white", backgroundColor: "black" }}>
//             {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
//           </IconButton>
//         </DrawerHeader>
//         <List sx={{ backgroundColor: "azure", height: "100vh" ,rowGap:20}}>

//           <ListItem disablePadding sx={{ display: 'block' }} className='icon'>
//             <ListItemButton
//               sx={{
//                 minHeight: 48,
//                 justifyContent: open ? 'initial' : 'center',
//                 px: 2.5,
//                 color: '#FB2576',
//                 borderRadius:100,
//                 backgroundColor: activeButton === 'Subtitle' ? '#d0efff' : '',
//               }}
//               onClick={() => {
//                 handleButtonClick('Subtitle')
//                 handleBtnClick('Subtitle')
//               }}

//             >
//               <Tooltip title="Subtitles">
//                 <ListItemIcon
//                   sx={{
//                     minWidth: 0,
//                     mr: open ? 3 : 'auto',
//                     justifyContent: 'center',
//                     color: '#FB2576'
//                   }}
//                 >
//                   <SubtitlesIcon />
//                 </ListItemIcon>
//               </Tooltip>
//               <ListItemText primary="Translator" sx={{ opacity: open ? 1 : 0 }} />
//             </ListItemButton>
//           </ListItem>

//           <ListItem disablePadding sx={{ display: 'block' }} className='icon'>
//             <ListItemButton
//               sx={{
//                 minHeight: 48,
//                 justifyContent: open ? 'initial' : 'center',
//                 px: 2.5,
//                 color: '#FB2576',
//                 borderRadius:100,
//                 backgroundColor: activeButton === 'Magic' ? '#d0efff' : '',
//               }}
//               onClick={() => {handleButtonClick('Magic')
//               handleBtnClick('Magic')}}
//             >
//               <Tooltip title="Add Magic">
//                 <ListItemIcon
//                   sx={{
//                     minWidth: 0,
//                     mr: open ? 3 : 'auto',
//                     justifyContent: 'center',
//                     color: '#FB2576'
//                   }}
//                 >
//                   <AutoFixHighOutlinedIcon />
//                 </ListItemIcon>
//               </Tooltip>
//               <ListItemText primary="Magician" sx={{ opacity: open ? 1 : 0 }} />
//             </ListItemButton>
//           </ListItem>

//           <ListItem disablePadding sx={{ display: 'block' }} className='icon'>
//             <ListItemButton
//               sx={{
//                 minHeight: 48,
//                 justifyContent: open ? 'initial' : 'center',
//                 px: 2.5,
//                 color: '#FB2576',
//                 borderRadius:100,
//                 backgroundColor: activeButton === 'Summarize' ? '#d0efff' : '',
//               }}
//               onClick={() => {handleButtonClick('Summarize')
//               handleBtnClick('Summarize')}}
//             >
//               <Tooltip title="Add Magic">
//                 <ListItemIcon
//                   sx={{
//                     minWidth: 0,
//                     mr: open ? 3 : 'auto',
//                     justifyContent: 'center',
//                     color: '#FB2576'
//                   }}
//                 >
//                   <SummarizeIcon />
//                 </ListItemIcon>
//               </Tooltip>
//               <ListItemText primary="Summarize" sx={{ opacity: open ? 1 : 0 }} />
//             </ListItemButton>
//           </ListItem>

//           <ListItem disablePadding sx={{ display: 'block' }} className='icon'>
//             <ListItemButton
//               sx={{
//                 minHeight: 48,
//                 justifyContent: open ? 'initial' : 'center',
//                 px: 2.5,
//                 color: '#FB2576',
//                 borderRadius:100,
//                 backgroundColor: activeButton === 'LipSync' ? '#d0efff' : '',
//               }}
//               onClick={() => {handleButtonClick('LipSync')
//               handleBtnClick('LipSync')}}
//             >
//               <Tooltip title="LipSync">
//                 <ListItemIcon
//                   sx={{
//                     minWidth: 0,
//                     mr: open ? 3 : 'auto',
//                     justifyContent: 'center',
//                     color: '#FB2576'
//                   }}
//                 >
//                   <FaSyncAlt style={{ width: "18px", height: "20px" }} />
//                 </ListItemIcon>
//               </Tooltip>
//               <ListItemText primary="LipSync" sx={{ opacity: open ? 1 : 0 }} />
//             </ListItemButton>
//           </ListItem>

//           <ListItem disablePadding sx={{ display: 'block' }} className='icon'>
//             <ListItemButton
//               sx={{
//                 minHeight: 48,
//                 justifyContent: open ? 'initial' : 'center',
//                 px: 2.5,
//                 color: '#FB2576',
//                 borderRadius:100,
//                 backgroundColor: activeButton === 'Thumbnail' ? '#d0efff' : '',
//               }}
//               onClick={() =>{ handleButtonClick('Thumbnail')
//                handleBtnClick('Thumbnail')}}
//             >
//               <Tooltip title="Thumbnail">
//                 <ListItemIcon
//                   sx={{
//                     minWidth: 0,
//                     mr: open ? 3 : 'auto',
//                     justifyContent: 'center',
//                     color: '#FB2576',
                    
//                   }}
//                 >
//                   <TiPin style={{ height: "30px", width: "25px" }} />
//                 </ListItemIcon>
//               </Tooltip>
//               <ListItemText primary="Thumbnail" sx={{ opacity: open ? 1 : 0 }} />
//             </ListItemButton>
//           </ListItem>

//           <ListItem disablePadding sx={{ display: 'block' }} className='icon'>
//             <ListItemButton
//               sx={{
//                 minHeight: 48,
//                 justifyContent: open ? 'initial' : 'center',
//                 px: 2.5,
//                 color: '#FB2576',
//                 borderRadius:100,
//                 backgroundColor: activeButton === 'SuperText' ? '#d0efff' : '',
//               }}
//               onClick={() => {handleButtonClick('SuperText')
//             handleBtnClick('SuperText')}}
//             >
//               <Tooltip title="SuperText">
//                 <ListItemIcon
//                   sx={{
//                     minWidth: 0,
//                     mr: open ? 3 : 'auto',
//                     justifyContent: 'center',
//                     color: '#FB2576'
//                   }}
//                 >
//                   <MdTextFields style={{ width: '30px', height: "23px" }} />
//                 </ListItemIcon>
//               </Tooltip>
//               <ListItemText primary="SuperText" sx={{ opacity: open ? 1 : 0 }} />
//             </ListItemButton>
//           </ListItem>

//           <ListItem disablePadding sx={{ display: 'block' }} className='icon'>
//             <ListItemButton
//               sx={{
//                 minHeight: 48,
//                 justifyContent: open ? 'initial' : 'center',
//                 px: 2.5,
//                 color: '#FB2576',
//                 borderRadius:100,
//                 backgroundColor: activeButton === 'Audio' ? '#d0efff' : '',
//               }}
//               onClick={() => {handleButtonClick('Audio')
//               handleBtnClick('Audio')}}
//             >
//               <Tooltip title="Audio">
//                 <ListItemIcon
//                   sx={{
//                     minWidth: 0,
//                     mr: open ? 3 : 'auto',
//                     justifyContent: 'center',
//                     color: '#FB2576'
//                   }}
//                 >
//                   <VolumeUpIcon style={{ width: '30px', height: "23px" }} />
//                 </ListItemIcon>
//               </Tooltip>
//               <ListItemText primary="Audio" sx={{ opacity: open ? 1 : 0 }} />
//             </ListItemButton>
//           </ListItem>

//           <ListItem disablePadding sx={{ display: 'block' }} className='icon'>
//             <ListItemButton
//               sx={{
//                 minHeight: 48,
//                 justifyContent: open ? 'initial' : 'center',
//                 px: 2.5,
//                 color: '#FB2576',
//                 borderRadius:100,
//                 backgroundColor: activeButton === 'VSummary' ? '#d0efff' : '',
//               }}
//               onClick={() => {handleButtonClick('VSummary')
//             handleBtnClick('VSummary')}}
//             >
//               <Tooltip title="Video Summary">
//                 <ListItemIcon
//                   sx={{
//                     minWidth: 0,
//                     mr: open ? 3 : 'auto',
//                     justifyContent: 'center',
//                     color: '#FB2576'
//                   }}
//                 >
//                   <OndemandVideoOutlinedIcon style={{ width: '30px', height: "23px" }} />
//                 </ListItemIcon>
//               </Tooltip>
//               <ListItemText primary="VSummary" sx={{ opacity: open ? 1 : 0 }} />
//             </ListItemButton>
//           </ListItem>

//         </List>

//       </Drawer>
//       <section>
//         <Box component="main" sx={{ flexGrow: 1, pt: 3 }} className='main-box'>
//           {isselect &&
//             <Editor selectedButtonText={selectedButtonText} passvideoSrc={passvideoSrc} Utubeurl={Utubeurl} dub={dub} />}
//           {
//             !isselect && <Upload setIsSelect={setIsSelect} setSelectedButtonText={setSelectedButtonText}
//               setPassVideoSrc={setPassVideoSrc} setUtubeUrl={setUtubeUrl} setDub={setDub} />
//           }
//         </Box>
//       </section>
//     </Box>
//   );
// }
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Editor from '../editor/Editor';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import "./Sidebar.css"
import 'resize-observer-polyfill';
import { Button, Link } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import Tooltip from '@mui/material/Tooltip';
import { TiPin } from "react-icons/ti";
import { FaSyncAlt } from "react-icons/fa";
import { MdTextFields } from "react-icons/md";
import video from './s_output.mp4';
// import { useState } from 'react';
import PreviewScreen from '../PreviewScreen/PreviewScreen';
import Upload from '../Upload/Upload';
import axios from 'axios';
// import bimage from 'C:\\Users\\PRIYA\\AppData\\Local\\Temp\\508b366d-c94b-4345-9af5-1d5d4f8ae213_Untitled design[1].zip.213\\3.jpg';
// import bimage from 'C:\\Users\\PRIYA\\AppData\\Local\\Temp\\a772ec64-ac59-4b11-ac76-3e9f5a1c592e_Untitled design[1].zip.92e\\2.jpg';
// import bimage from 'C:\\Users\\PRIYA\\AppData\\Local\\Temp\\508b366d-c94b-4345-9af5-1d5d4f8ae213_Untitled design[1].zip.213\\3.jpg';
// import bimage from "C:\\Users\\PRIYA\\Desktop\\My WorkSpace\\ebookstore\\public\\Images\\Untitled design (1).jpg";
import bg from "./bg.jpg";
import audioUrl from 'L:\\CMR\\on\\cmrfedub\\app1\\src\\components\\sidebar\\vt.mp3';
import pdfUrl from "L:\\CMR\\on\\cmrfedub\\app1\\src\\components\\sidebar\\output_json.pdf";
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
// import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import SummarizeIcon from '@mui/icons-material/Summarize';



const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#FB2576"),
  backgroundColor: "#FB2576",
  '&:hover': {
    backgroundColor: "pink",
  },
}));

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Sidebar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [isselect, setIsSelect] = React.useState(false);
  const [selectedButtonText, setSelectedButtonText] = React.useState('');
  const [isLightMode, setIsLightMode] = React.useState(true);
  const [activeButton, setActiveButton] = React.useState(null);
  const [output,setOutput]=React.useState(null);
  const handleBtnClick = (button) => {
    setActiveButton(button);
  };

  const handleButtonClick = (text) => {
    setIsSelect(true);
    setSelectedButtonText(text);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [content, setContent] = React.useState(null);

  const openModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setContent(null); // Reset content when modal closes
  };

  const handleModeToggle = () => {
    setIsLightMode(!isLightMode); // Toggle the mode
  };

  React.useEffect(() => {

    const defaultContent = (
      <div>
        <h4 className='format'>Download.MP3s file<DownloadForOfflineIcon /></h4>
      </div>
    );
    setContent(defaultContent);
  }, []);

  const handleOptionClick = (type) => {
    const iconStyle = { color: 'white', position: 'absolute', right: 0 }; // Define the common style
    switch (type) {
      case 'audio':
        setContent(<div><h4 className='format'>Download.MP3s file<DownloadForOfflineIcon onClick={downloadAudio} style={{ color: 'white' }} />
        </h4></div>);
        break;
      case 'video':
        setContent(<div><h4 className='format'>Download.MP4 file<DownloadForOfflineIcon onClick={downloadVideo} /></h4></div>);
        break;
      // case 'subtitle':
      //     setContent(<div><h4 className='format'>Download.SRT file<DownloadForOfflineIcon/></h4>
      //     <h4 className='format'>Download.VTT file<DownloadForOfflineIcon /></h4></div>);
      //     break;
      case 'text':
        setContent(<div><h4 className='format'>Download.TXT file<DownloadForOfflineIcon onClick={downloadPdf} /></h4></div>);
        break;
      default:
        setContent(null);
        break;
    }
  };
  const videoUrl = video;

  const downloadVideo = () => {
    axios.get('http://127.0.0.1:5000/ret_videomp4', {
        responseType: 'blob',
    })
    .then(response => {
        console.log(response.data);
        const videoBlob = new Blob([response.data], { type: 'video/mp4' });
        const url = URL.createObjectURL(videoBlob);
        setOutput(url);
        console.log(response);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'downloaded_video.mp4';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    })
    .catch(error => {
        console.error('Error uploading video:', error);
    });
};


  const downloadAudio = () => {
    axios.get('http://127.0.0.1:5000/ret_audiomp3', {
        responseType: 'blob',
    })
    .then(response => {
        console.log(response.data);
        const audioBlob = new Blob([response.data], { type: 'audio/mp3' });
        const url = URL.createObjectURL(audioBlob);
        setOutput(url);
        console.log(response);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'downloaded_audiomp3.mp3';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    })
    .catch(error => {
        console.error('Error fetching audio:', error);
    });
};
  const downloadPdf = () => {
    const a = document.createElement('a');
    a.href = pdfUrl;
    a.download = 'downloaded_document.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleOpenDialog = () => {
    console.log("asjkj");
    console.log(passvideoSrc);
    setOpenDialog(!openDialog);
  };

  const setEditorContent = (buttonText) => {
    setSelectedButtonText(buttonText);
  };
  const handlereset = () => {
    setIsSelect(false);
  }
  const [Utubeurl, setUtubeUrl] = React.useState('');
  const [passvideoSrc, setPassVideoSrc] = React.useState('');
  const [dub, setDub] = React.useState('');

  const [selectedButton, setSelectedButton] = React.useState(null);

  const handlehighlight = (buttonName) => {
    setSelectedButton(buttonName);
    // Your existing logic for button click here
  };
  const modalRef = React.useRef();
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);
  return (
    <Box sx={{ display: 'flex', backgroundColor: 'azure' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: "inherit" }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color={open ? "secondary" : "black"} // Set color based on the 'open' state
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 2,
                ...(open && { display: 'none' }),
                color: open ? 'secondary' : 'black', // Set color based on the 'open' state
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" style={{ color: "#FB2576", cursor: "pointer" }}
              onClick={() => window.location.reload()}>
              DUB MAESTROS
            </Typography>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              variant="contained"
              sx={{ color: 'white', backgroundColor: "#FB2576", mr: 1 }}
              onClick={handlereset}
            >
              Reset
            </Button>

            <Button variant="contained" onClick={openModal} sx={{ color: 'white', backgroundColor: "#FB2576", mr: 1 }}>Export</Button>
            {isModalOpen && (
              <div className="modal">
                <div className="modal-content">
                  <span className="close" onClick={closeModal}>
                  </span>
                  <div className="options">
                    <h4 className='button' onClick={() => handleOptionClick('audio')}>Audio</h4>
                    <h4 className='button' onClick={() => handleOptionClick('video')}>Video</h4>
                    <h4 className='button' onClick={() => handleOptionClick('text')}>Text</h4>
                  </div><br /><br />
                  <div className="content-display">
                    {content}
                  </div>
                </div>
              </div>
            )}
            <Button variant="contained" sx={{ color: 'white', backgroundColor: "#FB2576" }} onClick={handleOpenDialog}>Preview</Button>
            {openDialog && <PreviewScreen />}
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} >
        <DrawerHeader sx={{ backgroundColor: "azure " }} >
          <IconButton onClick={handleDrawerClose} sx={{ color: "white", backgroundColor: "black" }}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <List sx={{ backgroundColor: "azure", height: "100vh" }}>

          <ListItem disablePadding sx={{ display: 'block' }} className='icon'>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                color: '#FB2576',
                backgroundColor: activeButton === 'Subtitle' ? '#008080' : 'transparent',
              }}
              onClick={() => {
                handleButtonClick('Subtitle')
                handleBtnClick('Subtitle')
              }}

            >
              <Tooltip title="Subtitles">
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: '#FB2576'
                  }}
                >
                  <SubtitlesIcon />
                </ListItemIcon>
              </Tooltip>
              <ListItemText primary="Translator" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: 'block' }} className='icon'>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                color: '#FB2576',
                backgroundColor: activeButton === 'Magic' ? '#008080' : 'transparent',
              }}
              onClick={() => {handleButtonClick('Magic')
              handleBtnClick('Magic')}}
            >
              <Tooltip title="Add Magic">
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: '#FB2576'
                  }}
                >
                  <AutoFixHighOutlinedIcon />
                </ListItemIcon>
              </Tooltip>
              <ListItemText primary="Magician" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: 'block' }} className='icon'>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                color: '#FB2576',
                backgroundColor: activeButton === 'Summarize' ? '#008080' : 'transparent',
              }}
              onClick={() => {handleButtonClick('Summarize')
              handleBtnClick('Summarize')}}
            >
              <Tooltip title="Add Magic">
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: '#FB2576'
                  }}
                >
                  <SummarizeIcon />
                </ListItemIcon>
              </Tooltip>
              <ListItemText primary="Summarize" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: 'block' }} className='icon'>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                color: '#FB2576',
                backgroundColor: activeButton === 'LipSync' ? '#008080' : 'transparent',
              }}
              onClick={() => {handleButtonClick('LipSync')
              handleBtnClick('LipSync')}}
            >
              <Tooltip title="LipSync">
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: '#FB2576'
                  }}
                >
                  <FaSyncAlt style={{ width: "18px", height: "20px" }} />
                </ListItemIcon>
              </Tooltip>
              <ListItemText primary="LipSync" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: 'block' }} className='icon'>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                color: '#FB2576',
                backgroundColor: activeButton === 'Thumbnail' ? '#008080' : 'transparent',
              }}
              onClick={() =>{ handleButtonClick('Thumbnail')
               handleBtnClick('Thumbnail')}}
            >
              <Tooltip title="Thumbnail">
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: '#FB2576',
                    
                  }}
                >
                  <TiPin style={{ height: "30px", width: "25px" }} />
                </ListItemIcon>
              </Tooltip>
              <ListItemText primary="Thumbnail" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: 'block' }} className='icon'>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                color: '#FB2576',
                backgroundColor: activeButton === 'SuperText' ? '#008080' : 'transparent',
              }}
              onClick={() => {handleButtonClick('SuperText')
            handleBtnClick('SuperText')}}
            >
              <Tooltip title="SuperText">
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: '#FB2576'
                  }}
                >
                  <MdTextFields style={{ width: '30px', height: "23px" }} />
                </ListItemIcon>
              </Tooltip>
              <ListItemText primary="SuperText" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: 'block' }} className='icon'>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                color: '#FB2576',
                backgroundColor: activeButton === 'Audio' ? '#008080' : 'transparent',
              }}
              onClick={() => {handleButtonClick('Audio')
              handleBtnClick('Audio')}}
            >
              <Tooltip title="Audio">
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: '#FB2576'
                  }}
                >
                  <VolumeUpIcon style={{ width: '30px', height: "23px" }} />
                </ListItemIcon>
              </Tooltip>
              <ListItemText primary="Audio" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: 'block' }} className='icon'>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                color: '#FB2576',
                backgroundColor: activeButton === 'VSummary' ? '#008080' : 'transparent',
              }}
              onClick={() => {handleButtonClick('VSummary')
            handleBtnClick('VSummary')}}
            >
              <Tooltip title="Video Summary">
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: '#FB2576'
                  }}
                >
                  <OndemandVideoOutlinedIcon style={{ width: '30px', height: "23px" }} />
                </ListItemIcon>
              </Tooltip>
              <ListItemText primary="VSummary" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

        </List>

      </Drawer>
      <section>
        <Box component="main" sx={{ flexGrow: 1, pt: 3 }}>
          {isselect &&
            <Editor selectedButtonText={selectedButtonText} passvideoSrc={passvideoSrc} Utubeurl={Utubeurl} dub={dub} />}
          {
            !isselect && <Upload setIsSelect={setIsSelect} setSelectedButtonText={setSelectedButtonText}
              setPassVideoSrc={setPassVideoSrc} setUtubeUrl={setUtubeUrl} setDub={setDub} />
          }
          {/* <video src={dub} height='100px' width='100px' controls/> */}
          
        </Box>
      </section>
    </Box>
  );
}