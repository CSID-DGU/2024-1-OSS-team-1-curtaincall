import React from 'react';
import {Container, Navbar, Nav, Button, Row, Col} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import RoomMakerButton from "../component/JS/RoomMakerButton";
import InvitationReceiveButton from "../component/JS/InvitationReceiveButton";

function Start(){
    const navigate = useNavigate();
    return(
    <>

          <div className="main-bg"></div>
          <br></br>
          <div className="mb-2">
            <RoomMakerButton>
              방 만들기
            </RoomMakerButton>

            <InvitationReceiveButton>
              초대 받기
            </InvitationReceiveButton>
          </div>
    </>
    )
}

export default Start;