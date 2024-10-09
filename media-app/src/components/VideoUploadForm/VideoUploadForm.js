import React, { useState, useEffect } from 'react';
import './VideoUploadForm.css';

const VideoUploadForm = ({ onAddVideo }) => {
  const [videoFile, setVideoFile] = useState(null);

  useEffect(() => {
    // Load videos from local storage on component mount
    const storedVideos = JSON.parse(localStorage.getItem('videos')) || [];

    // Ensure storedVideos is an array before iterating
    if (Array.isArray(storedVideos)) {
      storedVideos.forEach((video) => onAddVideo(video));
    }
  }, [onAddVideo]);

  const handleVideoChange = (event) => {
    setVideoFile(event.target.files[0]);
  };

  const handleAddVideo = () => {
    if (videoFile) {
        const newVideo = {
            videoUrl: URL.createObjectURL(videoFile),
            title: videoFile.name,
            description: 'Description for ' + videoFile.name,
        };

        // Lấy dữ liệu video từ localStorage
        let storedVideos = JSON.parse(localStorage.getItem('videos')) || []; // Sử dụng let thay vì const

        // Kiểm tra nếu storedVideos không phải là mảng
        if (!Array.isArray(storedVideos)) {
            console.error("Stored videos are not in the expected format. Initializing to empty array.");
            // Không cần khởi tạo lại, chỉ cần đảm bảo nó là mảng
            storedVideos = []; // Đây là dòng đã sửa
        }

        // Thêm video mới vào storedVideos
        storedVideos.push(newVideo);
        // Lưu lại vào localStorage
        localStorage.setItem('videos', JSON.stringify(storedVideos));

        // Gọi hàm để thêm video vào danh sách
        onAddVideo(newVideo);
        setVideoFile(null); // Reset video file sau khi thêm
        document.getElementById('videoFile').value = null; // Reset input file
    }
};


  return (
    <div className="video-upload-form">
      <label htmlFor="videoFile" className="file-input-label">
        Choose File
      </label>
      <input 
        type="file" 
        id="videoFile" 
        onChange={handleVideoChange} 
        hidden 
      />
      <button 
        onClick={handleAddVideo} 
        disabled={!videoFile} 
        className="add-btn"
      >
        Add Video
      </button>
      {videoFile && (
        <div className="preview">
          <p>Selected File: {videoFile.name}</p>
          <video controls width="200">
            <source src={URL.createObjectURL(videoFile)} type={videoFile.type} />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default VideoUploadForm;
