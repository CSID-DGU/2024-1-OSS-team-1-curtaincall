import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link, Typography } from '@mui/material';
import { AppBar, Toolbar, IconButton, Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import DehazeSharpIcon from '@mui/icons-material/DehazeSharp';
import { NVTheme } from './Theme/NavigationBarTheme';
import Devnavlinkcomplex from './devnavlinkcomplex';
import Usernavlinkcomplex from './usernavlinkomplex';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginState, modalState, usernameState } from '../../atom/atom';
import UserModal from '../Modal/UserModal';
import LogoutButton from './LogoutButton';

function NavigationBar({ isMobile, handleDrawerToggle }) {
    const login = useRecoilValue(loginState);
    const isdev = false;
    const [username, setUsername] = useRecoilState(usernameState);
    const [isOpen, setIsOpen] = useRecoilState(modalState);

    useEffect(() => {
        const savedUsername = localStorage.getItem('usernameState');
        if (savedUsername) {
            try {
                setUsername(JSON.parse(savedUsername));
            } catch (error) {
                console.error('Error parsing username from localStorage:', error);
            }
        }
    }, [setUsername]);

    const handleOpenModal = () => {
        console.log('Opening modal...');
        setIsOpen(true);
    };

    useEffect(() => {
        console.log(username);
    }, [username]);

    useEffect(() => {
        console.log('isOpen:', isOpen);
    }, [isOpen]);

    return (
        <ThemeProvider theme={NVTheme}>
            <AppBar position="static" elevation={0} sx={{ height: '10vh' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                        <Link
                            component={RouterLink}
                            to="/"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%',
                                color: 'inherit',
                                textDecoration: 'none',
                                transition: 'color 0.3s ease',
                                '&:hover': {
                                    color: '#999999',
                                    cursor: 'pointer',
                                },
                                '@media (max-width: 768px)': {
                                    margin: '0',
                                },
                            }}
                        >
                            <img
                                alt=""
                                src="/logo.svg"
                                style={{
                                    height: '51%',
                                    verticalAlign: 'middle',
                                    horizontalAlign: 'middle',
                                }}
                            />
                        </Link>
                    </Box>
                    {isMobile ? (
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="end"
                            onClick={handleDrawerToggle}
                            sx={{ marginLeft: 'auto' }}
                        >
                            <DehazeSharpIcon fontSize="large" />
                        </IconButton>
                    ) : (
                        <Box sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right', flexGrow: 1 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                {login && !isdev ? (
                                    <>
                                        <Typography sx={{ cursor: 'pointer', fontFamily: 'RIDIBatang' }} onClick={handleOpenModal}>
                                            {username}
                                        </Typography>
                                        <LogoutButton>로그아웃</LogoutButton>
                                    </>
                                ) : (
                                    isdev ? (
                                        <Devnavlinkcomplex username={username} />
                                    ) : (
                                        <Usernavlinkcomplex username={username} />
                                    )
                                )}
                            </Box>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>
            <UserModal username={username} />
            <div className="divline" style={{ backgroundColor: '#000000', width: '100%', height: '2px', marginBottom: '1%' }}></div>
        </ThemeProvider>
    );
}

export default NavigationBar;
