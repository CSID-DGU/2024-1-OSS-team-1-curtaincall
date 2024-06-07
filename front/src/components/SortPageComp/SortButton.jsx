import React, { useState } from 'react';
import { Button, ThemeProvider, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ButtonTheme } from '../.PublicTheme/ButtonTheme';
import api from "../../axios";
import {useSetRecoilState} from "recoil";
import {sortedImageDataState} from "../../atom/atom";

const SortButton = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleClick = async () => {
        if (loading) return;
        setLoading(true);
        console.log('api 호출');
        try {
            const response = await api.get('/Algorithm_cv2/sort/');
            console.log(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data', error);
            setLoading(false);
        }
    };

    return (
        <ThemeProvider theme={ButtonTheme}>
            <Button
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
                {loading ? <CircularProgress size={24} style={{ color: 'white' }} /> : children}
            </Button>
        </ThemeProvider>
    );
};

export default SortButton;