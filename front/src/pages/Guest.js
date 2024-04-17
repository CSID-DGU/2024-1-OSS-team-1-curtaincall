import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Guest() {
    const navigate = useNavigate();
    let [hostUrl, setHostUrl] = useState('');

    const goToHost = () => {
        // 여기서는 입력된 URL을 경로로 사용 중
        // 실제 앱에서는 해당 URL로 직접 이동하는 대신
        // 앱 내에서 라우팅할 경로를 지정해야 할 수도? 
        navigate(hostUrl);
    }

    return (
        <>
            <br/>
            <input 
                value={hostUrl}
                onChange={(e) => { 
                    setHostUrl(e.target.value); 
                    console.log(hostUrl); 
                }} 
            />
            <Button variant="danger" onClick={goToHost}>호스트 페이지 입장</Button>
        </>
    );
}

export default Guest;
