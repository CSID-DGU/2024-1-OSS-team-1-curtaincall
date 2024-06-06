import React from 'react';
import { AppBar, Toolbar, Typography, Container, LinearProgress } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import RNBTheme from './Theme/RNBTheme';

const RoundNavBar = ({ currentRound, totalRounds, currentGroup, groupRound, groupTotalRounds }) => {
    const progress = (currentRound / totalRounds) * 100;

    return (
        <ThemeProvider theme={RNBTheme}>
            <AppBar position="static">
                <Container>
                    <Toolbar>
                        <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1 }}>
                            CGroup {currentGroup.group_id} | Round {groupRound}/{groupTotalRounds}
                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    );
}

export default RoundNavBar;
