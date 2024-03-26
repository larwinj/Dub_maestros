
import React from 'react';
import MagicContent from '../MagicContent/MagicContent';
import Audio from '../AudioContent/Audio';
import Subtitle from '../Subtitle.js/Subtitle';
import LipSync from '../LipSync/LipSync';
import Thumbnail from '../Thumbnail/Thumbnail';
import SuperText from '../SuperText/SuperText';
import Video from '../Staticrightvideo/Video';
import VSummary from '../AudioContent/VSummary';
import Summary from '../summarize/Summary';
import img from "../../img3.png"
import "./Editor.css"


const Editor = (props) => {

  const renderComponent = () => {
    switch (props.selectedButtonText) {
      case 'Audio':
        return <Audio />;
      case 'Magic':
        return <MagicContent />;
      case 'Summarize':
        return <Summary />;
      case 'Subtitle':
        return <Subtitle />;
      case 'LipSync':
        return <LipSync />;
      case 'Thumbnail':
        return <Thumbnail />;
      case 'SuperText':
        return <SuperText />;
      case 'VSummary':
        return <VSummary />;
      case 'Drafts':
        return <div>{img}</div>;
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <div className="split-screen">
        <div className="left-panel">
          {renderComponent()}
        </div>
        <div className="right-panel">
          <Video videoSrc={props.passvideoSrc} videourl={props.Utubeurl} dubSrc={props.dub} />
        </div>
      </div>
    </div>
  );
};

export default Editor;
