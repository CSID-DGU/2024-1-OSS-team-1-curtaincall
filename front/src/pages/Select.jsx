import React, {useEffect, useState} from 'react';
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import SelectNavBar from '../components/SelectPageComp/SelectNavBar';
import IMGCarousel from '../components/SelectPageComp/IMGCarousel';
import DropDownButton from '../components/SelectPageComp/DropDownButton';
import api from '../axios';

function Select() {
    const location = useLocation();
    const selectedImages = location.state?.selectedImages;
    const [currentView, setCurrentView] = useState('Your Picks');
    const [dropdownValue, setDropdownValue] = useState('');

    useEffect(() => {
        const uploadBestImage = async () => {
            try {
                const response = await api.post('/bestImage/', {
                    stageId: 0,  //실제 스테이지 ID를 설정
                    folderNum: 0,  //실제 폴더 번호를 설정
                    bestImage: dropdownValue  //선택된 이미지 값
                });

                if (response.status === 200) {
                    console.log('Best image uploaded successfully');
                } else {
                    console.error('Failed to upload best image');
                }
            } catch (error) {
                console.error("Error uploading best image: ", error);
            }
        };

        uploadBestImage();
    }, [dropdownValue]);

    if (!selectedImages) {
        return <div>Loading or no images selected...</div>;
    }

    const handleDropdownChange = (event) => {
        setDropdownValue(event.target.value);
    };

    return (
        <Container>
            <SelectNavBar currentView={currentView} />
            <IMGCarousel images={selectedImages} />
            <DropDownButton value={dropdownValue} onChange={handleDropdownChange} />
        </Container>
    );
}

export default Select;