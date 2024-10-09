import React, { useEffect, useState } from 'react';
import BaseLayout from '../../components/Layout/BaseLayout/BaseLayout';
import './GalleryManager.css';

const GalleryManager = () => {
  const [images, setImages] = useState({
    artistPhotos: [],
    albumCovers: [],
    stageGallery: [],
    fanArt: [],
    fashion: [],
    memorabilia: [],
  });

  const [activeTab, setActiveTab] = useState('artistPhotos');

  // Restore images from localStorage
  useEffect(() => {
    const storedImages = JSON.parse(localStorage.getItem('galleryImages')) || {
      artistPhotos: [],
      albumCovers: [],
      stageGallery: [],
      fanArt: [],
      fashion: [],
      memorabilia: [],
    };
    setImages(storedImages);
  }, []);

  const handleAddImage = (image, galleryType) => {
    setImages((prevImages) => {
      const updatedImages = {
        ...prevImages,
        [galleryType]: [...(prevImages[galleryType] || []), image],
      };
      localStorage.setItem('galleryImages', JSON.stringify(updatedImages)); // Save to localStorage
      return updatedImages;
    });
  };

  return (
    <BaseLayout>
      <div className="gallery-manager">
        <h1 className="gallery-manager__title">Gallery Manager</h1>

        {/* Tabs */}
        <div className="gallery-tabs">
          {['artistPhotos', 'albumCovers', 'stageGallery', 'fanArt', 'fashion', 'memorabilia'].map((tab) => (
            <button
              key={tab}
              className={`tab-button ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.replace(/([A-Z])/g, ' $1').trim()} Gallery
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="gallery-manager__content">
          <ImageUploadForm onAddImage={handleAddImage} selectedGallery={activeTab} />
          <ImageGrid images={images[activeTab]} />
        </div>
      </div>
    </BaseLayout>
  );
};

// ImageUploadForm component for uploading images
const ImageUploadForm = ({ onAddImage, selectedGallery }) => {
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleAddImage = () => {
    if (imageFile) {
      const newImage = {
        imageUrl: URL.createObjectURL(imageFile), // Create a URL for the uploaded file
        title: imageFile.name,
      };
      onAddImage(newImage, selectedGallery); // Call the passed function to add image
      setImageFile(null); // Clear the input after adding the image
    }
  };

  return (
    <div className="image-upload-form">
      <div className="upload-controls">
        <input
          type="file"
          id="imageFile"
          onChange={handleImageChange}
          accept="image/*"
          hidden
        />
        <label htmlFor="imageFile" className="file-input-label choose-btn">
          Choose Image
        </label>
        <button
          onClick={handleAddImage}
          disabled={!imageFile}
          className="add-btn"
        >
          Add Image
        </button>
      </div>

      {imageFile && (
        <div className="preview">
          <p className="preview-title">Selected File: {imageFile.name}</p>
          <img
            src={URL.createObjectURL(imageFile)}
            alt="preview"
            className="preview-image"
          />
        </div>
      )}
    </div>
  );
};

// Component to display images
const ImageGrid = ({ images }) => {
  if (!Array.isArray(images)) {
    return <p>No images available.</p>; // Fallback message if images is not an array
  }

  return (
    <div className="image-grid">
      {images.length === 0 ? (
        <p>No images in this gallery.</p> // Optional: message when no images are present
      ) : (
        images.map((image, index) => (
          <div key={index} className="image-grid__item">
            <img src={image.imageUrl} alt={image.title} className="grid-image" />
            <p className="grid-image-title">{image.title}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default GalleryManager;
