import React, {useState} from 'react';
import {Button, CircularProgress, ThemeProvider} from '@mui/material';
import { useNavigate } from "react-router-dom";
import { HPTheme } from './Theme/HPTheme'; // Import the custom theme for NavigateButton

function HosPageInputButton({ url, children }) {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        if (loading) return;
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate(url);
        }, 700);
    };

    return (
        <ThemeProvider theme={HPTheme}>
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

export default HosPageInputButton;