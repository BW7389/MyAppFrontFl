// GroupTabs.js
import React from 'react';

const GroupTabs = ({ activeGroup, setActiveGroup }) => {
  const groups = ['Group A', 'Group B', 'Group C', 'Group D'];

  return (
    <div className="group-tabs">
      {groups.map((group) => (
        <button
          key={group}
          className={`tab-button ${activeGroup === group ? 'active' : ''}`}
          onClick={() => setActiveGroup(group)}
        >
          {group}
        </button>
      ))}
    </div>
  );
};

export default GroupTabs;
