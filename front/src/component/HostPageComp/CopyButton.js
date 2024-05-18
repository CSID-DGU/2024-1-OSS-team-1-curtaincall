import React, { useState } from 'react';
import { Button, CircularProgress, ThemeProvider } from '@mui/material';
import {CPYTheme} from "./Theme/CPYTheme";



const CopyButton = ({ url, children }) => {
    const [loading, setLoading] = useState(false); // 로딩 상태 관리

    const copyToClipboard = async () => {
        setLoading(true); // 버튼 클릭 시 로딩 시작
        setTimeout(async () => {  // setTimeout을 사용하여 딜레이 구현
            try {
                await navigator.clipboard.writeText(url);
                alert('URL이 클립보드에 복사되었습니다!');
            } catch (err) {
                console.error('복사 실패: ', err);
            }
            setLoading(false); // 딜레이 후 로딩 종료
        }, 500); // 2000ms (2초) 딜레이
    };

    return (
        <ThemeProvider theme={CPYTheme}>
            <Button variant="contained"
                    onClick={copyToClipboard}
                    disabled={loading}
                    sx={{
                        backgroundColor: loading ? '#bfbfbf' : '#7f7f7f', // 로딩 상태에 따른 배경색 변경
                        color: 'white',
                        '&:hover': {
                            backgroundColor: loading ? '#bfbfbf' : '#bfbfbf' // 호버 상태에서의 배경색
                        }
                    }}>
                {loading ? <CircularProgress size={24} color="inherit" /> : children}
            </Button>
        </ThemeProvider>
    );
};

export default CopyButton;
