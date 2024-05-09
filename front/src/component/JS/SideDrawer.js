import React from 'react';
import { Drawer, List, ListItemButton, ListItemText, Link } from '@mui/material';

function SideDrawer({ open, handleDrawerToggle }) {
    return (
        <Drawer anchor="right" open={open} onClose={handleDrawerToggle}>
            <List>
                <ListItemButton component={Link} to="/" onClick={handleDrawerToggle}><ListItemText primary="초기 화면" /></ListItemButton>
                <ListItemButton component={Link} to="/host" onClick={handleDrawerToggle}><ListItemText primary="호스트 방" /></ListItemButton>
                <ListItemButton component={Link} to="/guest" onClick={handleDrawerToggle}><ListItemText primary="게스트 방" /></ListItemButton>
                <ListItemButton component={Link} to="/upload" onClick={handleDrawerToggle}><ListItemText primary="업로드" /></ListItemButton>
                <ListItemButton component={Link} to="/sort" onClick={handleDrawerToggle}><ListItemText primary="정렬" /></ListItemButton>
                <ListItemButton component={Link} to="/quarter" onClick={handleDrawerToggle}><ListItemText primary="4분할" /></ListItemButton>
                <ListItemButton component={Link} to="/choose" onClick={handleDrawerToggle}><ListItemText primary="선택" /></ListItemButton>
            </List>
        </Drawer>
    );
}

export default SideDrawer;