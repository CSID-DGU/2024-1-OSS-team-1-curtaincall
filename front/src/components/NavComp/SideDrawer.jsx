import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItemButton, ListItemText} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { SDTheme } from './Theme/SideDrawerTheme';
import Devsidelinkcomplex from "./devsidelinkcomplex";

function SideDrawer({ open, handleDrawerToggle }) {
    return (
        <ThemeProvider theme={SDTheme}>
            <Drawer anchor="right" open={open} onClose={handleDrawerToggle}>
                <List>
                    <Devsidelinkcomplex handleDrawerToggle={handleDrawerToggle}/>
                </List>
            </Drawer>
        </ThemeProvider>
    );
}

export default SideDrawer;