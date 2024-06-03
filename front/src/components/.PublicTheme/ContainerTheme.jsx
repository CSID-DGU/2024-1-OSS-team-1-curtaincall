import React from 'react';
import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import backgroundDots from '../../img/background_dots.png'; // 이미지 파일 경로

export const ContainerTheme = createTheme({
    components: {
        MuiContainer: {
            styleOverrides: {
                root: { //'#012B28'
                    backgroundColor: '#F5F5F5',
                    //backgroundImage: `url(${backgroundDots})`,
                    //backgroundSize: 'auto', // 필요에 따라 'contain' 또는 'cover'로 변경 가능
                    //backgroundSize: '25px 25px',
                    //backgroundRepeat: 'repeat',
                    //backgroundPosition: 'center', // 필요에 따라 위치 조정 가능
                    height: '100%',
                    maxWidth: 'none',
                    //여긴 그냥 CSS랑 똑같음
                },
            },
        },
    },
});