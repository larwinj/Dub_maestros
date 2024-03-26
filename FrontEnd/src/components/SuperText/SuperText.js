import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import * as React from'react';
import video2 from "./output_video.mp4";
import {useState} from 'react';
import './SuperText.css';
const SuperText=()=>
{    
    const [msg,setmsg]=useState(true);
    const handleClick=()=>
    {
          setmsg(!msg);
    }
    const [expanded, setExpanded] = React.useState('panel1')
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
      };
    return(
    <div style={{marginTop:'50px'}}>
       <div className='hea'>
        <b style={{fontSize:'150%'}}>TEXTSUPER</b>
     <Button
       variant='contained'
       sx={{
         backgroundColor: "#FB2576",
         marginLeft: '25%',
          '&:hover': {
           backgroundColor: "#fb`0055", // Change this to the color you want on hover
           },
          }}
         onClick={handleClick}
        >
         {msg?'Enable':'disable'}
     </Button>
     </div>
    <br/><br/>
    { !msg &&
    <div >
    <video
      src={video2}
      controls
      style={{
        padding:'10px',
        paddingTop:'20px',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        justifyContent: 'center',
        alignItems:'center'
      }}
      />
    </div>
    }
  </div>

    );
}
export default SuperText;