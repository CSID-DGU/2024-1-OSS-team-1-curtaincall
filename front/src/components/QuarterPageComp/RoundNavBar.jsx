import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import RNBTheme from './Theme/RNBTheme';

const RoundNavBar = ({ currentRound, totalRounds, currentGroup, groupRound, groupTotalRounds }) => {
    return (
        <ThemeProvider theme={RNBTheme}>
            <AppBar position="static" sx={{ margin: 0, padding: 0, width: '100%' }}>
                <Container>
                    <Toolbar>
                        <div style={{ flexGrow: 1 }}>
                            <Typography variant="h5" color="inherit" component="div">
                                Sorted Group {currentGroup.group_id + 1}
                            </Typography>
                        </div>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    );
}

export default RoundNavBar;
