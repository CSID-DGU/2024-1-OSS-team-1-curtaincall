import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {Link, ListItemButton, ListItemText} from '@mui/material';
import {loginState} from '../../atoms/loginState';
import {useRecoilState} from "recoil";

function Usersidelinkcomplex({handleDrawerToggle}) {
    const login = useRecoilState(loginState);

    return (
        login ? (<> 로그인 됨! </>) :
            (<>
                <ListItemButton component={Link} to="/login" onClick={handleDrawerToggle}><ListItemText primary="로그인" /></ListItemButton>
                <ListItemButton component={Link} to="/signup" onClick={handleDrawerToggle}><ListItemText primary="회원가입" /></ListItemButton>
            </>)
    );
}

export default Usersidelinkcomplex;