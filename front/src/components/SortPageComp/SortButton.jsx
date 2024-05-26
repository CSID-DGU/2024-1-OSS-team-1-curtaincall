import React, { useState } from 'react';
import { Button, ThemeProvider, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ButtonTheme } from '../.PublicTheme/ButtonTheme';
import api from "../../axios";

const SortButton = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        if (loading) return;
        setLoading(true);
        console.log('api 호출');
        api.get('/Algorithm_cv2/sort/')
            .then(() => {
                navigate('/quarter');
            })
            .catch(() => {
                console.error('Error fetching data');
                setLoading(false);
            });
    };

    return (
        <ThemeProvider theme={ButtonTheme}>
            <Button
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
                {loading ? <CircularProgress size={24} style={{ color: 'white' }} /> : children}
            </Button>
        </ThemeProvider>
    );
};

export default SortButton;