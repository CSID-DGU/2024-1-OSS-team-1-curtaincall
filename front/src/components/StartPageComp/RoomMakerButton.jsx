import React, { useState } from 'react';
import { Button, ThemeProvider, createTheme, CircularProgress } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { ButtonTheme } from '../.PublicTheme/ButtonTheme';


const RoomMakerButton = ({ children }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const handleClick = () => {
        if (loading) return;
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate('/host');
        }, 700);
    };

    return (
        <ThemeProvider theme={ButtonTheme}>
            <Button
                //variant="contained"
                onClick={handleClick}
                disabled={loading}
                sx={{
                    backgroundColor: loading ? '#ffa793' : '#ff5838', // 로딩 상태에 따른 배경색 변경
                    color: 'white',
                    '&:hover': {
                        backgroundColor: loading ? '#ffa793' : '#ffa793' // 호버 상태에서의 배경색
                    }
                }}
            >
                {loading ? <CircularProgress size={24} style={{ color: 'white' }} /> : children}
            </Button>
        </ThemeProvider>
    );
};

export default RoomMakerButton;
