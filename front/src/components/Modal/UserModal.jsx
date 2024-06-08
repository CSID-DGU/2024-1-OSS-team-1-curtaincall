import React, {useEffect, useState} from 'react';
import { useRecoilState } from 'recoil';
import { modalState, loginState, isModalNameState, isModalPWState } from '../../atom/atom';
import IDInputFormMini from "./IDInputFormMini";
import PasswordInputFormMini from "./PasswordInputFormMini";
import ConfirmButtonMini from "./ConfirmButtonMini";
import { Modal, Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import api from "../../axios";
import { useNavigate } from "react-router-dom";
import NickchangeButtonMini from "./NickchangeButtonMini";
import PasswordInputFormMiniTop from "./PasswordInputFormMiniTop";
import { motion } from 'framer-motion';

function UserModal({ username }) {
    const navigate = useNavigate();
    const [varusername, setvarUsername] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [isOpen, setIsOpen] = useRecoilState(modalState);
    const [mode, setMode] = useState('');
    const [islogin, setislogin] = useRecoilState(loginState);
    const [isModalName, setisModalName] = useRecoilState(isModalNameState);
    const [isModalPW, setisModalPW] = useRecoilState(isModalPWState);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const checkPasswordMatch = () => {
        return password1 === password2;
    };

    const checkPasswordLength = (password) => {
        return password.length >= 8;
    };

    const ispwnull = (password) => {
        return password === '';
    }

    const isnicknull = (username) => {
        return username === '';
    }

    const hasSpecialCharacter = (password) => {
        const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        return specialCharRegex.test(password);
    };

    const handleOpenNicknameChange = () => {
        setMode('nickname');
    };

    const handleOpenPasswordChange = () => {
        setMode('password');
    };

    const handleChangePassword = async () => {

        try {
            const response = await api.post('accounts/password/change/', {
                new_password1: password1,
                new_password2: password2
            });
            setPassword1('');
            setPassword2('');
            if(response.status === 200) {
                alert('비밀번호가 변경되었습니다. 로그아웃합니다.');
                await api.post('accounts/logout/');
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                setMode('');
                setIsOpen(false);
                setislogin(false);
                navigate('/login');
            }
        } catch (error) {
            alert('비밀번호 변경에 실패했습니다. 다시 시도해주세요.');
        }
    }

    const handleNicknameChange = async () => {
        try {
            const response = await api.post('accounts/replaceUsername/', {
                username: varusername  // 닉네임 변경 대상 필드 수정
            });
            setvarUsername('');
            if (response.status === 200) {
                alert('닉네임이 변경되었습니다. 로그아웃합니다.');
                await api.post('accounts/logout/');
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                setMode('');
                setIsOpen(false);
                setislogin(false);
                navigate('/login');
            }
        } catch (error) {
                alert('닉네임 변경에 실패했습니다. 다시 시도해주세요.');
        }
    };

    useEffect(() => {
        if(!checkPasswordMatch() || !checkPasswordLength(password1) || !hasSpecialCharacter(password1)) {
            setisModalPW(false);
        }
        else {
            setisModalPW(true);
        }
    }, [password1, password2, isModalPW]);

    useEffect(() => {
        if(!isnicknull(varusername)) {
            setisModalName(false);
        }
        else {
            setisModalName(true);
        }
    }, [varusername, isModalName]);

    const buttonVariants = {
        initial: {
            opacity: 0,
            y: 20,
        },
        in: {
            opacity: 1,
            y: 0,
        },
        out: {
            opacity: 0,
            y: -20,
        },
    };

    const buttonTransition = (delay = 0) => ({
        type: 'tween',
        ease: 'anticipate',
        duration: 0.8,
        delay: delay,
    });

    return (
        <Modal
            open={isOpen}
            onClose={() => {
                setIsOpen(false);
                setMode('');
            }}
            aria-labelledby="user-modal-title"
            aria-describedby="user-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '50%',
                minWidth: 300,
                maxWidth: '90vw',
                bgcolor: '#F5F5F5',
                border: '2px solid #000',
                boxShadow: 24,
                display: 'flex',
                flexDirection: 'column',
                height: isMobile ? '50%' : '70%',
                justifyContent: 'space-between',
            }}>
                <Box sx={{ p: 2, textAlign: 'center' }}>
                    <motion.div
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={buttonVariants}
                        transition={buttonTransition(0.2)}
                    >
                        <Typography id="user-modal-title" variant="h5" component="h1" style={{ fontFamily: 'RIDIBatang' }}>
                            사용자 정보
                        </Typography>
                    </motion.div>
                    <motion.div
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={buttonVariants}
                        transition={buttonTransition(0.4)}
                    >
                        <Typography id="user-modal-description" style={{ fontFamily: 'RIDIBatang' }}>
                            {username}님, 환영합니다.
                        </Typography>
                    </motion.div>
                </Box>
                <Box sx={{
                    p: 4,
                    flex: '1 1 auto',
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2
                }}>
                    {mode === 'nickname' && (
                        <>
                            <IDInputFormMini
                                username={varusername}
                                onUsernameChange={setvarUsername}
                                placeholder="새 닉네임"
                                onLinkClick={handleNicknameChange}
                            />
                        </>
                    )}
                    {mode === 'password' && (
                        <>
                            <PasswordInputFormMiniTop
                                password={password1}
                                onPasswordChange={setPassword1}
                                placeholder="새 비밀번호"
                                onLinkClick={handleChangePassword}
                            />
                            {!ispwnull(password1) && !checkPasswordLength(password1) && <Typography color="error">비밀번호는 최소 8글자 이상이어야 합니다!</Typography>}
                            {!ispwnull(password1) && checkPasswordLength(password1) && !hasSpecialCharacter(password1) && <Typography color="error">비밀번호는 특수문자를 포함해야 합니다!</Typography>}
                            <PasswordInputFormMini password={password2} onPasswordChange={setPassword2} placeholder="비밀번호 확인" />
                            {!checkPasswordMatch() && <Typography color="error">비밀번호가 다릅니다!</Typography>}
                        </>
                    )}
                </Box>
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-around', borderTop: '1px solid #000' }}>
                    <motion.div
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={buttonVariants}
                        transition={buttonTransition(0.3)}
                        style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', minWidth: 0 }}
                    >
                        <NickchangeButtonMini onClick={handleOpenNicknameChange}>닉네임 변경</NickchangeButtonMini>
                    </motion.div>
                    <motion.div
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={buttonVariants}
                        transition={buttonTransition(0.5)}
                        style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', minWidth: 0 }}
                    >
                        <ConfirmButtonMini onClick={handleOpenPasswordChange}>비밀번호 변경</ConfirmButtonMini>
                    </motion.div>
                </Box>
            </Box>
        </Modal>
    );
}

export default UserModal;
