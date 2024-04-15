import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import data from './data.js'; 

function Quater() {
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수 사용
    const [currentRound, setCurrentRound] = useState(0);// 현재 라운드 상태 관리 (초기값 0)
    const [selectedImages, setSelectedImages] = useState([]); // 선택된 이미지들의 상태 관리 (초기값 빈 배열)
    const totalRounds = Math.ceil(data.length / 4); // 전체 라운드 수 계산 (데이터 길이를 4로 나눈 후 올림)

    
    // const handleSelectImage = (image) => {
    //     setSelectedImages(prevSelectedImages => [...prevSelectedImages, image]);// 이전에 선택된 이미지 배열에 새 이미지 추가
    //     if (currentRound < totalRounds - 1) {
    //         setCurrentRound(currentRound + 1); // 현재 라운드 업데이트 (다음 라운드로)
    //     } else {
    //         navigate('/choose', { state: { selectedImages } }); // 마지막 라운드인 경우, 선택된 이미지들을 상태로 '/choose' 페이지로 이동
    //     }
    // };

    const handleSelectImage = (image) => {
        setSelectedImages(prevSelectedImages => {
            const newSelectedImages = [...prevSelectedImages, image];
            if (currentRound < totalRounds - 1) {
                setCurrentRound(currentRound + 1); // 다음 라운드로 이동
            } else {
                // 마지막 라운드이면, 이미지 배열 업데이트 후 navigate 호출
                navigate('/choose', { state: { selectedImages: newSelectedImages } });
            }
            return newSelectedImages;
        });
    };
    

    // 현재 라운드의 이미지들 계산
    const roundImages = data.slice(currentRound * 4, (currentRound + 1) * 4);

    return (
        <div>
            <h2>Round {currentRound + 1}/{totalRounds}</h2> 
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                {roundImages.map((image) => (
                    <div key={image.id} onClick={() => handleSelectImage(image)}>
                        <img src={image.src} alt={`Option ${image.id}`} style={{ width: '100%', height: 'auto' }} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Quater;