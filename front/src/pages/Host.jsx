import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CopyButton from '../components/HostPageComp/CopyButton';
import GoToUploadButton from '../components/HostPageComp/GoToUploadButton';
import GuestList from '../components/HostPageComp/GuestList';
import api from '../axios';

function Host() {
    const navigate = useNavigate();
    const [url, setUrl] = useState('');
    const [guests, setGuests] = useState([]);

    // 무작위 URL 생성 함수
    useEffect(() => {
        const randomUrl = 'https://yourapp.com/' + Math.random().toString(36).substring(2, 15);
        setUrl(randomUrl);
    }, []);

    useEffect(() => {
        const fetchGuests = async () => {
            try {
                const response = await api.get('/checkStageUsers/', {
                    params: {
                        stageId: 0 // 실제 스테이지 ID를 설정
                    }
                });

                if (response.status === 200) {
                    const guestData = response.data.users.map(user => ({
                        id: user.user.id,
                        name: user.user.name,
                        sendImage: user.sendImage
                    }));
                    setGuests(guestData);
                } else {
                    console.error('Failed to fetch guests');
                }
            } catch (error) {
                console.error('Error fetching guests:', error);
            }
        };

        fetchGuests();
    }, []);

    return (
        <>
            <br/>
            <h2><CopyButton url={url}>복사</CopyButton></h2>
            <br/>
            <GuestList guests={guests}/>
            <br/>
            <GoToUploadButton>업로드 페이지 입장</GoToUploadButton>
        </>
    );
}

export default Host;
