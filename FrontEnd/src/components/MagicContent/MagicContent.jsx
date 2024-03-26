import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Button, Card } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import axios from 'axios';
import vidSrc from "../../WhatsApp.mp4"

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid black`,
  '&:not(:last-child)': {
    borderBottom: 0,
    borderRadius:'10px'
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function MagicContent() {
  const [expanded, setExpanded] = React.useState('panel1');
  const [text, setText] = React.useState('Loading...');
  const [trans, settrans] = React.useState('Loading...');
  const [summarytrans, setResponseSummarytrans] = React.useState('Loading...');
  const [summary, setResponseSummary] = React.useState('Loading...');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const [isCopied, setIsCopied] = React.useState(false);

  const showCopiedTab = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const copyToClipboard = () => {
    const col6Div = document.querySelector('.text-summary');

    if (col6Div) {
      const textToCopy = col6Div.textContent;

      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          console.log('Text copied to clipboard:', textToCopy);
        })
        .catch((error) => {
          console.error('Error copying to clipboard:', error);
        });
    }
  };
  const handleChangeText = () => {
      axios.post('http://127.0.0.1:5000/gettext', {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(response => {
          setText(response.data.response_text)
          settrans(response.data.response_trans)
        })
        .catch(error => {
          console.error('Error uploading video:', error);
        });
    }
  
  return (
    <div style={{ marginTop: "30px" ,height:'80%',width:'100%'}}>
       <div style={{ border: '2px solid black', borderRadius: '10px', marginLeft: '30%', marginRight: '30%', display: 'flex', justifyContent: 'center', alignItems: 'center' ,padding:'10px 10px 10px 10px'}}>
  <b style={{fontSize:'150%'}}>TEXT TRANSCRIPT</b>
</div>
<br/>
<div style={{  padding: '10px', marginBottom: '20px', height: '95%' }}>
  <Button variant="contained" onClick={handleChangeText} style={{ backgroundColor: "#FB2576" }}>Generate Transcript</Button><br /><br />

  <div style={{ height: '38%', width: '90%', border: '2px solid black', padding: '10px', borderRadius: '10px', overflowY: 'scroll' ,display:'flex',flexDirection:'column'}} className="text-summary">
  <Button
    sx={{ position: 'absolute', top: "30%", right: "52%" }}
    onClick={() => { copyToClipboard(); showCopiedTab(); }}
    style={{ color: "black" }}
  >
    <ContentCopyIcon />
  </Button>
  {isCopied && <div style={{ position: 'absolute', top: "25%", right: "52%", backgroundColor: 'white', padding: '5px', borderRadius: '5px', boxShadow: '0px 0px 5px 0px #000' }}>Copied!</div>}
  <p>{text}</p>
</div>
<br /><br />

<div style={{ height: '38%', width: '90%', border: '2px solid black', padding: '10px', borderRadius: '10px', overflow: 'hidden',overflowY:'scroll' }} className="text-summary">
  <Button
    sx={{ position: 'absolute', top: "60%", right: "52%" }}
    onClick={() => { copyToClipboard(); showCopiedTab(); }}
    style={{ color: "black" }}
  >
    <ContentCopyIcon />
  </Button>
  {isCopied && <div style={{ position: 'absolute', top: "55%", right: "52%", backgroundColor: 'white', padding: '5px', borderRadius: '5px', boxShadow: '0px 0px 5px 0px #000' }}>Copied!</div>}
  <p>{trans}</p>
</div>


</div>
</div>
  );
}