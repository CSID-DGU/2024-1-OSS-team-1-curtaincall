import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import localuri from './localuri.js';
function Sort(){
    // 원래는 막이 닫히는 애니메이션 같은 거 여기다 넣고 싶었는데...
    // 애니메이션 효과가 중요한 게 아니니까...
    const navigate = useNavigate();

    const startSort = () => {
        fetch('http://' + localuri + ':8000/Algorithm_cv2/test/', {
        method: 'GET',
      })
      .then(response => {
        if (response.ok) {
          navigate('/quater');
        } else {
          throw new Error('Something went wrong during the upload.');
        }
      })
      .catch(error => {
        console.error('An error occurred:', error);
      });
    }

    return (
        <>
            <Button variant="danger" onClick={startSort}>정렬 시작</Button>
        </>
    );
}

export default Sort;