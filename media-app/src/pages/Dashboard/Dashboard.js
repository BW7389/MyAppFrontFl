import React, { useState, useEffect } from 'react';
import BaseLayout from '../../components/Layout/BaseLayout/BaseLayout';
import Slider from 'react-slick';
import './Dashboard.css';

// Sample thumbnail URLs (replace with actual video/image URLs)
const THUMBNAIL_URLS = {
  1: 'https://via.placeholder.com/150x100?text=Video+1',
  2: 'https://via.placeholder.com/150x100?text=Video+2',
  3: 'https://via.placeholder.com/150x100?text=Video+3',
  4: 'https://via.placeholder.com/150x100?text=Video+4',
  5: 'https://via.placeholder.com/150x100?text=Gallery+Image+1',
  6: 'https://via.placeholder.com/150x100?text=Gallery+Image+2',
};

const Dashboard = () => {
  const [videos, setVideos] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      const currentTime = new Date();

      setVideos([
        { id: 1, title: 'New K-Pop Video 1', createdAt: new Date(currentTime - 2 * 60 * 60 * 1000), type: 'New', hashtags: ['#new', '#kpop'], thumbnail: THUMBNAIL_URLS[1] },
        { id: 2, title: 'Trending K-Pop Video 2', createdAt: new Date(currentTime - 1 * 60 * 60 * 1000), type: 'Trending', hashtags: ['#trending', '#kpop'], thumbnail: THUMBNAIL_URLS[2] },
        { id: 3, title: 'New K-Pop Video 3', createdAt: new Date(currentTime - 5 * 60 * 60 * 1000), type: 'New', hashtags: ['#new', '#kpop'], thumbnail: THUMBNAIL_URLS[3] },
        { id: 4, title: 'New K-Pop Video 4', createdAt: new Date(currentTime - 3 * 60 * 60 * 1000), type: 'New', hashtags: ['#new', '#kpop'], thumbnail: THUMBNAIL_URLS[4] },
      ]);

      setGallery([
        { id: 1, title: 'K-Pop Gallery Image 1', createdAt: new Date(currentTime - 3 * 60 * 60 * 1000), type: 'New', hashtags: ['#new', '#gallery'], imageUrl: THUMBNAIL_URLS[5] },
        { id: 2, title: 'K-Pop Gallery Image 2', createdAt: new Date(currentTime - 4 * 60 * 60 * 1000), type: 'Trending', hashtags: ['#trending', '#gallery'], imageUrl: THUMBNAIL_URLS[6] },
      ]);

      setNews([
        { id: 1, title: 'K-Pop News 1', createdAt: new Date(currentTime - 30 * 60 * 1000), type: 'New', hashtags: ['#news', '#kpop'] },
        { id: 2, title: 'K-Pop News 2', createdAt: new Date(currentTime - 20 * 60 * 1000), type: 'Trending', hashtags: ['#trending', '#news'] },
      ]);
    };

    fetchData();
  }, []);

  const recentVideos = videos.filter(video => {
    const twentyFourHoursAgo = new Date(new Date() - 24 * 60 * 60 * 1000);
    return video.createdAt >= twentyFourHoursAgo;
  });

  return (
    <BaseLayout>
      <div className="dashboard-content">
        <h1>Welcome to K-Pop Dashboard</h1>
        <Carousel videos={recentVideos} />
        <div className="dashboard-panels">
          <Panel title="Videos" items={videos} isVideoPanel={true} />
          <Panel title="Gallery" items={gallery} isVideoPanel={false} />
          <Panel title="News" items={news} isVideoPanel={false} />
        </div>
      </div>
    </BaseLayout>
  );
};

const Carousel = ({ videos }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="carousel">
      <h2>Newly Released Videos in Last 24 Hours</h2>
      <Slider {...settings}>
        {videos.length > 0 ? (
          videos.map(video => (
            <div key={video.id} className="carousel-item">
              <h3>{video.title}</h3>
              <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
              <p>{video.createdAt.toLocaleTimeString()}</p>
            </div>
          ))
        ) : (
          <div className="carousel-item">
            <h3>No new videos available</h3>
          </div>
        )}
      </Slider>
    </div>
  );
};

const Panel = ({ title, items, isVideoPanel }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [selectedHashtags, setSelectedHashtags] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const hashtags = ['#new', '#trending', '#kpop', '#gallery', '#news'];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'All' || item.type === filterType;
    const matchesHashtags = selectedHashtags.length === 0 || selectedHashtags.some(hashtag => item.hashtags.includes(hashtag));
    return matchesSearch && matchesFilter && matchesHashtags;
  });

  const handleHashtagChange = (hashtag) => {
    if (selectedHashtags.includes(hashtag)) {
      setSelectedHashtags(selectedHashtags.filter(h => h !== hashtag));
    } else {
      setSelectedHashtags([...selectedHashtags, hashtag]);
    }
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <div className="panel">
      <h2>{title}</h2>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <select 
        value={filterType} 
        onChange={(e) => setFilterType(e.target.value)} 
        className="filter-select"
      >
        <option value="All">All</option>
        <option value="New">New</option>
        <option value="Trending">Trending</option>
      </select>
      <div className="dropdown">
        <button onClick={toggleDropdown} className="dropdown-toggle">
          Filter by Hashtags {selectedHashtags.length > 0 && `(${selectedHashtags.length})`}
        </button>
        {dropdownOpen && (
          <div className="dropdown-menu">
            {hashtags.map(hashtag => (
              <label key={hashtag} className="hashtag-option">
                <input
                  type="checkbox"
                  checked={selectedHashtags.includes(hashtag)}
                  onChange={() => handleHashtagChange(hashtag)}
                />
                {hashtag}
              </label>
            ))}
          </div>
        )}
      </div>
      <ul>
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <li key={item.id}>
              <span className="item-title">{item.title}</span>
              {isVideoPanel ? (
                <img src={item.thumbnail} alt={item.title} className="item-thumbnail" />
              ) : (
                <img src={item.imageUrl} alt={item.title} className="item-thumbnail" />
              )}
              <span className="item-time"> - {item.createdAt.toLocaleTimeString()}</span>
            </li>
          ))
        ) : (
          <li className="no-items">No new items</li>
        )}
      </ul>
    </div>
  );
};

export default Dashboard;
