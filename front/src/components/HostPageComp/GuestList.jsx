import React from 'react';
import {Container, Grid, Paper, ThemeProvider, Typography} from '@mui/material';
import { GLTheme } from './Theme/GLTheme';
import { motion } from 'framer-motion';

const GuestList = ({ guests }) => {
    const buttonVariants = {
        initial: {
            opacity: 0,
            y: 20,
        },
        in: {
            opacity: 1,
            y: 0,
        },
        out: {
            opacity: 0,
            y: -20,
        },
    };

    const buttonTransition =(delay = 0) => ({
        type: 'tween',
        ease: 'anticipate',
        duration: 0.8,
        delay: delay,
    });
    return (
        <ThemeProvider theme={GLTheme}>
            <Container>
                <Grid container spacing={2}>
                    {guests.map(guest => (

                        <Grid item xs={12} sm={6} md={4} lg={3} key={guest.id}>
                            <motion.div
                                initial="initial"
                                animate="in"
                                exit="out"
                                variants={buttonVariants}
                                transition={buttonTransition(0.2)}
                                Style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    alignItems: 'center'
                                }}
                            >
                                <Paper elevation={0}
                                       style={{padding: '16px', border: '1px solid #ccc', borderRadius: '0'}}>
                                    <Typography variant="subtitle1" component="h2">
                                        {guest.username}
                                    </Typography>
                                </Paper>
                            </motion.div>
                        </Grid>

                        ))}
                </Grid>
            </Container>
        </ThemeProvider>
    );
};

export default GuestList;