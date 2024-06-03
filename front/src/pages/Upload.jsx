import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import api from '../axios.js'
import UploadButton from "../components/UploadPageComp/UploadButton";
import FileInputButton from "../components/UploadPageComp/FileInputButton";
import CustomContainer from "../components/CustomContainer";

function Upload() {
    const [files, setFiles] = useState([]);
    const navigate = useNavigate();

    const handleFileChange = (renamedFiles) => {
        setFiles(renamedFiles);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        /* previous code
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append(`photo`, files[i]);
        }
        formData.append('host', 'reacthost');
        */ 

        if (files.length === 0) {
            console.log('No files to upload');
            return;
        }

        // 파일 이름 배열 생성
        const imageList = files.map(file => file.name);        

        try {
            const response = await api.post('/Image/presigned-url/', {
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
                    // 모든 파일 업로드 후 페이지 이동 등 추가 작업 수행
                    navigate('/Sort');  // 성공적으로 업로드 후 리다이렉트할 경로

                    /*
                    원래는 Polling을 하고 서버에서 모든 이들이 READY상태가 되었을 때 다음으로 넘어 갈 수 있다.
                    */
                } else {
                    console.log(`File ${file.name} upload failed.`);
                    alert('파일 업로드에 실패하였습니다. 관리자에게 문의하세요.');
                }
            }

            
        } catch (error) {
            console.error('Error during file upload:', error);
        }
    };

    return (
        <CustomContainer>
        <form onSubmit={handleSubmit}>
            <FileInputButton onChange={handleFileChange} />
            <UploadButton>Upload</UploadButton>
        </form>
        </CustomContainer>
    );
}

export default Upload;
