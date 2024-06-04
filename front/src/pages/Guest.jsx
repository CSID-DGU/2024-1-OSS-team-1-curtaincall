import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import URLInputForm from "../components/GusetPageComp/URLInputForm";
import HostPageInputButton from "../components/GusetPageComp/HostPageInputButton";
import CustomContainer from "../components/ContainerComp/CustomContainer";

function Guest() {
    const navigate = useNavigate();
    const [hostUrl, setHostUrl] = useState('');
    const [name, setName] = useState('게스트');

    return (
        <CustomContainer>
            <br/>
            <URLInputForm onUrlChange={setHostUrl} />
            <HostPageInputButton name={name} conststageId={hostUrl}>업로드 페이지 입장</HostPageInputButton>
        </CustomContainer>
    );
}

export default Guest;