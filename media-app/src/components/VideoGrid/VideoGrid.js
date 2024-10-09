import React from 'react';
import NormalVideo from '../../components/Videos/Normal/NormalVideo';
import ReelVideo from '../../components/Videos/Reels/ReelVideo';
import './VideoGrid.css'; // Import CSS if needed

const VideoGrid = ({ videos, videoType }) => {
  // Render videos conditionally based on video type
  const renderVideo = (video) => {
    const { videoUrl, title, description } = video; // Destructure properties for better readability

    if (videoType === 'normal') {
      return (
        <NormalVideo 
          videoUrl={videoUrl}
          title={title}
          description={description}
        />
      );
    } else {
      return (
        <ReelVideo 
          videoUrl={videoUrl}
          title={title}
          description={description}
        />
      );
    }
  };

  return (
    <div className="video-grid">
      {videos.length > 0 ? ( // Check if there are videos to display
        videos.map((video, index) => (
          <div className="video-grid__item" key={index}>
            {renderVideo(video)} {/* Call render function */}
          </div>
        ))
      ) : (
        <p>No videos available.</p> // Display message if no videos
      )}
    </div>
  );
};

export default VideoGrid;
