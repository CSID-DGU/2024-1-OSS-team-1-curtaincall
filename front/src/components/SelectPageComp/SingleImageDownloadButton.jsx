import React, {useEffect, useState} from 'react';
import { Button, ThemeProvider, CircularProgress } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { ButtonTheme } from '../.PublicTheme/ButtonTheme';
import api from '../../axios';
import {stageState, isHostState} from "../../atom/atom";
import {useRecoilState} from "recoil";

const SingleImageDownloadButton = ({ children, image }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        const link = document.createElement('a');
        link.href = image.src;
        link.download = 'downloaded_image.jpg'; // 원하는 파일명으로 변경 가능
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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

export default SingleImageDownloadButton;
