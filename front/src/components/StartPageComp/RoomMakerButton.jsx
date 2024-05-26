import React, {useEffect, useState} from 'react';
import { Button, ThemeProvider, CircularProgress } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { ButtonTheme } from '../.PublicTheme/ButtonTheme';
import api from '../../axios';
import {stageState} from "../../atom/atom";
import {useRecoilState} from "recoil";

const RoomMakerButton = ({ children }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [stageId, setStageId] = useRecoilState(stageState);

    const handleClick = async () => {
        if (loading) return;
        setLoading(true);

        try {
            const response = await api.post('/Stage/createStage/');

            if (response.status === 200) {
                setStageId(response.data.stageId);
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
