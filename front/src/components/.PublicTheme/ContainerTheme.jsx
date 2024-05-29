import React from 'react';
import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';

export const ContainerTheme = createTheme({
    components: {
        MuiContainer: {
            styleOverrides: {
                root: {
                    backgroundColor: '#b2b2b2',
                    height: '100vh',
                    maxWidth: 'none',
                    //여긴 그냥 CSS랑 똑같음
                },
            },
        },
    },
});