import React, { useEffect, useState } from 'react';
import BaseLayout from '../../components/Layout/BaseLayout/BaseLayout'; 
import TabSwitcher from '../../components/TabSwitcher/TabSwitcher'; // Import TabSwitcher
import VideoUploadForm from '../../components/VideoUploadForm/VideoUploadForm'; // Import VideoUploadForm
import VideoGrid from '../../components/VideoGrid/VideoGrid'; // Import VideoGrid
import GroupTabs from '../../components/GroupTabs/GroupTabs'; // Import GroupTabs
import './VideosManager.css';

const VideosManager = () => {
  const [activeTab, setActiveTab] = useState('normal');
  const [activeGroup, setActiveGroup] = useState('Group A');

  // State to hold videos for each group
  const [videos, setVideos] = useState({
    normal: {
      'Group A': [],
      'Group B': [],
      'Group C': [],
      'Group D': [],
    },
    reel: {
      'Group A': [],
      'Group B': [],
      'Group C': [],
      'Group D': [],
    },
  });

  // Restore videos from localStorage
  useEffect(() => {
    const storedVideos = JSON.parse(localStorage.getItem('videos')) || {
      normal: {
        'Group A': [],
        'Group B': [],
        'Group C': [],
        'Group D': [],
      },
      reel: {
        'Group A': [],
        'Group B': [],
        'Group C': [],
        'Group D': [],
      },
    };
    setVideos(storedVideos);
  }, []);

  const handleAddVideo = (video) => {
    setVideos((prevVideos) => {
      const updatedVideos = {
        ...prevVideos,
        [activeTab]: {
          ...prevVideos[activeTab],
          [activeGroup]: [...prevVideos[activeTab][activeGroup], video],
        },
      };
      localStorage.setItem('videos', JSON.stringify(updatedVideos)); // Save to localStorage
      return updatedVideos;
    });
  };

  return (
    <BaseLayout>
      <div className="videos-manager">
        <h1 className="videos-manager__title">Videos Manager</h1>
        
        <TabSwitcher activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="videos-manager__content">
          <GroupTabs activeGroup={activeGroup} setActiveGroup={setActiveGroup} />

          <VideoUploadForm onAddVideo={handleAddVideo} />
          <VideoGrid videos={videos[activeTab][activeGroup]} videoType={activeTab} />
        </div>
      </div>
    </BaseLayout>
  );
};

export default VideosManager;
