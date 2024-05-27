import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';

const LinkStyle = {
    padding: 1,
    color: 'inherit',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
    '&:hover': {
        color: '#999999'
    }
};

function Devnavlinkcomplex() {
    return (
        <>
            <Link component={RouterLink} to="/" sx={LinkStyle}>초기 화면</Link>
            <Link component={RouterLink} to="/host" sx={LinkStyle}>호스트 방</Link>
            <Link component={RouterLink} to="/guest" sx={LinkStyle}>게스트 방</Link>
            <Link component={RouterLink} to="/upload" sx={LinkStyle}>업로드</Link>
            <Link component={RouterLink} to="/sort" sx={LinkStyle}>정렬</Link>
            <Link component={RouterLink} to="/quarter" sx={LinkStyle}>4분할</Link>
            <Link component={RouterLink} to="/select" sx={LinkStyle}>선택</Link>
            <Link component={RouterLink} to="/login" sx={LinkStyle}>로그인</Link>
            <Link component={RouterLink} to="/singup" sx={LinkStyle}>회원가입</Link>
        </>
    );
}

export default Devnavlinkcomplex;