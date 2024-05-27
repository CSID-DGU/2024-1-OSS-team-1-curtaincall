import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {Link, ListItemButton, ListItemText} from '@mui/material';

const LinkStyle = {
    padding: 1,
    color: 'inherit',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
    '&:hover': {
        color: '#999999'
    }
};

function Devsidelinkcomplex({handleDrawerToggle, username}) {
    return (
        <>
            <ListItemButton component={Link} to="/" onClick={handleDrawerToggle}><ListItemText primary="초기 화면" /></ListItemButton>
            <ListItemButton component={Link} to="/host" onClick={handleDrawerToggle}><ListItemText primary="호스트 방" /></ListItemButton>
            <ListItemButton component={Link} to="/guest" onClick={handleDrawerToggle}><ListItemText primary="게스트 방" /></ListItemButton>
            <ListItemButton component={Link} to="/upload" onClick={handleDrawerToggle}><ListItemText primary="업로드" /></ListItemButton>
            <ListItemButton component={Link} to="/sort" onClick={handleDrawerToggle}><ListItemText primary="정렬" /></ListItemButton>
            <ListItemButton component={Link} to="/quarter" onClick={handleDrawerToggle}><ListItemText primary="4분할" /></ListItemButton>
            <ListItemButton component={Link} to="/select" onClick={handleDrawerToggle}><ListItemText primary="선택" /></ListItemButton>
            <ListItemButton component={Link} to="/login" onClick={handleDrawerToggle}><ListItemText primary="로그인" /></ListItemButton>
            <ListItemButton component={Link} to="/signup" onClick={handleDrawerToggle}><ListItemText primary="회원가입" /></ListItemButton>
            {username}
        </>
    );
}

export default Devsidelinkcomplex;