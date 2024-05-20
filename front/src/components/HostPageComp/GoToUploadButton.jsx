import React, { useState } from 'react';
import { Button, ThemeProvider, createTheme, CircularProgress } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { ButtonTheme } from '../.PublicTheme/ButtonTheme';

const GoToUploadButton = ({ children }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const handleClick = () => {
        if (loading) return;
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate('/upload');
        }, 700);
    };

    return (
        <ThemeProvider theme={ButtonTheme}>
            <Button
                //variant="contained"
                onClick={handleClick}
                disabled={loading}
                sx={{
                    backgroundColor: loading ? '#bfbfbf' : '#7f7f7f', // 로딩 상태에 따른 배경색 변경
                    color: 'white',
                    '&:hover': {
                        backgroundColor: loading ? '#bfbfbf' : '#bfbfbf' // 호버 상태에서의 배경색
                    }
                }}
            >
                {loading ? <CircularProgress size={24} style={{ color: 'white' }} /> : children}
            </Button>
        </ThemeProvider>
    );
};

export default GoToUploadButton;
