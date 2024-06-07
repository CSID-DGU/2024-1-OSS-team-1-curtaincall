import React from 'react';
import { Container, Grid, Paper, ThemeProvider, Typography, Avatar } from '@mui/material';
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

    const buttonTransition = (delay = 0) => ({
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
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <Paper
                                    elevation={0}
                                    style={{
                                        padding: '16px',
                                        border: '1px solid #ccc',
                                        borderRadius: '0',
                                        display: 'flex',
                                        alignItems: 'center',
                                        width: '100%', // Paper의 너비를 100%로 설정하여 Grid의 너비에 맞춤
                                        minHeight: '64px' // 높이를 최소한으로 설정하여 일관된 높이 유지
                                    }}
                                >
                                    <Avatar
                                        alt={guest.username}
                                        src={guest.profileImage} // 프로필 이미지 URL이 guest 객체에 있다고 가정
                                        style={{
                                            width: 32,
                                            height: 32,
                                            marginRight: '16px'
                                        }}
                                    />
                                    <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                                        <Typography
                                            variant="subtitle1"
                                            component="h2"
                                            style={{ fontFamily: 'RIDIBatang', textAlign: 'center', width: '100%' }}
                                        >
                                            {guest.username}
                                        </Typography>
                                    </div>
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
