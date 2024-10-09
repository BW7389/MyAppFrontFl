import React from 'react';

const TabSwitcher = ({ activeTab, setActiveTab }) => {
  return (
    <div className="videos-manager__tabs">
      <button 
        className={`videos-manager__tab ${activeTab === 'normal' ? 'active' : ''}`} 
        onClick={() => setActiveTab('normal')}
      >
        Normal Videos
      </button>
      <button 
        className={`videos-manager__tab ${activeTab === 'reel' ? 'active' : ''}`} 
        onClick={() => setActiveTab('reel')}
      >
        Reel Videos
      </button>
    </div>
  );
};

export default TabSwitcher;
