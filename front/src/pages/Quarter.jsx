import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Navbar } from 'react-bootstrap';
import localuri from './localuri.jsx';

function Quater() {
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수 사용
    const [currentRound, setCurrentRound] = useState(0); // 현재 라운드 상태 관리 (초기값 0)
    const [selectedImages, setSelectedImages] = useState([]); // 선택된 이미지들의 상태 관리 (초기값 빈 배열)
    const [data, setData] = useState([]); // API에서 가져온 데이터를 저장할 상태
    const [tournament, setTournament] = useState([]); // 토너먼트 진행을 위한 상태

    useEffect(() => {
        // Django API 엔드포인트로부터 이미지 URL을 가져옵니다.
        fetch('http://' + localuri + ':8000/CurtainCallApp/requestImage/')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(_data => {
                // 입력된 데이터 설정
                setData(_data);

                // 입력된 사진의 개수 계산
                let N = _data.length;

                // 부전승 데이터 추가 (총 이미지 개수가 4의 배수가 되도록)
                let temp = 0;
                if (N % 4 !== 0) {
                    temp = 4 - (N % 4);
                }

                // 초기 토너먼트 배열 생성 및 채우기
                let initialTournament = [..._data];
                for (let i = 0; i < temp; i++) {
                    initialTournament.push({ id: 'dummy', src: 'dummy_image_url', group_id: Math.ceil(N / 4) });
                }
                setTournament(initialTournament); // 토너먼트 상태 설정
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
            });
    }, []);

    // 전체 라운드 수 계산 (토너먼트 배열의 길이를 4로 나눈 후 올림)
    const totalRounds = Math.ceil(tournament.length / 4);

    const handleSelectImage = (image) => {
        setSelectedImages(prevSelectedImages => {
            const newSelectedImages = [...prevSelectedImages, image]; // 선택된 이미지를 새로운 배열로 생성
            if (currentRound < totalRounds - 1) {
                // 다음 라운드를 위해 배열을 갱신
                const nextRoundImages = [];
                for (let i = 0; i < tournament.length; i += 4) {
                    const winners = newSelectedImages.slice(i, i + 4); // 각 그룹의 승자들을 추출
                    nextRoundImages.push(...winners);
                }
                setTournament(nextRoundImages); // 토너먼트 배열을 갱신
                setCurrentRound(currentRound + 1); // 다음 라운드로 이동
            } else {
                navigate('/choose', { state: { selectedImages: newSelectedImages } }); // 마지막 라운드이면 결과 페이지로 이동
            }
            return newSelectedImages;
        });
    };

    // 현재 라운드의 이미지를 그룹화
    function grouped(data, num) {
        return data.reduce((groups, item) => {
            if (item.group_id === num) {
                groups.push(item); // 현재 그룹에 속하는 항목을 배열에 추가
            }
            return groups;
        }, []);
    }

    // 현재 라운드의 이미지들 계산
    const roundImages = grouped(tournament, currentRound + 1);

    return (
        <div>
            <Navbar className="bg-body-tertiary">
                <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ff4d4d' }}>
                    <Navbar.Brand style={{ color: 'white' }}>Round {currentRound + 1}/{totalRounds}</Navbar.Brand>
                </Container>
            </Navbar>
            <Container fluid="md" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                {roundImages.map((image) => (
                    <Row key={image.id}>
                        <Col onClick={() => handleSelectImage(image)}>
                            <img src={image.src} alt={`Option ${image.id}`} style={{ width: '100%', height: 'auto' }} />
                        </Col>
                    </Row>
                ))}
            </Container>
        </div>
    );
}

export default Quater;
