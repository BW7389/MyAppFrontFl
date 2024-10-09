// VideoCard.js
import React from 'react';
import './VideoCard.css'; // Import CSS for VideoCard

const VideoCard = ({ resolution, title, onDelete }) => {
  return (
    <div className="video-card">
      <h4>{title}</h4> {/* Display the title */}
      <p>{resolution}</p> {/* Display the resolution */}
      <button onClick={onDelete} className="delete-button">Delete</button>
    </div>
  );
};

export default VideoCard;
