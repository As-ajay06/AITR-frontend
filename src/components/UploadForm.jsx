import React, { useState, useRef } from "react";
import axios from "axios";

import { BASE_URL } from "../../config/config";

export default function UploadForm({ url }) {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click(); // open file dialog
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsUploading(true);
      const res = await axios.post(`${BASE_URL}/${url}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Instead of 'insertedCount', log/display the JSON data
      alert("File converted successfully! Check console for JSON data.");
      console.log("JSON Data:", res.data.data);

    } catch (err) {
      console.error(err);
      alert("Upload failed!");
    } finally {
      setIsUploading(false);
      setFile(null);
      fileInputRef.current.value = ""; // reset file input
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
    >
      <input
        type="file"
        accept=".xlsx,.xls,.csv"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <button
        type="button"
        onClick={handleButtonClick}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 shadow"
        disabled={isUploading}
      >
        {file ? `Selected: ${file.name}` : "Upload file"}
      </button>

      {file && (
        <button
          type="submit"
          className={`px-6 py-2 rounded-lg text-white font-semibold transition duration-200 ${isUploading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
            }`}
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Upload Data"}
        </button>
      )}
    </form>
  );
}
