import React from 'react';
import {Container, Navbar, Nav, Button, Row, Col} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Start(){
    const navigate = useNavigate();
    return(
    <>
      <div className="main-bg"></div> 
      <br></br>
      <div className="mb-2">
        <Button variant="danger" size="lg" onClick={() => navigate('/host')}>
          방 만들기
        </Button>{' '}
        <Button variant="secondary" size="lg" onClick={() => navigate('/guest')}>
          초대 받기
        </Button>
      </div>  
    </>
    )
}

export default Start;