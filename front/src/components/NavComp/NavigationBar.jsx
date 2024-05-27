import React, {useEffect} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {Link, Typography} from '@mui/material';
import { AppBar, Toolbar, IconButton, Box} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { NVTheme } from './Theme/NavigationBarTheme';
import Devnavlinkcomplex from "./devnavlinkcomplex";
import Usernavlinkcomplex from "./usernavlinkomplex";
import {useRecoilState} from "recoil";
import {loginState, modalState} from '../../atom/atom';
import api from "../../axios";
import {useRecoilValue} from "recoil";
import {usernameState} from "../../atom/atom";
import UserModal from "../Modal/UserModal";

function NavigationBar({ isMobile, handleDrawerToggle }) {
    const login = useRecoilValue(loginState);
    const isdev = false;
    const [username, setUsername] = useRecoilState(usernameState);
    const [isOpen, setIsOpen] = useRecoilState(modalState);

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
        <AppBar position="static" elevation={0}>
            <Toolbar style={{ display: 'flex' }}>
                <Link component={RouterLink} to="/" sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    color: 'inherit',
                    textDecoration: 'none',
                    padding: '0px',
                    marginRight: '5%',
                    marginLeft: '5%',
                    transition: 'color 0.3s ease',
                    '&:hover': {
                        color: '#999999',
                        cursor: 'pointer'
                    },
                    '@media (max-width: 768px)': {
                        margin: '0',
                    }
                }}>
                    <img alt="" src="/transparentCc.png" width="30" height="30" style={{ verticalAlign: 'middle' }} />
                    𝑪𝒖𝒓𝒕𝒂𝒊𝒏𝑪𝒂𝒍𝒍
                </Link>
                {isMobile ? (
                    <IconButton color="inherit" aria-label="open drawer" edge="end" onClick={handleDrawerToggle} sx={{ marginLeft: 'auto' }}>
                        <MenuRoundedIcon fontSize={"large"}/>
                    </IconButton>
                ) : (
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            {login && !isdev ? (
                                <Typography sx={{ cursor: 'pointer' }} onClick={handleOpenModal}>
                                    {username}
                                </Typography>
                            ) : (
                                isdev ? (
                                    <Devnavlinkcomplex username={username}/>
                                ) : (
                                    <Usernavlinkcomplex username={username}/>
                                )
                            )}
                        </Box>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
            <UserModal username={username} />
        </ThemeProvider>
    );
}

export default NavigationBar;