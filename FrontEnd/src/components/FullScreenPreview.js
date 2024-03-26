// FullScreenPreview.js
import React from 'react';
import Videos from './Videos';

const FullScreenPreview = ({ dubSrc, onClose }) => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'black' }}>
      <Videos dubSrc={dubSrc} />
      <button onClick={onClose} style={{ position: 'absolute', top: 10, right: 10, color: 'white', background: 'transparent', border: 'none', cursor: 'pointer' }}>Close</button>
    </div>
  );
};

export default FullScreenPreview;
