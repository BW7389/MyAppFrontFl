import React, { useState } from 'react';
import './ReelVideo.css';

const ReelVideo = ({ videoUrl, title, description }) => {
  const [rotation, setRotation] = useState(0); // State to hold the rotation angle

  const handleRotationChange = (event) => {
    setRotation(parseInt(event.target.value, 10)); // Ensure the value is an integer
  };

  return (
    <div className="reel-video">
      <div className="video-container" style={{ transform: `rotate(${rotation}deg)` }}>
        <video className="reel-video__video" controls>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="reel-video__info">
        <h2 className="reel-video__title">{title}</h2>
        <p className="reel-video__description">{description}</p>
      </div>
      <div className="reel-video__rotation-controls">
        <label htmlFor="rotation" className="rotation-label">Rotate Video:</label>
        <select
          id="rotation"
          onChange={handleRotationChange}
          value={rotation}
          className="rotation-select"
        >
          <option value="0">Normal</option>
          <option value="90">90°</option>
          <option value="180">180°</option>
          <option value="270">270°</option>
        </select>
      </div>
    </div>
  );
};

export default ReelVideo;
