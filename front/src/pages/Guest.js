import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import URLInputForm from "../component/GusetPageComp/URLInputForm";
import HostPageInputButton from "../component/GusetPageComp/HostPageInputButton";

function Guest() {
    const navigate = useNavigate();
    const [hostUrl, setHostUrl] = useState('');

    return (
        <>
            <br/>
            <URLInputForm onUrlChange={setHostUrl} />
            <HostPageInputButton url={hostUrl}>호스트 페이지 입장</HostPageInputButton>
        </>
    );
}

export default Guest;