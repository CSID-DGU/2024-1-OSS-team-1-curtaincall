import React from 'react';
import { Drawer, List, ListItemButton, ListItemText, Typography, Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { SDTheme } from './Theme/SideDrawerTheme';
import Devsidelinkcomplex from "./devsidelinkcomplex";
import Usersidelinkcomplex from "./usersidelinkcomplex";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginState, usernameState, modalState } from "../../atom/atom";
import UserModal from "../Modal/UserModal";
import LogoutButton from "./LogoutButton";
import SideLogoutButton from "./SideLogoutButton";

function SideDrawer({ open, handleDrawerToggle }) {
    const login = useRecoilValue(loginState); // 로그인 상태를 Recoil에서 가져옴
    const username = useRecoilValue(usernameState); // 사용자 이름을 Recoil에서 가져옴
    const isdev = false; // 개발자 모드 상태
    const [isOpen, setIsOpen] = useRecoilState(modalState); // 모달 상태

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    return (
        <ThemeProvider theme={SDTheme}>
            <Drawer anchor="right" open={open} onClose={handleDrawerToggle}>
                <List>
                    {login ? (
                        <>
                            {isdev ? (
                                <Devsidelinkcomplex handleDrawerToggle={handleDrawerToggle} username={username}/>
                            ) : (
                                <Usersidelinkcomplex handleDrawerToggle={handleDrawerToggle} username={username}/>
                            )}
                            <ListItemButton onClick={handleOpenModal}>
                                <ListItemText primary={username}
                                              primaryTypographyProps={{
                                                  style: {
                                                      fontFamily: 'RIDIBatang',
                                                  },
                                              }}/>
                            </ListItemButton>
                            <SideLogoutButton>로그아웃</SideLogoutButton>
                        </>
                    ) : (
                        <Usersidelinkcomplex handleDrawerToggle={handleDrawerToggle} username={username}/>
                    )}
                </List>
            </Drawer>
            <UserModal username={username} />
        </ThemeProvider>
    );
}

export default SideDrawer;
