import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { modalState } from '../../atom/atom';
import IDInputFormMini from "./IDInputFormMini";
import PasswordInputFormMini from "./PasswordInputFormMini";
import ConfirmButtonMini from "./ConfirmButtonMini";
import { Modal, Box, Typography } from '@mui/material';

function UserModal({ username }) {
    const [varusername, setvarUsername] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [isOpen, setIsOpen] = useRecoilState(modalState);
    const [mode, setMode] = useState('');

    const handleOpenNicknameChange = () => {
        setMode('nickname');
    };

    const handleOpenPasswordChange = () => {
        setMode('password');
    };

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
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                height: '70%'
            }}>
                <Typography id="user-modal-title" variant="h6" component="h2">
                    사용자 정보
                </Typography>
                <Typography id="user-modal-description">
                    {username}님, 환영합니다.
                </Typography>
                {mode === 'nickname' && (
                    <>
                        <IDInputFormMini username={varusername} onUsernameChange={setvarUsername} placeholder="새 닉네임"/>
                        <ConfirmButtonMini onClick={() => {}}>닉네임 수정</ConfirmButtonMini>
                    </>
                )}
                {mode === 'password' && (
                    <>
                        <PasswordInputFormMini password={password1} onPasswordChange={setPassword1} placeholder="새 비밀번호"/>
                        <PasswordInputFormMini password={password2} onPasswordChange={setPassword2} placeholder="비밀번호 확인"/>
                        <ConfirmButtonMini onClick={() => {}}>비밀번호 수정</ConfirmButtonMini>
                    </>
                )}
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-around', mt: 4 }}>
                    <ConfirmButtonMini onClick={handleOpenNicknameChange}>닉네임 변경</ConfirmButtonMini>
                    <ConfirmButtonMini onClick={handleOpenPasswordChange}>비밀번호 변경</ConfirmButtonMini>
                </Box>
            </Box>
        </Modal>
    );
}

export default UserModal;
