import React, { useState } from 'react';
import { Button, ThemeProvider, CircularProgress, styled } from '@mui/material';
import { ButtonTheme } from '../.PublicTheme/ButtonTheme'; // 경로를 실제로 맞추세요.

const VisuallyHiddenSubmit = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const UploadButton = ({ children }) => {
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        if (loading) return;
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            document.getElementById('hiddenSubmit').click(); // Simulate form submission
        }, 700);
    };

    return (
        <ThemeProvider theme={ButtonTheme}>
            <Button
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
                <VisuallyHiddenSubmit type="submit" id="hiddenSubmit" />
                {loading ? <CircularProgress size={24} style={{ color: 'white' }} /> : children}
            </Button>
        </ThemeProvider>
    );
};

export default UploadButton;
