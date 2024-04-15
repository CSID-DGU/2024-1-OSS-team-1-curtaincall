import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import guestData from './data.js'; // 실제 데이터 파일은 어떨까?

function Host() {
    const navigate = useNavigate();
    const [url, setUrl] = useState('');
    const [guests, setGuests] = useState(guestData); // guestData가 배열이라고 가정

    // 무작위 URL 생성 함수
    useEffect(() => {
        const randomUrl = 'https://yourapp.com/' + Math.random().toString(36).substring(2, 15);
        setUrl(randomUrl);
    }, []);

    // 클립보드에 URL 복사하는 함수
    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(url);
            alert('URL이 클립보드에 복사되었습니다!');
        } catch (err) {
            console.error('복사 실패: ', err);
        }
    };

    // Upload.js로 이동하는 함수
    const goToUpload = () => {
        navigate('/upload', { state: { url, guests } });
    };

    return (
        <>
            <br/>
            <h2>당신의 URL: {url} <Button onClick={copyToClipboard}>복사</Button></h2>
            <br/>
            <Container>
                <Row xs="auto">
                    {guests.map(guest => (
                        <Col xs={12} sm={6} md={4} lg={3} key={guest.id}>게스트: {guest.name}</Col>
                    ))}
                </Row>
            </Container>
            <br/>
            <Button variant="danger" onClick={goToUpload}>업로드 페이지 입장</Button>
        </>
    );
}

export default Host;
