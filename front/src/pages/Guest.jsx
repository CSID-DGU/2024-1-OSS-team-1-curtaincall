import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import URLInputForm from "../components/GusetPageComp/URLInputForm";
import HostPageInputButton from "../components/GusetPageComp/HostPageInputButton";
import ConstantContainer from "../components/ContainerComp/ConstantContainer";
import CustomContainer from '../components/ContainerComp/CustomContainer';
import ImageSlider from '../components/StartPageComp/ImageSlider';


function Guest() {
    const navigate = useNavigate();
    const [hostUrl, setHostUrl] = useState('');
    const [name, setName] = useState('게스트');

    return (
        <CustomContainer>
            <ImageSlider interval={9000} maxhe={'40%'} /> {/* 이미지 슬라이더 컴포넌트를 추가합니다. */}
            <div className="buttonWrapper" style={{ display: 'flex', justifyContent: 'top', flexDirection: 'column', width: '88%' }}>
                <div style={{ width: '100%', height:'3px', marginBottom:'5px'}}></div>
                <URLInputForm onUrlChange={setHostUrl}  placeholder="무대 아이디"/>
                <div style={{ width: '100%', height:'2px', marginBottom:'2%'}}></div>
                <HostPageInputButton name={name} conststageId={hostUrl}>업로드 페이지 입장</HostPageInputButton>
            </div>
        </CustomContainer>
    );
}

export default Guest;