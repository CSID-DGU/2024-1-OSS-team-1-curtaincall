import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import guestData from './data.jsx'; // 실제 데이터 파일은 어떨까?
import CopyButton from '../components/HostPageComp/CopyButton';
import GoToUploadButton from '../components/HostPageComp/GoToUploadButton';
import GuestList from "../components/HostPageComp/GuestList";

function Host() {
    const navigate = useNavigate();
    const [url, setUrl] = useState('');
    const [guests, setGuests] = useState(guestData); // guestData가 배열이라고 가정

    // 무작위 URL 생성 함수
    useEffect(() => {
        const randomUrl = 'https://yourapp.com/' + Math.random().toString(36).substring(2, 15);
        setUrl(randomUrl);
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
