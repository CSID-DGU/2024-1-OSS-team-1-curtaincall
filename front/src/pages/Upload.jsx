import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import api from '../axios';
import CopyButton from '../components/HostPageComp/CopyButton';
import GoToUploadButton from '../components/HostPageComp/GoToUploadButton';
import GuestList from '../components/HostPageComp/GuestList';
import HostPageInputButton from "../components/GusetPageComp/HostPageInputButton";
import CustomContainer from "../components/ContainerComp/CustomContainer";
import FileInputButton from "../components/UploadPageComp/FileInputButton";
import UploadButton from "../components/UploadPageComp/UploadButton";
import { stageState, isHostState } from "../atom/atom";
import {Paper, useMediaQuery, useTheme} from "@mui/material";

function Upload() {
    const navigate = useNavigate();
    const [guests, setGuests] = useState([]);
    const [stageId, setStageId] = useRecoilState(stageState);
    const [files, setFiles] = useState([]);
    const isHost = useRecoilValue(isHostState);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        console.log("isHost : ", isHost);
    }, [isHost]);

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

        const imageList = files.map(file => file.name);

        try {
            const response = await api.post('/Image/presigned-url/', {
                image_list: imageList
            });

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
                    if(isHost) {
                        navigate('/Sort');
                    } else {
                        navigate('/await');
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
        <CustomContainer style={{ flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'center' : 'flex-start' }}>
            <Paper elevation={3} style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: '#f0f0f0',
                padding: '16px',
                margin: '8px',
                width: '100%',
                height: isMobile ? '40vh' : '60vh',
                borderRadius: '0',
                overflow: 'auto'
            }}>
                <GuestList guests={guests} />
            </Paper>
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '16px',
                margin: '8px'
            }}>
                {isHost && <h2><CopyButton>복사</CopyButton></h2>}
                <form onSubmit={handleSubmit}>
                    <FileInputButton onChange={handleFileChange}/>
                    <UploadButton>Upload</UploadButton>
                </form>
            </div>
        </CustomContainer>
    );
}

export default Upload;
