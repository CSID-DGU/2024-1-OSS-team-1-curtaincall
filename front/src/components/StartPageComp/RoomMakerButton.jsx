import React, { useState } from 'react';
import { Button, ThemeProvider, CircularProgress } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { ButtonTheme } from '../.PublicTheme/ButtonTheme';
import api from '../../axios';

const RoomMakerButton = ({ children }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        if (loading) return;
        setLoading(true);

        try {
            const response = await api.post('/Stage/createStage/', {
                name: '이동현의 임시 이름'
            });

            if (response.status === 200) {
                const { stageId, userId } = response.data;
                console.log('Stage created successfully', { stageId, userId });
                navigate('/host');
            }
        } catch (error) {
            console.error('Error creating stage:', error);
        } finally {
            setLoading(false);
        }
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

export default RoomMakerButton;
