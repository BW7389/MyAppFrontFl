import React from 'react';
import './ThumbnailUpload.css'; // Ensure to import the CSS

const ThumbnailUpload = ({ label, onChange, previews }) => (
  <div className="thumbnail-upload">
    <label>{label}</label>
    <input
      type="file"
      accept="image/*"
      onChange={(e) => onChange(Array.from(e.target.files))}
      multiple
      id="file-upload" // Assign an id for styling
    />
    <label htmlFor="file-upload" className="upload-button">Upload Images</label> {/* Custom button label */}
    {previews.length > 0 && (
      <div className="image-preview-section">
        <h3>Thumbnail Previews</h3>
        <div className="image-preview-container">
          {previews.map((preview, index) => (
            <img key={index} src={preview} alt={`Thumbnail Preview ${index + 1}`} className="image-preview" />
          ))}
        </div>
      </div>
    )}
  </div>
);

export default ThumbnailUpload;
