// FileUpload.js
import React, { useRef } from 'react';
import './FileUpload.css'; // Import CSS for FileUpload

const FileUpload = ({ onUpload }) => {
  const fileInputRef = useRef(null); // Reference to the hidden file input

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the uploaded file
    if (file) {
      onUpload(file); // Call the onUpload prop with the selected file
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Trigger click on the hidden file input
  };

  return (
    <div className="file-upload">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }} // Hide the file input
      />
      <button onClick={handleButtonClick} className="upload-button">
        Choose File
      </button>
    </div>
  );
};

export default FileUpload;
