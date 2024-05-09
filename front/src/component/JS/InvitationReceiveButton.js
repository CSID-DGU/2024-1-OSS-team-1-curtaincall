import React, { useState } from 'react';
import { Button, ThemeProvider, createTheme, CircularProgress } from '@mui/material';
import { useNavigate } from "react-router-dom";

const IRTheme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    width: '33.33%',
                    height: '70px',
                    borderRadius: '50px',
                    fontWeight: 'bold',
                    fontSize: '1.25rem',
                    position: 'relative',
                    transition: 'background-color 0.5s ease',
                },
            }
        }
    }
});

const InvitationReceiveButton = ({ children }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const handleClick = () => {
        if (loading) return;
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate('/guest');
        }, 700);
    };

    return (
        <ThemeProvider theme={IRTheme}>
            <Button
                //variant="contained"
                onClick={handleClick}
                disabled={loading}
                sx={{
                    backgroundColor: loading ? '#c4c4c4' : '#7f7f7f', // 로딩 상태에 따른 배경색 변경
                    color: 'white',
                    '&:hover': {
                        backgroundColor: loading ? '#c4c4c4' : '#c4c4c4' // 호버 상태에서의 배경색
                    }
                }}
            >
                {loading ? <CircularProgress size={24} style={{ color: 'white' }} /> : children}
            </Button>
        </ThemeProvider>
    );
};

export default InvitationReceiveButton;
