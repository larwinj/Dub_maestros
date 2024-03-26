// Videos.js

import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import load from "./download.gif";
import ReactPlayer from 'react-player';
import './Videos.css'; // Import the external CSS file

export default function Videos(props) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className="video-container">
      <div className="video-wrapper">
        {props.url ? (
          <ReactPlayer url={props.url} controls />
        ) : (
          <video
            src={props.videoSrc}
            controls
            style={{
              borderRadius: '1%',
            }}
          />
        )}
      </div>
    </div>
  );
}
