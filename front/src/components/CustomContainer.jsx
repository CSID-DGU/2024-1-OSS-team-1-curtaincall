import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { ContainerTheme } from './.PublicTheme/ContainerTheme';

export default function CustomContainer({children}) {
    return (
        <ThemeProvider theme={ContainerTheme}>
            <Container style={{ width: '100vw', maxWidth: 'none', padding: 0 }}>
                {children}
            </Container>
        </ThemeProvider>
    );
}