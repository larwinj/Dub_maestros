import './Thumbnail.css';
import Button from '@mui/material/Button';
import * as React from'react';
// import 'C:/Users/nkous/Desktop/SihApp/app1/src/components/LipLipsync.css';
import {useState} from 'react';
const Thumbnail=()=>
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
      <b style={{fontSize:'150%'}}>THUMBNAIL</b>
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
    <div >
    { !msg &&
    <div className='vdo'>
      <br/>
      <input placeholder="Enter Context" style={{marginRight:'90px'}}></input><br/><br/>
    <img
    src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1644605295i/60393672.jpg"
    />
    </div>}
    </div>


</div>
    );
}
export default Thumbnail;