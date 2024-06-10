import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomContainer from "../components/ContainerComp/CustomContainer";
import { Button, Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { motion, AnimatePresence } from 'framer-motion';
import { stageState, isHostState, sortedImageDataState } from "../atom/atom";
import DoneIcon from '@mui/icons-material/Done';
import LogoBlink from "../components/AwaitComp/LogoBlink";
import api from "../axios";
import { useRecoilValue, useSetRecoilState } from "recoil";

function Guest() {
    const setSortedImages = useSetRecoilState(sortedImageDataState);
    const navigate = useNavigate();
    const stageStage = useRecoilValue(stageState);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const maxhe_ = isMobile ? '20%' : '67%';

    const [loading, setLoading] = useState(true);
    const [step, setStep] = useState(0);

    useEffect(() => {
        let interval;
        if (loading) {
            interval = setInterval(() => {
                setStep((prevStep) => (prevStep + 1) % 3);
            }, 2000); // Adjust the duration to fit your desired speed
        } else {
            setStep(0);
        }
        return () => clearInterval(interval);
    }, [loading]);

    const handleButtonClick = () => {
        setLoading(!loading);
    };

    const transitionSettingsAppear = {
        duration: 0.8,
        ease: "easeInOut"
    };

    const transitionSettingsDisappear = {
        duration: 0.3,
        ease: "easeInOut"
    };

    const fetchGuests = async () => {
        try {
            const response = await api.get(`/Stage/checkStageUsers/?stageId=${stageStage}`);
            if (response.data.stage_status === "COMPLETE") {  // response.data.stage.sort로 접근
                setSortedImages(response.data.stage_data);
                setLoading(false);  // sort가 false일 때 setLoading을 false로 설정
            }
        } catch (error) {
        }
    };

    useEffect(() => {
        const intervalId = setInterval(fetchGuests, 5000); // 5초마다 실행
        return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 해제
    }, []);


    useEffect(() => {
        if (!loading) {
            const timer = setTimeout(() => {
                navigate('/Quarter');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [loading, navigate]);

    return (
        <CustomContainer>
            <div className="buttonWrapper"
                 style={{ display: 'flex', justifyContent: 'top', flexDirection: 'column', marginLeft: '10px' }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <AnimatePresence mode="wait">
                        {loading ? (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0, transition: transitionSettingsAppear }}
                                exit={{ opacity: 0, scale: 0, transition: transitionSettingsDisappear }}
                                style={{ width: '100%' }}
                            >
                                <LogoBlink step={step} fontSize="100px" color='#7f7f7f' />
                                <Typography variant="h4" sx={{ color: '#7f7f7f', fontFamily: 'RIDIBatang', fontSize: '100%' }}>
                                    추억을 정리하는 중...
                                </Typography>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="done"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0, transition: transitionSettingsDisappear }}
                                transition={transitionSettingsDisappear}
                                style={{ textAlign: 'center' }}
                            >
                                <DoneIcon sx={{ color: '#7f7f7f', fontSize: '120px' }} />
                                <br />
                                <Typography variant="h4" sx={{ color: '#7f7f7f', fontFamily: 'RIDIBatang', fontSize: '100%' }}>
                                    정리 완료!
                                </Typography>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Box>
            </div>
        </CustomContainer>
    );
}

export default Guest;
