import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {Link, ListItemButton, ListItemText} from '@mui/material';
import {loginState} from '../../atom/atom';
import {useRecoilValue} from "recoil";

function Usersidelinkcomplex({handleDrawerToggle, username}) {
    const login = useRecoilValue(loginState);

    return (
        !login && (<>
                <ListItemButton component={Link} to="/login" onClick={handleDrawerToggle}><ListItemText primary="로그인" /></ListItemButton>
                <ListItemButton component={Link} to="/signup" onClick={handleDrawerToggle}><ListItemText primary="회원가입" /></ListItemButton>
            </>)
    );
}

export default Usersidelinkcomplex;