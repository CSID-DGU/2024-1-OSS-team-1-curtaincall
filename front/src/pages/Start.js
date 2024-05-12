import React from 'react';
import { useNavigate } from 'react-router-dom';
import RoomMakerButton from "../component/JS/StartPageComp/RoomMakerButton";
import InvitationReceiveButton from "../component/JS/StartPageComp/InvitationReceiveButton";

function Start(){
    const navigate = useNavigate();
    return(
    <>

          <div className="main-bg"></div>
          <br></br>
          <div className="mb-2" style={{ display: 'flex', justifyContent: 'center' }} >
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