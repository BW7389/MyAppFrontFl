import React from 'react';
import Header from '../BaseLayout/Header/Header'; 
import './BaseLayout.css'; 
import Footer from './Footer/Footer';

const BaseLayout = ({ children }) => {
  return (
    <div className="base-layout">
      <Header /> 
      <div className="content">
        {children} 
      </div>
      <Footer />
    </div>
  );
};

export default BaseLayout;
