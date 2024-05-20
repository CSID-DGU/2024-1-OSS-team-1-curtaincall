import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import localuri from './localuri.jsx';
import UploadButton from "../components/UploadPageComp/UploadButton";
import FileInputButton from "../components/UploadPageComp/FileInputButton";

function Upload() {
    const [files, setFiles] = useState([]);
    const navigate = useNavigate();

    const handleFileChange = (renamedFiles) => {
        setFiles(renamedFiles);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append(`photo`, files[i]);
        }
        formData.append('host', 'reacthost');

        try {
            const response = await axios.post(`http://${localuri}/CurtainCallApp/image/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status >= 200 && response.status < 300) {
                navigate('/Sort');
            } else {
                throw new Error('Something went wrong during the upload.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <FileInputButton onChange={handleFileChange} />
            <UploadButton>업로드</UploadButton>
        </form>
    );
}

export default Upload;
