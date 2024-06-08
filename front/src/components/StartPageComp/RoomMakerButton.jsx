import React, {useEffect, useState} from 'react';
import { Button, ThemeProvider, CircularProgress } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { ButtonTheme } from '../.PublicTheme/ButtonTheme';
import api from '../../axios';
import {stageState, isHostState} from "../../atom/atom";
import {useRecoilState} from "recoil";

const RoomMakerButton = ({ children }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [stageId, setStageId] = useRecoilState(stageState);
    const [isHost, setIsHost] = useRecoilState(isHostState);

    const handleClick = async () => {
        if (loading) return;
        setLoading(true);

        try {
            const response = await api.post('/Stage/createStage/');

            if (response.status === 200) {
                setStageId(response.data.stageId);
                setIsHost(true);
                navigate('/stage');
            }
        } catch (error) {
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

                    backgroundColor: loading ? '#E3E3E3' : '#F5F5F5',
                    color: '#7D7D7D',
                    '&:hover': {
                        backgroundColor: loading ? '#E3E3E3' : '#F5F5F5',
                    }
                }}
            >
                {loading ? <CircularProgress size={24} style={{ color: 'white' }} /> : children}
            </Button>
        </ThemeProvider>
    );
};

export default RoomMakerButton;
