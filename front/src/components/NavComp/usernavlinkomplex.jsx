import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import {loginState} from '../../atoms/loginState';
import {useRecoilState} from "recoil";

const LinkStyle = {
    padding: 1,
    color: 'inherit',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
    '&:hover': {
        color: '#999999'
    }
};

function Usernavlinkcomplex() {
    const login = useRecoilState(loginState);

    return (
        login ? (<> 로그인 됨! </>) :
            (<>
                <Link component={RouterLink} to="/login" sx={LinkStyle}>로그인</Link>
                <Link component={RouterLink} to="/singup" sx={LinkStyle}>회원가입</Link>
            </>)
    );
}

export default Usernavlinkcomplex;