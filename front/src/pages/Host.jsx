import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CopyButton from '../components/HostPageComp/CopyButton';
import GoToUploadButton from '../components/HostPageComp/GoToUploadButton';
import GuestList from '../components/HostPageComp/GuestList';
import api from '../axios';
import HostPageInputButton from "../components/GusetPageComp/HostPageInputButton";
import {useRecoilState} from "recoil";
import {gusetInstate, stageState} from "../atom/atom";

function Host() {
    const navigate = useNavigate();
    const [url, setUrl] = useState('');
    const [guests, setGuests] = useState([]);
    const [stageId, setStageId] = useRecoilState(stageState);
    const [name, setName] = useState('호스트');

    // 무작위 URL 생성 함수
    useEffect(() => {
        const randomUrl = 'https://yourapp.com/' + Math.random().toString(36).substring(2, 15);
        setUrl(randomUrl);
    }, []);
    const fetchGuests = async () => {
        try {
            const response = await api.get('/Stage/checkStageUsers/', {
                params: {
                    stageId: stageId
                }
            });

            if (response.status === 200) {
                const guestData = response.data.users.map(user => ({
                    name: user.user,
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


    useEffect(() => {

        fetchGuests();
    }, []);

    useEffect(() => {
        const intervalId = setInterval(fetchGuests, 5000); // 5초마다 실행
        return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 해제
    }, []);

    return (
        <>
            <br/>
            <h2><CopyButton url={stageId}>복사</CopyButton></h2>
            <br/>
            <GuestList guests={guests}/>
            <br/>
            <HostPageInputButton name={name} conststageId={stageId}>업로드 페이지 입장</HostPageInputButton>
        </>
    );
}

export default Host;
