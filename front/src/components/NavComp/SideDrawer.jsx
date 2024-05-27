import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItemButton, ListItemText} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { SDTheme } from './Theme/SideDrawerTheme';
import Devsidelinkcomplex from "./devsidelinkcomplex";
import {useRecoilState} from "recoil";
import {isdevState} from "../../atom/atom";
import Usersidelinkcomplex from "./usersidelinkcomplex";


function SideDrawer({ open, handleDrawerToggle }) {
    const isdev = useRecoilState(isdevState);
    return (
        <ThemeProvider theme={SDTheme}>
            <Drawer anchor="right" open={open} onClose={handleDrawerToggle}>
                <List>
                    {isdev ? <Devsidelinkcomplex handleDrawerToggle={handleDrawerToggle}/> : <Usersidelinkcomplex handleDrawerToggle={handleDrawerToggle}/>}
                </List>
            </Drawer>
        </ThemeProvider>
    );
}

export default SideDrawer;