import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomContainer from "../components/ContainerComp/CustomContainer";

import ImageSlider from '../components/StartPageComp/ImageSlider';
import DoneIcon from '@mui/icons-material/Done';

import slide1 from '../img/slide1.jpg';
import slide2 from '../img/slide2.jpg';

import {
    Box,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";

function Guest() {
    const navigate = useNavigate();

    const images = [
        slide1,
        slide2,
        // 추가 이미지 경로를 여기에 입력하세요.
    ];

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const maxhe_ = isMobile ? '20%' : '67%';

    const [loading, setLoading] = useState(true);
    const [dots, setDots] = useState('');

    useEffect(() => {
        if (loading) {
            const interval = setInterval(() => {
                setDots(prev => (prev.length < 3 ? prev + '.' : '.'));
            }, 500);
            return () => clearInterval(interval);
        }
    }, [loading]);

    return (
        <CustomContainer>
            <ImageSlider images={images} interval={9000} maxhe={maxhe_} /> {/* 이미지 슬라이더 컴포넌트를 추가합니다. */}
            <div className="buttonWrapper"
                 style={{ display: 'flex', justifyContent: 'top', flexDirection: 'column', marginLeft: '10px', paddingTop: '7%' }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {loading ?
                        <>
                        <Typography variant="h4" sx={{ color: '#7f7f7f', fontFamily: 'SBAggroB', fontSize: '20px' }}>
                            {dots}
                        </Typography>
                            <Typography variant="h4" sx={{ color: '#7f7f7f', fontFamily: 'Playfair Display' }}>
                                Waiting For Host
                            </Typography>
                        </>
                        :
                        <>
                            <DoneIcon sx={{ color: '#7f7f7f', fontSize: '200px' }} />
                            <br />
                            <Typography variant="h4" sx={{ color: '#7f7f7f', fontFamily: 'Playfair Display' }}>
                                Done!<br />Moving to Tournament!
                            </Typography>
                        </>
                    }
                </Box>
            </div>
        </CustomContainer>
    );
}

export default Guest;
