import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItemButton, ListItemText} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { SDTheme } from './Theme/SideDrawerTheme';
import Devsidelinkcomplex from "./devsidelinkcomplex";
import {useRecoilState} from "recoil";
import Usersidelinkcomplex from "./usersidelinkcomplex";
import {usernameState} from "../../atom/atom";


function SideDrawer({ open, handleDrawerToggle }) {
    const isdev = true;
    const [username, setUsername] = useRecoilState(usernameState);
    return (
        <ThemeProvider theme={SDTheme}>
            <Drawer anchor="right" open={open} onClose={handleDrawerToggle}>
                <List>
                    {isdev ? (<Devsidelinkcomplex handleDrawerToggle={handleDrawerToggle}/>) : (<Usersidelinkcomplex handleDrawerToggle={handleDrawerToggle} username={username}/>)}
                </List>
            </Drawer>
        </ThemeProvider>
    );
}

export default SideDrawer;