import React, {useEffect, useState} from 'react';
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import SelectNavBar from '../components/SelectPageComp/SelectNavBar';
import IMGCarousel from '../components/SelectPageComp/IMGCarousel';
import DropDownButton from '../components/SelectPageComp/DropDownButton';
import CustomContainer from "../components/ContainerComp/CustomContainer";

function Select() {
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
        <CustomContainer>
        <Container>
            <IMGCarousel images={selectedImages} />
        </Container>
        </CustomContainer>
    );
}

export default Select;