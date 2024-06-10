import React, { useState } from 'react';
import { Button, ThemeProvider, CircularProgress } from '@mui/material';
import { ButtonTheme } from '../.PublicTheme/ButtonTheme';

const SingleImageDownloadButton = ({ children, image }) => {
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        try {
            const response = await fetch(image.src);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'downloaded_image.jpg'; // 원하는 파일명으로 변경 가능
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            alert('다운로드에 실패했습니다. 다시 시도해주세요.');

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
                {loading ? <CircularProgress size={24} style={{ color: '#7D7D7D' }} /> : children}
            </Button>
        </ThemeProvider>
    );
};

export default SingleImageDownloadButton;
