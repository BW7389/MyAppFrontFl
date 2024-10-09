import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for type checking
import './NormalVideo.css';

const NormalVideo = ({ videoUrl, title, description }) => {
  return (
    <div className="normal-video">
      <video className="normal-video__video" controls>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="normal-video__info">
        <h2 className="normal-video__title">{title}</h2>
        <p className="normal-video__description">{description}</p>
      </div>
    </div>
  );
};

// Adding PropTypes for better type checking
NormalVideo.propTypes = {
  videoUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default NormalVideo;
