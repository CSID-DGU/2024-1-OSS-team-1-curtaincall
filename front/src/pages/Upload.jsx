import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CopyButton from '../components/HostPageComp/CopyButton';
import GoToUploadButton from '../components/HostPageComp/GoToUploadButton';
import GuestList from '../components/HostPageComp/GuestList';
import api from '../axios';
import HostPageInputButton from "../components/GusetPageComp/HostPageInputButton";
import {useRecoilState, useRecoilValue} from "recoil";
import {stageState, isHostState} from "../atom/atom";
import CustomContainer2 from "../components/CustomContainer2";
import CustomContainer from "../components/ContainerComp/CustomContainer";
import FileInputButton from "../components/UploadPageComp/FileInputButton";
import UploadButton from "../components/UploadPageComp/UploadButton";
import axios from "axios";

function Upload() {
    const navigate = useNavigate();
    const [guests, setGuests] = useState([]);
    const [stageId, setStageId] = useRecoilState(stageState);
    const [files, setFiles] = useState([]);
    const isHost = useRecoilValue(isHostState);

    useEffect(() => {
        console.log("isHost : ", isHost);
    }
    , [isHost]);

    useEffect(() => {
        console.log('Stage ID:', stageId);
    }, [stageId]);

    const handleFileChange = (renamedFiles) => {
        setFiles(renamedFiles);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

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
                    if(isHost === true) {
                        navigate('/Sort');
                    }
                    else {
                        navigate('/await')// 성공적으로 업로드 후 리다이렉트할 경로
                    }
                } else {
                    console.log(`File ${file.name} upload failed.`);
                    alert('파일 업로드에 실패하였습니다. 관리자에게 문의하세요.');
                }
            }


        } catch (error) {
            console.error('Error during file upload:', error);
        }
    };

    const fetchGuests = async () => {
        try {
            const response = await api.get('/Stage/checkStageUsers/', {
                params: {
                    stageId: stageId
                }
            });

            if (response.status === 200) {
                const guestData = response.data.users.map(user => ({
                    username: user.username,
                    user_ready: user.user_ready
                }));
                setGuests(guestData);
            } else {
                console.error('Failed to fetch guests');
            }
        } catch (error) {
            console.error('Error fetching guests:', error);
        }
    };


    useEffect(() => {

        fetchGuests();
    }, []);

    useEffect(() => {
        const intervalId = setInterval(fetchGuests, 5000); // 5초마다 실행
        return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 해제
    }, []);

    return (
        <CustomContainer>

            <GuestList guests={guests}/>
            <br/>
            <br/>
            {isHost === true ? (<h2><CopyButton url={stageId}>복사</CopyButton></h2>) : null}
            <form onSubmit={handleSubmit}>
                <FileInputButton onChange={handleFileChange}/>
                <UploadButton>Upload</UploadButton>
            </form>
        </CustomContainer>
    );
}

export default Upload;
