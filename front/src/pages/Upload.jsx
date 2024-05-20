import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import localuri from './localuri.jsx';
import UploadButton from "../components/UploadPageComp/UploadButton";
import FileInputButton from "../components/UploadPageComp/FileInputButton";

function Upload(){
    const [files, setFiles] = useState([]);
    const navigate = useNavigate();

  
    const handleFileChange = (event) => {
      // 선택된 모든 파일을 상태에 저장합니다.
      setFiles(event.target.files);
    };

    const handleSubmit = (event) => {
        console.log('upload');
      event.preventDefault();


      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append(`photo`, files[i]);
      }
      formData.append('host', 'reacthost');

      const xhr = new XMLHttpRequest();
      
      xhr.open('POST', 'http://' + localuri + '/CurtainCallApp/image/');
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          navigate('/Sort');
        } else {
          throw new Error('Something went wrong during the upload.');
        }
      };
      xhr.onerror = () => console.error('An error occurred:', xhr.statusText);
      xhr.send(formData);
      /*
  
      const formData = new FormData();
  
      // 선택된 각 파일을 formData에 추가합니다.
      for (let i = 0; i < files.length; i++) {
        formData.append(`photo`, files[i]);
      }
      formData.append('host', 'reacthost');
  
      fetch('http://127.0.0.1:8000/CurtainCallApp/image/', {
        method: 'POST',
        body: formData,
      })
      .then(response => {
        if (response.ok) {
          navigate('/Sort');
        } else {
          throw new Error('Something went wrong during the upload.');
        }
      })
      .catch(error => {
        console.error('An error occurred:', error);
      });
      */
    };
  
    return (
        <form onSubmit={handleSubmit}>
            <FileInputButton onChange={handleFileChange} />
            <UploadButton>업로드</UploadButton>
        </form>
    );
}

export default Upload;