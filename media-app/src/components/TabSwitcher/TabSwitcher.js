import React from 'react';
import './TabSwitcher.css'; // Ensure to import the updated CSS file

const TabSwitcher = ({ activeTab, setActiveTab }) => {
  return (
    <div className="videos-manager__tabs" role="tablist">
      <button 
        className={`videos-manager__tab ${activeTab === 'normal' ? 'active' : ''}`} 
        onClick={() => setActiveTab('normal')}
        role="tab" 
        tabIndex={activeTab === 'normal' ? 0 : -1}
      >
        Normal Videos
      </button>
      <button 
        className={`videos-manager__tab ${activeTab === 'reel' ? 'active' : ''}`} 
        onClick={() => setActiveTab('reel')}
        role="tab" 
        tabIndex={activeTab === 'reel' ? 0 : -1}
      >
        Reel Videos
      </button>
    </div>
  );
};

export default TabSwitcher;
