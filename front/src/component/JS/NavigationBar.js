import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { NVTheme } from './NavigationBarTheme';

function NavigationBar({ isMobile, handleDrawerToggle }) {
    return (
        <ThemeProvider theme={NVTheme}>
        <AppBar position="static" elevation={0}>
            <Toolbar style={{ display: 'flex' }}>
                <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', color: 'inherit', textDecoration: 'none', padding: '0px', marginRight: '5%', marginLeft: '5%' }}>
                    <img alt="" src="/transparentCc.png" width="30" height="30" style={{ verticalAlign: 'middle' }} />
                    CurtainCall
                </Link>
                {isMobile ? (
                    <IconButton color="inherit" aria-label="open drawer" edge="end" onClick={handleDrawerToggle} sx={{ marginLeft: 'auto' }}>
                        <MenuIcon />
                    </IconButton>
                ) : (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Link to="/" style={{ padding: 8, color: 'inherit', textDecoration: 'none' }}>초기 화면</Link>
                        <Link to="/host" style={{ padding: 8, color: 'inherit', textDecoration: 'none' }}>호스트 방</Link>
                        <Link to="/guest" style={{ padding: 8, color: 'inherit', textDecoration: 'none' }}>게스트 방</Link>
                        <Link to="/upload" style={{ padding: 8, color: 'inherit', textDecoration: 'none' }}>업로드</Link>
                        <Link to="/sort" style={{ padding: 8, color: 'inherit', textDecoration: 'none' }}>정렬</Link>
                        <Link to="/quater" style={{ padding: 8, color: 'inherit', textDecoration: 'none' }}>4분할</Link>
                        <Link to="/choose" style={{ padding: 8, color: 'inherit', textDecoration: 'none' }}>선택</Link>
                    </div>
                )}
            </Toolbar>
        </AppBar>
        </ThemeProvider>
    );
}

export default NavigationBar;