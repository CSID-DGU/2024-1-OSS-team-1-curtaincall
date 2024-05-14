import React from 'react';
import {Container, Grid, Paper, ThemeProvider, Typography} from '@mui/material';
import { GLTheme } from './Theme/GLTheme';

const GuestList = ({ guests }) => {
    return (
        <ThemeProvider theme={GLTheme}>
            <Container>
                <Grid container spacing={2}>
                    {guests.map(guest => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={guest.id}>
                            <Paper elevation={2}>
                                <Typography variant="subtitle1" component="h2">
                                    게스트: {guest.name}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </ThemeProvider>
    );
};

export default GuestList;