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
                        {/*<LinearProgress variant="determinate" value={progress} sx={{ width: '100%' }} /> 이건 나중에 넣으려고 주석처리 해놓음*/}
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    );
}

export default RoundNavBar;
