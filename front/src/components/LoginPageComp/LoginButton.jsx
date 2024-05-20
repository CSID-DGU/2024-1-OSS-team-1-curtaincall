import React, { useState } from 'react';
import { Button, CircularProgress, ThemeProvider } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { LBTheme } from './Theme/LBTheme'; // Import the custom theme for LoginButton

function LoginButton({ onClick, children }) {
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        if (loading) return;
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            onClick();
        }, 700);
    };

    return (
        <ThemeProvider theme={LBTheme}>
            <Button variant="contained" color="primary" onClick={handleClick}
                    disabled={loading}
                    sx={{
                        backgroundColor: loading ? '#bfbfbf' : '#7f7f7f',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: loading ? '#bfbfbf' : '#bfbfbf'
                        }
                    }}>
                {loading ? <CircularProgress size={24} color="inherit" /> : children}
            </Button>
        </ThemeProvider>
    );
}

export default LoginButton;