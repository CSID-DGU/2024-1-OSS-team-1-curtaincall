import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItemButton, ListItemText} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { SDTheme } from './Theme/SideDrawerTheme';

function SideDrawer({ open, handleDrawerToggle }) {
    return (
        <ThemeProvider theme={SDTheme}>
            <Drawer anchor="right" open={open} onClose={handleDrawerToggle}>
                <List>
                    <ListItemButton component={Link} to="/" onClick={handleDrawerToggle}><ListItemText primary="초기 화면" /></ListItemButton>
                    <ListItemButton component={Link} to="/host" onClick={handleDrawerToggle}><ListItemText primary="호스트 방" /></ListItemButton>
                    <ListItemButton component={Link} to="/guest" onClick={handleDrawerToggle}><ListItemText primary="게스트 방" /></ListItemButton>
                    <ListItemButton component={Link} to="/upload" onClick={handleDrawerToggle}><ListItemText primary="업로드" /></ListItemButton>
                    <ListItemButton component={Link} to="/sort" onClick={handleDrawerToggle}><ListItemText primary="정렬" /></ListItemButton>
                    <ListItemButton component={Link} to="/quarter" onClick={handleDrawerToggle}><ListItemText primary="4분할" /></ListItemButton>
                    <ListItemButton component={Link} to="/choose" onClick={handleDrawerToggle}><ListItemText primary="선택" /></ListItemButton>
                    <ListItemButton component={Link} to="/login" onClick={handleDrawerToggle}><ListItemText primary="로그인" /></ListItemButton>
                </List>
            </Drawer>
        </ThemeProvider>
    );
}

export default SideDrawer;