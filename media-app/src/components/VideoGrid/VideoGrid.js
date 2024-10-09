import React from 'react';
import NormalVideo from '../../components/Videos/Normal/NormalVideo';
import ReelVideo from '../../components/Videos/Reels/ReelVideo';
import './VideoGrid.css'; // Import CSS if needed

const VideoGrid = ({ videos, videoType }) => {
  return (
    <div className="video-grid">
      {videos.map((video, index) => (
        <div className="video-grid__item" key={index}>
          {videoType === 'normal' ? (
            <NormalVideo 
              videoUrl={video.videoUrl}
              title={video.title}
              description={video.description}
            />
          ) : (
            <ReelVideo 
              videoUrl={video.videoUrl}
              title={video.title}
              description={video.description}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default VideoGrid;
