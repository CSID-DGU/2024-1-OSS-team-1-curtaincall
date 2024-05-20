import React, { useState } from 'react';
import {Button, ThemeProvider, createTheme, CircularProgress, styled} from '@mui/material';
import { useNavigate } from "react-router-dom";
import { ButtonTheme } from '../.PublicTheme/ButtonTheme';


    const UploadButton = ({ children }) => {
        const [loading, setLoading] = useState(false);
        const handleClick = () => {
            if (loading) return;
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 700);
    };

    const VisuallyHiddenSubmit = styled('submit')({
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
    return (
        <ThemeProvider theme={ButtonTheme}>
            <Button
                //variant="contained"
                onClick={handleClick}
                disabled={loading}
                sx={{
                    backgroundColor: loading ? '#ffa793' : '#ff5838',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: loading ? '#ffa793' : '#ffa793'
                    }
                }}
            >
                <VisuallyHiddenSubmit type="submit"/>
                {loading ? <CircularProgress size={24} style={{ color: 'white' }} /> : children}
            </Button>
        </ThemeProvider>
    );
};

export default UploadButton;
