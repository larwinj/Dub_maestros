import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { registerLicense } from '@syncfusion/ej2-base';
import VideoUploader from './VideoUploader';
import 'typeface-poppins';
import './/index.css';
// registerLicense('Ngo9BigBOggjHTQxAR8/V1NAaF1cXmhKYVVpR2Nbe05xdl9GaFZTRmY/P1ZhSXxXdkdjXH5ccHxXRWBVUEE=');



ReactDOM.render(
  <React.StrictMode>
    {/* <VideoUploader/> */}
      <App />
  </React.StrictMode>,
  document.getElementById('root')
);


