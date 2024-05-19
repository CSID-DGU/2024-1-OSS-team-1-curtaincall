import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import { AppBar, Toolbar, IconButton, Box} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { NVTheme } from './Theme/NavigationBarTheme';

function NavigationBar({ isMobile, handleDrawerToggle }) {

    const LinkStyle = {
        padding: 1,
        color: 'inherit',
        textDecoration: 'none',
        transition: 'color 0.3s ease',
        '&:hover': {
            color: '#999999'
        }
    };

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
                        <Link component={RouterLink} to="/" sx={LinkStyle}>초기 화면</Link>
                        <Link component={RouterLink} to="/host" sx={LinkStyle}>호스트 방</Link>
                        <Link component={RouterLink} to="/guest" sx={LinkStyle}>게스트 방</Link>
                        <Link component={RouterLink} to="/upload" sx={LinkStyle}>업로드</Link>
                        <Link component={RouterLink} to="/sort" sx={LinkStyle}>정렬</Link>
                        <Link component={RouterLink} to="/quarter" sx={LinkStyle}>4분할</Link>
                        <Link component={RouterLink} to="/choose" sx={LinkStyle}>선택</Link>
                        <Link component={RouterLink} to="/login" sx={LinkStyle}>로그인</Link>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
        </ThemeProvider>
    );
}

export default NavigationBar;