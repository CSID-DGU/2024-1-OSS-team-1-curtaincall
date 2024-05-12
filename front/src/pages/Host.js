import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import guestData from './data.js'; // 실제 데이터 파일은 어떨까?
import CopyButton from '../component/JS/HostPageComp/CopyButton';
import GoToUploadButton from '../component/JS/HostPageComp/GoToUploadButton';
import GuestList from "../component/JS/HostPageComp/GuestList";

function Host() {
    const navigate = useNavigate();
    const [url, setUrl] = useState('');
    const [guests, setGuests] = useState(guestData); // guestData가 배열이라고 가정

    const [loading, setLoading] = useState(false);
    const handleClick = () => {
        if (loading) return;
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 700);
    };
    // 무작위 URL 생성 함수
    useEffect(() => {
        const randomUrl = 'https://yourapp.com/' + Math.random().toString(36).substring(2, 15);
        setUrl(randomUrl);
    }, []);

    // Upload.js로 이동하는 함수
    const goToUpload = () => {
        navigate('/upload', { state: { url, guests } });
    };

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
