import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import ChooseNavBar from '../component/ChoosPageComp/ChooseNavBar'; // 실제 경로로 수정
import IMGCarousel from '../component/ChoosPageComp/IMGCarousel'; // 실제 경로로 수정
import DropDownButton from '../component/ChoosPageComp/DropDownButton'; // 실제 경로로 수정

function Choose() {
    const location = useLocation();
    const selectedImages = location.state?.selectedImages;
    const [currentView, setCurrentView] = useState('Your Picks');
    const [dropdownValue, setDropdownValue] = useState('');

    if (!selectedImages) {
        return <div>Loading or no images selected...</div>;
    }

    const handleDropdownChange = (event) => {
        setDropdownValue(event.target.value);
    };

    return (
        <Container>
            <ChooseNavBar currentView={currentView} />
            <IMGCarousel images={selectedImages} />
            <DropDownButton value={dropdownValue} onChange={handleDropdownChange} />
        </Container>
    );
}

export default Choose;