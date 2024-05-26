import React, { useState } from 'react';
import { Button, CircularProgress, ThemeProvider } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { ButtonTheme } from '../.PublicTheme/ButtonTheme'; // Import the custom theme for LoginButton

function LoginButton({ onClick, children, disabled }) {
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        if (loading || disabled) return;
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            onClick();
        }, 700);
    };

    return (
        <ThemeProvider theme={ButtonTheme}>
            <Button
                variant="contained"
                color="primary"
                onClick={handleClick}
                disabled={loading || disabled}
                sx={{
                    backgroundColor: (loading || disabled) ? '#bfbfbf' : '#7f7f7f',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: (loading || disabled) ? '#bfbfbf' : '#bfbfbf'
                    }
                }}>
                {loading ? <CircularProgress size={24} color="inherit" /> : children}
            </Button>
        </ThemeProvider>
    );
}

export default LoginButton;