import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import RNBTheme from './Theme/RNBTheme';

const RoundNavBar = ({ currentRound, totalRounds }) => {
    return (
        <ThemeProvider theme={RNBTheme}>
            <AppBar position="static">
                <Container>
                    <Toolbar>
                        <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1 }}>
                            Round {currentRound + 1}/{totalRounds}
                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    );
}

export default RoundNavBar;
