// Footer.jsx
import React from 'react';
import { ThemeProvider, Box, Typography } from '@mui/material';
import theme from './Theme/FootTheme';

function Footer() {
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{bgcolor:'black', color: 'white', p: 2, textAlign: 'center' }}>
                <Typography variant="h6">
                    FOOTER
                </Typography>
            </Box>
        </ThemeProvider>
    );
}

export default Footer;
