import React from 'react';
import Slider from 'react-slick'; // Ensure you have this import
import './Carousel.css'; // Ensure you have this import

const CarouselItem = ({ item, type }) => {
  return (
    <div className="carousel-content">
      {type === 'videos' ? (
        <div>
          <h3 className="video-title">{item.title}</h3>
          <p className="video-time">{item.createdAt ? item.createdAt.toLocaleTimeString() : 'Unknown time'}</p>
        </div>
      ) : type === 'gallery' ? (
        <div>
          {item.imageUrl ? (
            <img src={item.imageUrl} alt={item.title} className="item-image" />
          ) : (
            <div className="no-image">No Image Available</div>
          )}
          <h3 className="image-title">{item.title}</h3>
        </div>
      ) : (
        <div>
          <h3 className="news-title">{item.title}</h3>
          <p className="news-time">{item.createdAt ? item.createdAt.toLocaleTimeString() : 'Unknown time'}</p>
        </div>
      )}
    </div>
  );
};

const Carousel = ({ items, type }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className="carousel">
      <h2 className="carousel-title">
        {type === 'videos'
          ? 'Newly Released Videos in Last 24 Hours'
          : type === 'gallery'
          ? 'Latest Gallery Images'
          : 'Latest News'}
      </h2>
      <Slider {...settings}>
        {items.length > 0 ? (
          items.map(item => (
            <div key={item.id} className="carousel-item">
              <CarouselItem item={item} type={type} />
            </div>
          ))
        ) : (
          <div className="carousel-item">
            <h3 className="no-items">No new items available</h3>
          </div>
        )}
      </Slider>
    </div>
  );
};

export default Carousel;
