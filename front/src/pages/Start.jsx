import React from 'react';
import { useNavigate } from 'react-router-dom';
import RoomMakerButton from "../components/StartPageComp/RoomMakerButton";
import InvitationReceiveButton from "../components/StartPageComp/InvitationReceiveButton";
import CustomContainer from "../components/ContainerComp/CustomContainer";
import ImageSlider from '../components/StartPageComp/ImageSlider'; // 이미지 슬라이더 컴포넌트를 가져옵니다.
import Divider from '@mui/material/Divider';
import CustomContainer2 from '../components/ContainerComp/CustomContainer2';
import {motion} from "framer-motion";
import slide1 from '../img/slide1.jpg';
import slide2 from '../img/slide2.jpg';

import {
    useMediaQuery,
    useTheme,
} from "@mui/material";

function Start() {
    const buttonVariants = {
        initial: {
            opacity: 0,
            y: 20,
        },
        in: {
            opacity: 1,
            y: 0,
        },
        out: {
            opacity: 0,
            y: -20,
        },
    };

    const buttonTransition =(delay = 0) => ({
        type: 'tween',
        ease: 'anticipate',
        duration: 0.8,
        delay: delay,
    });

    const images = [
    slide1,
    slide2,
    // 추가 이미지 경로를 여기에 입력하세요.
  ];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const justifyContent = isMobile ? 'top' : ''
//<Divider sx={{ width: '100%', margin: '0px 0px 10px 0px', bgcolor: "black", height: '2px' }} />
    return (
            <CustomContainer>
                <ImageSlider images={images} interval={9000} /> {/* 이미지 슬라이더 컴포넌트를 추가합니다. */}
                <div className="buttonWrapper" style={{ display: 'flex', justifyContent: 'top', flexDirection: 'column' }}>
                    <div style={{ width: '100%', height:'2px', marginBottom:'1.5%'}}></div>
                    <div className="mb-2"
                         style={{display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column'}}>
                        <motion.div
                            initial="initial"
                            animate="in"
                            exit="out"
                            variants={buttonVariants}
                            transition={buttonTransition(0.2)}
                        >
                            <RoomMakerButton>
                                새로운 무대
                            </RoomMakerButton>
                        </motion.div>
                        <div style={{width: '100%', height: '2px', marginBottom: '1.5px'}}></div>
                        <motion.div
                            initial="initial"
                            animate="in"
                            exit="out"
                            variants={buttonVariants}
                            transition={buttonTransition(0.4)}
                        >
                            <InvitationReceiveButton>
                                무대 참여
                            </InvitationReceiveButton>
                        </motion.div>
                    </div>
                </div>
            </CustomContainer>
);
}


export default Start;