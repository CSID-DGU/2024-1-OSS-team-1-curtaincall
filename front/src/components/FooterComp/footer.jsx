// Footer.jsx
import React from 'react';
import {ThemeProvider, Box, Typography, styled} from '@mui/material';
import Foottheme from './Theme/FootTheme';


const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
    fontFamily: theme.typography.fontFamily,
}));

function Footer() {
    return (
        <ThemeProvider theme={Foottheme}>
            <StyledBox>
                <StyledTypography variant="h6">
                    FOOTER
                </StyledTypography>
            </StyledBox>
        </ThemeProvider>
    );
}

export default Footer;