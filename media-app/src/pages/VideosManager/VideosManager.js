import React, { useEffect, useState } from 'react';
import BaseLayout from '../../components/Layout/BaseLayout/BaseLayout'; 
import TabSwitcher from '../../components/TabSwitcher/TabSwitcher'; // Import TabSwitcher
import VideoUploadForm from '../../components/VideoUploadForm/VideoUploadForm'; // Import VideoUploadForm
import VideoGrid from '../../components/VideoGrid/VideoGrid'; // Import VideoGrid
import './VideosManager.css';

const VideosManager = () => {
  const [activeTab, setActiveTab] = useState('normal');
  const [normalVideos, setNormalVideos] = useState([]);
  const [reelVideos, setReelVideos] = useState([]);

  // Restore videos from localStorage
  useEffect(() => {
    const storedNormalVideos = JSON.parse(localStorage.getItem('normalVideos')) || [];
    const storedReelVideos = JSON.parse(localStorage.getItem('reelVideos')) || [];
    setNormalVideos(storedNormalVideos);
    setReelVideos(storedReelVideos);
  }, []);

  const handleAddNormalVideo = (video) => {
    const updatedVideos = [...normalVideos, video];
    setNormalVideos(updatedVideos);
    localStorage.setItem('normalVideos', JSON.stringify(updatedVideos)); // Save to localStorage
  };

  const handleAddReelVideo = (video) => {
    const updatedVideos = [...reelVideos, video];
    setReelVideos(updatedVideos);
    localStorage.setItem('reelVideos', JSON.stringify(updatedVideos)); // Save to localStorage
  };

  return (
    <BaseLayout>
      <div className="videos-manager">
        <h1 className="videos-manager__title">Videos Manager</h1>
        
        <TabSwitcher activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="videos-manager__content">
          {activeTab === 'normal' ? (
            <>
              <VideoUploadForm onAddVideo={handleAddNormalVideo} />
              <VideoGrid videos={normalVideos} videoType="normal" />
            </>
          ) : (
            <>
              <VideoUploadForm onAddVideo={handleAddReelVideo} />
              <VideoGrid videos={reelVideos} videoType="reel" />
            </>
          )}
        </div>
      </div>
    </BaseLayout>
  );
};

export default VideosManager;
