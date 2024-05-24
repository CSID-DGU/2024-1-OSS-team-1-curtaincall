import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import localuri from './localuri.js';
import UploadButton from "../component/UploadPageComp/UploadButton";
import FileInputButton from "../component/UploadPageComp/FileInputButton";
import axios from 'axios';

function Upload() {
    const [files, setFiles] = useState([]);
    const navigate = useNavigate();

    const handleFileChange = (selectedFiles) => {
        // 선택된 모든 파일을 상태에 저장합니다.
        setFiles(selectedFiles);
        console.log('Selected files:', selectedFiles);  // 선택된 파일 로그 출력
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('upload started');

        if (files.length === 0) {
            console.log('No files to upload');
            return;
        }

        // 파일 이름 배열 생성
        const imageList = files.map(file => file.name);

        // 서버에 presigned URL 요청
        try {
            const response = await axios.post('http://127.0.0.1:8000/Image/presigned-url/', {
                image_list: imageList
            });

            

            // S3에 파일 업로드
            const presignedUrls = response.data.url;

            console.log('Received presigned URLs:', presignedUrls);
            
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const presignedUrl = presignedUrls[i];
                const uploadResponse = await axios.put(presignedUrl, file, {
                    headers: {
                        'Content-Type': file.type
                    }
                });

                if (uploadResponse.status === 200) {
                    console.log(`File ${file.name} uploaded successfully.`);
                } else {
                    console.log(`File ${file.name} upload failed.`);
                }
            }

            // 모든 파일 업로드 후 페이지 이동 등 추가 작업 수행
            navigate('/Sort');  // 성공적으로 업로드 후 리다이렉트할 경로
        } catch (error) {
            console.error('Error during file upload:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <FileInputButton onChange={handleFileChange} />
            <input type="submit" value="Upload" />
        </form>
    );
}

export default Upload;
