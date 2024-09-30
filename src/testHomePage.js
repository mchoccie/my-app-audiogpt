import React, { useState } from "react";
import axios from "axios";
import logo from "./images/logo.png";

function TestHomePage() {
  const token = localStorage.getItem('authToken');
  const apiUrl = process.env.REACT_APP_API_URL;
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [msg, setMsg] = useState(null);
  const [error, setError] = useState('');
  const audioName = "my_audio";

  function handleUpload() {
    if (!file) {
      setError("No file selected");
      return;
    }

    if (file.type.startsWith('audio/')) {
      setError('');
    } else {
      setError('Please upload a valid audio file.');
      return;
    }

    const fd = new FormData();
    fd.append('audio_file', file);
    fd.append('audio_name', audioName);

    setMsg("Uploading...");
    setProgress({ started: true, pc: 0 });

    axios.post(`${apiUrl}/api/add-audio`, fd, {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setProgress({ started: true, pc: percentCompleted });
        console.log(percentCompleted);
      },
      headers: {
        "Authorization": `Token ${token}`,
        "Content-Type": "multipart/form-data",
      }
    })
    .then(res => {
      setMsg("Upload successful");
      console.log(res.data);
    })
    .catch(err => {
      setMsg("Upload failed");
      console.error(err);
    });
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray px-4 pt-20"> {/* Added pt-20 for padding */}
      <img src={logo} alt="Description of the image" className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 mb-8" />
      
      <div className="outline-dashed p-8 bg-vanilla rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Please Upload Your Audio File (mp3)</h1>
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <input
            className="p-2 border border-gray-300 bg-white rounded-lg w-full sm:w-auto"
            onChange={(e) => { setFile(e.target.files[0]) }}
            type="file"
            accept="audio/*"
          />
          <button
            className="bg-brown text-white px-4 py-2 rounded-lg hover:bg-raisin w-full sm:w-auto"
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>
        {msg && <p className="mt-4 text-green-600 text-center">{msg}</p>}
        {progress.started && <p className="mt-2 text-center">Progress: {progress.pc}%</p>}
        {error && <p className="mt-2 text-red-600 text-center">{error}</p>}
      </div>
    </div>
  );
}

export default TestHomePage;
