import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useRef, useState } from 'react';
import React, { useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './Subtitle.css';
import ArrowBackIosNewSharpIcon from '@mui/icons-material/ArrowBackIosNewSharp';

const Subtitle = ({ onArrowClick }) => {
  const [hoveredIndexEnglish, setHoveredIndexEnglish] = useState(-1);
  const [hoveredIndexHindi, setHoveredIndexHindi] = useState(-1);
  const [subtitles, setsubtitle] = useState([])
  const col1Ref = useRef(null);
  const col2Ref = useRef(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/getsubtitle');
        const data = await response.json();
        const transformedSubtitles = [];
        for (let i = 0; i < data.response.length; i++) {
          const seg = data.response[i];
          transformedSubtitles.push({
            timestamp: seg.start.toFixed(2) + "-" + seg.end.toFixed(2),
            content: seg.word,
            translation: seg.tword,
          });
        }

        setsubtitle(transformedSubtitles);
        console.log(data.response)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleScroll = (ref, otherRef) => {
    if (ref.current && otherRef.current) {
      const { scrollTop } = ref.current;
      otherRef.current.scrollTop = scrollTop;
    }
  };

  const handleCol1Scroll = () => {
    handleScroll(col1Ref, col2Ref);
  };

  const handleCol2Scroll = () => {
    handleScroll(col2Ref, col1Ref);
  };


  const adjustContentLength = (content, maxLength) => {
    const lines = content.split('\n');
    const diff = maxLength - lines.length;
    if (diff > 0) {
      const paddedLines = [...lines, ...Array(diff).fill('')];
      return paddedLines.join('\n');
    }
    return content;
  };
  const maxEnglishHeight = Math.max(
    ...subtitles.map((subtitle) => subtitle.content.split('\n').length)
  );
  const maxHindiHeight = Math.max(
    ...subtitles.map((subtitle) => subtitle.translation.split('\n').length)
  );


  const englishContent = subtitles.map((subtitle) =>
    adjustContentLength(subtitle.content, maxEnglishHeight)
  );
  const hindiContent = subtitles.map((subtitle) =>
    adjustContentLength(subtitle.translation, maxHindiHeight)
  );
  const maxContentHeight = Math.max(maxEnglishHeight, maxHindiHeight);

  const copyToClipboard = (content) => {
    const el = document.createElement('textarea');
    el.value = content;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <div style={{ marginTop: '5%' }}>
      {/* <ArrowBackIosNewSharpIcon onClick={onArrowClick} /> */}
      <div
        style={{
          border: '2px solid black',
          borderRadius: '10px',
          width: '50%',
          padding: '10px 10px 10px 10px',
          marginLeft: '25%',
          fontSize: '150%'
        }}
      >
        <b style={{ paddingLeft: '30%' }}>SUBTITLES</b>
      </div>
      <div
        className="col-6"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '500px',
          width: '100%'
        }}
      >
        <div
          id='en'
          ref={col1Ref}
          style={{
            border: '1px solid black',
            borderRadius: '15px',
            marginTop: '5%',
            height: '100%',
            width: '80%', // Set to a percentage value
            overflowY: 'scroll',
            backgroundColor: '#ffeaed',
            display: 'flex',
            flexDirection: 'column',
          }}
          onScroll={handleCol1Scroll}
        >

          {subtitles.map((subtitle, index) => (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                padding: '10px',
                color: 'black',
                lineHeight: '23px',
                position: 'relative',
                margin: '5px',
              }}
            >

              <div
                style={{
                  flex: '0',
                  borderRight: '1px solid white',
                  paddingRight: '10px',
                }}
              >
                {subtitle.timestamp}
              </div>
              <div
                style={{
                  flex: '1.5',
                  paddingLeft: '10px',
                  minHeight: `${maxContentHeight * 20}px`,
                  border: '1px solid black',
                  marginLeft: '12px',
                  position: 'relative',
                  paddingLeft: '1.2em', // Use relative units for padding
                  paddingTop: '3.2em',
                  paddingBottom: '1.2em',
                  paddingRight: '1.2em',
                  borderColor: 'black',
                  borderWidth: '3px',
                  borderRadius: '8px',
                }}
                onMouseEnter={() => setHoveredIndexEnglish(index)}
                onMouseLeave={() => setHoveredIndexEnglish(-1)}
              >
                {hoveredIndexEnglish === index && (
                  <button
                    onClick={() => copyToClipboard(subtitle.content, 'English')}
                    style={{
                      position: 'absolute',
                      top: '5px',
                      right: '5px',
                      cursor: 'pointer',
                      border: 'none',
                      background: 'inherit',
                      color: 'black',
                      paddingLeft: '280px',
                    }}
                  >
                    <ContentCopyIcon />
                  </button>
                )}
                {englishContent[index]}
              </div>
              <div
                className="hindi"
                style={{
                  flex: '1.5',
                  paddingLeft: '10px',
                  minHeight: `${maxContentHeight * 20}px`,
                  border: '1px solid black',
                  marginLeft: '10px',
                  borderColor: 'black',
                  paddingLeft: '12px',
                  paddingTop: '32px',
                  paddingBottom: '12px',
                  paddingRight: '12px',
                  borderWidth: '3px',
                  borderRadius: '8px'
                }}
                onMouseEnter={() => setHoveredIndexHindi(index)} // Set the hovered index for Hindi
                onMouseLeave={() => setHoveredIndexHindi(-1)}
              >
                {hoveredIndexHindi === index && (
                  <button
                    onClick={() => copyToClipboard(subtitle.translation, 'Hindi')}
                    style={{
                      position: 'absolute',
                      top: '15px',
                      right: '5px',
                      cursor: 'pointer',
                      border: 'none',
                      background: 'inherit',
                      color: 'black',
                      paddingLeft: '200px',
                    }}
                  >
                    <ContentCopyIcon />

                  </button>
                )}
                {hindiContent[index]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subtitle;