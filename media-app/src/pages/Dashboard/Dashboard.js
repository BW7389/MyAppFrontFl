import React from 'react';
import BaseLayout from '../../components/Layout/BaseLayout/BaseLayout'; 
import './Dashboard.css'; 

const Dashboard = () => {
  return (
    <BaseLayout> 
      <div className="dashboard-content">
        <h1>Welcome to K-Pop Dashboard</h1>
      </div>
    </BaseLayout>
  );
};

export default Dashboard;
