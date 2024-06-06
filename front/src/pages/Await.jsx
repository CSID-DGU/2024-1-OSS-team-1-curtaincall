import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomContainer from "../components/ContainerComp/CustomContainer";
import { Button, Box, Typography, useMediaQuery, useTheme, keyframes, Fade } from "@mui/material";

import DoneIcon from '@mui/icons-material/Done';
import LogoBlink from "../components/AwaitComp/LogoBlink";

const fadeInOut = keyframes`
    0% { opacity: 0; }
    40% { opacity: 1; }
    60% { opacity: 1; }
    100% { opacity: 0; }
`;

function Guest() {
    const navigate = useNavigate();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const maxhe_ = isMobile ? '20%' : '67%';

    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(0);

    useEffect(() => {
        let interval;
        if (loading) {
            interval = setInterval(() => {
                setStep((prevStep) => (prevStep + 1) % 3);
            }, 2000);
        } else {
            setStep(0);
        }
        return () => clearInterval(interval);
    }, [loading]);

    const handleButtonClick = () => {
        setLoading(!loading);
    };

    return (
        <CustomContainer>
            <div className="buttonWrapper"
                 style={{ display: 'flex', justifyContent: 'top', flexDirection: 'column', marginLeft: '10px'}}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <Fade in={loading} timeout={1000}>
                        <Box sx={{ display: loading ? 'block' : 'none', width: '100%' }}>
                            <LogoBlink step={step} fontSize="150px" color='#7f7f7f' />
                            <Typography variant="h4" sx={{ color: '#7f7f7f', fontFamily: 'RIDIBatang' }}>
                                기다리는중
                            </Typography>
                        </Box>
                    </Fade>
                    <Fade in={!loading} timeout={1000}>
                        <Box sx={{ display: !loading ? 'block' : 'none', textAlign: 'center' }}>
                            <DoneIcon sx={{ color: '#7f7f7f', fontSize: '180px' }} />
                            <br />
                            <Typography variant="h4" sx={{ color: '#7f7f7f', fontFamily: 'RIDIBatang' }}>
                                로딩 완료!
                            </Typography>
                        </Box>
                    </Fade>
                </Box>
                <Button
                    variant="contained"
                    onClick={handleButtonClick}
                    sx={{ marginTop: '20px' }}
                >
                    {loading ? "Stop Loading" : "Start Loading"}
                </Button>
            </div>
        </CustomContainer>
    );
}

export default Guest;
