import React, { useState } from 'react';
import { Button, ThemeProvider, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SBTheme } from './Theme/SBTheme';
import localuri from '../../pages/localuri.jsx';

const SortButton = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        if (loading) return;
        setLoading(true);

        fetch('http://' + localuri + '/Algorithm_cv2/test/', {
            method: 'GET',
        })
            .then(response => {
                setLoading(false);
                if (response.ok) {
                    navigate('/quater');
                } else {
                    throw new Error('Something went wrong during the upload.');
                }
            })
            .catch(error => {
                setLoading(false);
                console.error('An error occurred:', error);
            });
    };

    return (
        <ThemeProvider theme={SBTheme}>
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