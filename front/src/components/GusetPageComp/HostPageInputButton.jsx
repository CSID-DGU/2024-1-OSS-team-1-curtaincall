import React, { useState } from 'react';
import { Button, CircularProgress, ThemeProvider } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { ButtonTheme } from '../.PublicTheme/ButtonTheme'; // Import the custom theme for NavigateButton
import api from '../../axios';

function HosPageInputButton({ stageId, name, url, children }) {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleClick = async () => {
        if (loading) return;
        setLoading(true);

        try {
            const response = await api.post('/Stage/joinStage/', {
                stageId: stageId,
                name: name
            });

            if (response.status === 200 && response.data.status === 'success') {
                console.log('Stage joined successfully', response.data);
                navigate(url);
            } else {
                console.error('Failed to join stage');
                alert('Failed to join stage');
            }
        } catch (error) {
            console.error('Error joining stage:', error);
            alert('An error occurred while joining the stage');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ThemeProvider theme={ButtonTheme}>
            <Button
                variant="contained"
                color="primary"
                onClick={handleClick}
                disabled={loading}
                sx={{
                    backgroundColor: loading ? '#bfbfbf' : '#7f7f7f',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: loading ? '#bfbfbf' : '#bfbfbf'
                    }
                }}
            >
                {loading ? <CircularProgress size={24} color="inherit" /> : children}
            </Button>
        </ThemeProvider>
    );
}

export default HosPageInputButton;