import React, { useState, useEffect } from 'react';
import './FileUpload.css'; // Ensure to import the CSS

const FileUpload = ({ label, multiple = true, accept, onChange }) => {
  const [previews, setPreviews] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const filePreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prevPreviews) => [...prevPreviews, ...filePreviews]);

    // Call the onChange function to update the parent component
    if (onChange) {
      onChange(files);
    }
  };

  useEffect(() => {
    // Cleanup function to revoke object URLs when the component unmounts
    return () => {
      previews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [previews]);

  return (
    <div className="file-upload">
      <label className="file-upload-label">{label}</label>
      <label className="upload-button">
        Choose Files
        <input
          type="file"
          className="file-upload-input"
          onChange={handleFileChange}
          multiple={multiple}
          accept={accept}
        />
      </label>
      {previews.length > 0 && (
        <div className="image-preview-section">
          <h3>File Previews</h3>
          <div className="image-preview-container">
            {previews.map((preview, index) => (
              <img key={index} src={preview} alt={`Preview ${index}`} className="image-preview" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
