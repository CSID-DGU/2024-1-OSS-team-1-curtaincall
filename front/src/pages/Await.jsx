import React, { useState } from 'react';
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
            머기방
        </CustomContainer>
    );
}

export default Guest;