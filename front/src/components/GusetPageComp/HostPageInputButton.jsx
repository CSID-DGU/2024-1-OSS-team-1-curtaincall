import React, {useEffect, useState} from 'react';
import { Button, CircularProgress, ThemeProvider } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { ButtonTheme } from '../.PublicTheme/ButtonTheme'; // Import the custom theme for NavigateButton
import api from '../../axios';
import {useRecoilState} from "recoil";
import {stageState} from "../../atom/atom";

function HosPageInputButton({ name,conststageId, children }) {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [stageId, setStageId] = useRecoilState(stageState);


    setStageId(conststageId);

    const handleClick = async () => {
        if (loading) return;
        setLoading(true);

        try {
            const response = await api.post('/Stage/joinStage/', {
                stageId: stageId,
                name: name,
            });

            if (response.status === 200 && response.data.status === 'success') {

                navigate('/stage');
            } else {
                alert('Failed to join stage');
            }
        } catch (error) {
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