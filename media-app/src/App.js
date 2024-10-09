import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import VideosManager from './pages/VideosManager/VideosManager';
import GalleryManager from './pages/GalleryManager/GalleryManager';
// import Gallery from './pages/Gallery';
// import News from './pages/News';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/videos" element={<VideosManager />} />
        <Route path="/gallery" element={<GalleryManager />} />
        {/* <Route path="/news" element={<News />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
