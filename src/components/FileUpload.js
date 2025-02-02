import React, { useState } from 'react';
import axios from 'axios';
import "../styles/upload.css"; 

const FileUpload = ({onUploadSuccess}) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      setError('Please select a file to upload');
      return;
    }
    console.log("in func")

    const formData = new FormData();
    formData.append('file', file);
    console.log("in func", file)

   
      setUploadStatus('Uploading...');
      console.log("in func", formData)

      try {
        const response = await fetch("https://excelimporter-backend.onrender.com/api/upload", {
            method: "POST",
            body: formData
        });

        if (!response.ok) throw new Error("Upload failed");

        const data = await response.json();
        setUploadStatus('File uploaded successfully!');
      console.log(response.data, data); // Check the response from the server


      
    try{
      // If file upload successful, call the import API
      const importResponse = await axios.post('https://excelimporter-backend.onrender.com/api/import', {
        validRows: data.data,
      });

      console.log(importResponse.data.message); // You can handle the import result here
      onUploadSuccess(data.data)
    } catch (error) {
      if (error.response) {
        setError(`Error: ${error.response.data}`);
      } else {
        setError('File upload failed. Please try again.');
      }
      setUploadStatus('');
    }

        // setMessage(`Upload successful: ${data.filename}`);
    } catch (error) {
        console.error("Error uploading file:", error);
        // setMessage("Upload failed");
    } 
}

      
  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
      {uploadStatus && <p>{uploadStatus}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default FileUpload;
