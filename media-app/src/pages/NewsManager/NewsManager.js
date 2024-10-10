import React, { useState, useEffect } from 'react';
import { FaLock } from 'react-icons/fa';
import './NewsManager.css';
import BaseLayout from '../../components/Layout/BaseLayout/BaseLayout';
import TextInput from '../../components/Common/TextInput/TextInput';
import FileUpload from '../../components/Common/FileUpload/FileUpload';
import ThumbnailUpload from '../../components/Common/ThumbnailUpload/ThumbnailUpload';

const NewsManager = () => {
  const [news, setNews] = useState({
    title: '',
    thumbnailImages: [],
    content: '',
    images: [],
    videoEmbed: '',
    author: '',
    publicationDate: '',
    status: 'Draft',
    category: '',
    tags: '',
    allowComments: false,
    isFeatured: false,
    attachments: [],
    relatedArticles: '',
    sourceLink: '',
    imagePreviews: [],
    attachmentPreviews: [],
    thumbnailPreviews: [],
  });

  const [newsList, setNewsList] = useState([]);

  // Load newsList from localStorage on component mount
  useEffect(() => {
    const storedNewsList = JSON.parse(localStorage.getItem('newsList'));
    if (storedNewsList) {
      setNewsList(storedNewsList);
    }
  }, []);

  // Cleanup for object URLs when component unmounts or news changes
  useEffect(() => {
    return () => {
      [...news.imagePreviews, ...news.thumbnailPreviews, ...news.attachmentPreviews].forEach(preview => {
        URL.revokeObjectURL(preview);
      });
    };
  }, [news]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNews((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageUpload = (files) => {
    const validFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    const previews = validFiles.map(file => URL.createObjectURL(file));
    setNews((prev) => ({
      ...prev,
      images: [...prev.images, ...validFiles],
      imagePreviews: [...prev.imagePreviews, ...previews],
    }));
  };

  const handleThumbnailUpload = (files) => {
    const validFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    const previews = validFiles.map(file => URL.createObjectURL(file));
    setNews((prev) => ({
      ...prev,
      thumbnailImages: [...prev.thumbnailImages, ...validFiles],
      thumbnailPreviews: [...prev.thumbnailPreviews, ...previews],
    }));
  };

  const handleFileUpload = (files) => {
    const validFiles = Array.from(files);
    const previews = validFiles.map(file => file.name);
    setNews((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...validFiles],
      attachmentPreviews: [...prev.attachmentPreviews, ...previews],
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedNewsList = [...newsList, news];
    setNewsList(updatedNewsList);
    localStorage.setItem('newsList', JSON.stringify(updatedNewsList)); // Save to localStorage
    clearForm();
  };

  const clearForm = () => {
    setNews({
      title: '',
      thumbnailImages: [],
      content: '',
      images: [],
      videoEmbed: '',
      author: '',
      publicationDate: '',
      status: 'Draft',
      category: '',
      tags: '',
      allowComments: false,
      isFeatured: false,
      attachments: [],
      relatedArticles: '',
      sourceLink: '',
      imagePreviews: [],
      attachmentPreviews: [],
      thumbnailPreviews: [],
    });
  };

  return (
    <BaseLayout>
      <div className="news-manager">
        <h1 className="news-title">Manage News Article</h1>
        <form className="news-form" onSubmit={handleFormSubmit}>
          <TextInput label="Title" name="title" value={news.title} onChange={handleChange} required />
          <ThumbnailUpload
            label="Thumbnail Images"
            onChange={handleThumbnailUpload}
            previews={news.thumbnailPreviews}
          />
          <TextInput label="Content" name="content" value={news.content} onChange={handleChange} required />
          <FileUpload
              label="Upload Images"
              onChange={handleImageUpload}
              previews={news.imagePreviews}
              multiple
            />
          <TextInput label="Video Embed URL" name="videoEmbed" value={news.videoEmbed} onChange={handleChange} />
          <TextInput label="Author Name" name="author" value={news.author} onChange={handleChange} />
          <TextInput
            label="Publication Date"
            type="datetime-local"
            name="publicationDate"
            value={news.publicationDate}
            onChange={handleChange}
            required
          />
          
          <div className="form-group">
            <label>Status</label>
            <select name="status" value={news.status} onChange={handleChange} className="custom-select">
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
              <option value="Scheduled">Scheduled</option>
            </select>
          </div>

          <div className="form-group">
            <label>Category</label>
            <select name="category" value={news.category} onChange={handleChange} className="custom-select">
              <option value="">Select a category</option>
              <option value="News">News</option>
              <option value="Music">Music</option>
              <option value="K-Pop">K-Pop</option>
              <option value="Fashion">Fashion</option>
            </select>
          </div>

          <TextInput label="Tags (comma-separated)" name="tags" value={news.tags} onChange={handleChange} />
          <FileUpload
            label="Attachments (PDF, Docs)"
            onChange={handleFileUpload}
            previews={news.attachmentPreviews}
            multiple
            accept=".pdf,.doc,.docx"
          />
          <button type="submit" className="submit-button">Add Article</button>
        </form>

        <div className="news-list">
          {newsList.map((item, index) => (
            <div key={index} className="news-item">
              <h3 className="news-title">
                {item.title}
                {item.status === 'Draft' && <FaLock className="lock-icon" />}
              </h3>

              {/* Thumbnail Section */}
              <div className="news-thumbnail">
                <div className="thumbnail-scroll">
                  {item.thumbnailPreviews.map((thumbnail, thumbIndex) => (
                    <img
                      key={thumbIndex}
                      src={thumbnail} // URL for the thumbnail
                      alt={`Thumbnail ${thumbIndex + 1}`}
                      className="thumbnail-preview"
                    />
                  ))}
                </div>
              </div>

              {/* Uploaded Images Section */}
              <div className="uploaded-images">
                {item.imagePreviews.map((img, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={img} // URL for the uploaded image
                    alt={`Uploaded ${imgIndex + 1}`}
                    className="uploaded-image"
                  />
                ))}
              </div>

              {/* News Content */}
              <div className="news-content">
                <p>{item.content}</p>
                <p><strong>Author:</strong> {item.author}</p>
                <p><strong>Publication Date:</strong> {new Date(item.publicationDate).toLocaleString()}</p>
                <p><strong>Status:</strong> {item.status}</p>
                <p><strong>Category:</strong> {item.category}</p>
                <p><strong>Tags:</strong> {item.tags}</p>
                <p><strong>Source Link:</strong> <a href={item.sourceLink} target="_blank" rel="noopener noreferrer">{item.sourceLink}</a></p>
                <p><strong>Related Articles:</strong> {item.relatedArticles}</p>
                {item.attachments.length > 0 && (
                  <div>
                    <strong>Attachments:</strong>
                    <ul>
                      {item.attachmentPreviews.map((attachment, attachmentIndex) => (
                        <li key={attachmentIndex}>{attachment}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </BaseLayout>
  );
};

export default NewsManager;
