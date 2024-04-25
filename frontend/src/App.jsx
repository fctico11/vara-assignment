import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('File uploaded successfully');
    } catch (error) {
      alert(`Error uploading file: ${error.response && error.response.data}`);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleFileUpload}>Upload CSV</button>
      </header>
    </div>
  );
}

export default App;



