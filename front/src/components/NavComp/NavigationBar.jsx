import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import { AppBar, Toolbar, IconButton, Box} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { NVTheme } from './Theme/NavigationBarTheme';
import Devnavlinkcomplex from "./devnavlinkcomplex";
import {isdevState} from "../../atom/atom";
import Usernavlinkcomplex from "./usernavlinkomplex";
import {useRecoilState} from "recoil";

function NavigationBar({ isMobile, handleDrawerToggle }) {
    const isdev = useRecoilState(isdevState);

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
                        {isdev ? <Devnavlinkcomplex /> : <Usernavlinkcomplex/>}
                    </Box>
                )}
            </Toolbar>
        </AppBar>
        </ThemeProvider>
    );
}

export default NavigationBar;