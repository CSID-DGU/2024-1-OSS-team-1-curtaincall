import React from 'react';
import { useNavigate } from 'react-router-dom';
import RoomMakerButton from "../components/StartPageComp/RoomMakerButton";
import InvitationReceiveButton from "../components/StartPageComp/InvitationReceiveButton";
import CustomContainer from "../components/CustomContainer";

function Start(){
    return(
        <>
        <CustomContainer>

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
        </CustomContainer>
        </>
    )
}

export default Start;