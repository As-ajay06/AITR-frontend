import React, { useState } from 'react';
import axios from 'axios';

const ExcelUploader = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:3000/upload-excel', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage(res.data.message);
    } catch (error) {
      console.error(error);
      setMessage('Upload failed');
    }
  };

  return (
    <div>
      <h2>Upload Hackathon Excel File</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ExcelUploader;
