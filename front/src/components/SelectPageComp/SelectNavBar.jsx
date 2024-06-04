import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { CNBTheme } from './Theme/CNBTheme';

const SelectNavBar = ({ currentView }) => {
    return (
        <ThemeProvider theme={CNBTheme}>
            <AppBar position="static">
                <Toolbar>
                    <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography variant="h6" component="div" sx={{ color: 'white' }}>
                            {currentView}
                        </Typography>
                    </Container>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
};

export default SelectNavBar;