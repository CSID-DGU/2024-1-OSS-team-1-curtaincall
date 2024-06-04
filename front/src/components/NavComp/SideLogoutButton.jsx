import React, { useState } from 'react';
import { Button, CircularProgress, ThemeProvider } from '@mui/material';
import api from "../../axios";
import {useNavigate} from "react-router-dom";
import {useRecoilState, useRecoilValue} from "recoil";
import {loginState} from "../../atom/atom";
import {SideButtonThemeMaxMini} from "./Theme/SideButtonThemeMaxMini";

function LogoutButton({ onClick, children, disabled }) {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [islogin, setislogin] = useRecoilState(loginState);

    const handleClick = async () => {
        if (loading) return;
        setLoading(true);
        await api.post('accounts/dj-rest-auth/logout/');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setislogin(false);
        console.log("islogin : ",islogin);
        console.log("logingout");
        navigate('/login');
    };

    return (
        <ThemeProvider theme={SideButtonThemeMaxMini}>
            <Button
                variant="contained"
                color="primary"
                onClick={handleClick}
                disabled={loading || disabled}
                sx={{
                    backgroundColor: (loading || disabled) ? '#bfbfbf' : '#7f7f7f',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: (loading || disabled) ? '#bfbfbf' : '#bfbfbf'
                    }
                }}>
                {loading ? <CircularProgress size={24} color="inherit" /> : children}
            </Button>
        </ThemeProvider>
    );
}

export default LogoutButton;