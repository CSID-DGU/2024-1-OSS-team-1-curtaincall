import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import URLInputForm from "../components/GusetPageComp/URLInputForm";
import HostPageInputButton from "../components/GusetPageComp/HostPageInputButton";
import ConstantContainer from "../components/ContainerComp/ConstantContainer";

function Guest() {
    const navigate = useNavigate();
    const [hostUrl, setHostUrl] = useState('');
    const [name, setName] = useState('게스트');

    return (
        <ConstantContainer>
            <URLInputForm onUrlChange={setHostUrl}  placeholder="Stage ID"/>
            <div style={{ width: '100%', height:'2px', marginBottom:'2%'}}></div>
            <HostPageInputButton name={name} conststageId={hostUrl}>업로드 페이지 입장</HostPageInputButton>
        </ConstantContainer>
    );
}

export default Guest;