import React, { useState } from 'react';
import { Container } from '@mui/material';
import UsernameInputForm from '../components/LoginPageComp/IDInputForm'; // Adjust the path accordingly
import PasswordInputForm from '../components/LoginPageComp/PasswordInputForm'; // Adjust the path accordingly
import { useNavigate } from 'react-router-dom';
import LoginButton from "../components/LoginPageComp/LoginButton";
import api from "../axios";
import CustomContainer from "../components/ContainerComp/CustomContainer";

import ImageSlider from '../components/StartPageComp/ImageSlider';

import slide1 from '../img/slide1.jpg';
import slide2 from '../img/slide2.jpg';

import {
    useMediaQuery,
    useTheme,
} from "@mui/material";
import {useRecoilState} from "recoil";
import {loginState, usernameState} from "../atom/atom";
import {motion} from "framer-motion";
function SignUp() {
    const navigate = useNavigate();
    const [constusername, setConstUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

    const [login, setLogin] = useRecoilState(loginState);
    const [username, setUsername] = useRecoilState(usernameState);


    const fetchUsername = async () => {
        try {
            const response = await api.get('/accounts/user/');
            console.log('API Response:', response.data);
            setUsername(response.data.pk);
        } catch (error) {
            console.error('Failed to fetch username:', error);
        }
    };

    const checkPasswordMatch = () => {
        return password1 === password2;
    };

    const areAllFieldsFilled = () => {
        return username !== '' && email !== '' && password1 !== '' && password2 !== '';
    };

    const checkPasswordLength = (password) => {
        return password.length >= 8;
    };

    const ispwnull = (password) => {
        return password === '';
    }

    const hasSpecialCharacter = (password) => {
        const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        return specialCharRegex.test(password);
    };

    const handleSignUp = async () => {
        console.log('Attempting to sign up with:', { constusername, email, password1, password2 });
        try {
            const response = await api.post('accounts/', {
                username: constusername,
                email: email,
                password1: password1,
                password2: password2
            });
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
                fetchUsername();
                setLogin(true);

                navigate('/');
            } catch (error) {
                console.error('Sign up failed:', error.response.data);
        }
    };

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const maxhe_ = isMobile ? '20%': '67%';

    const images = [
        slide1,
        slide2,
        // 추가 이미지 경로를 여기에 입력하세요.
      ];
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

    const buttonTransition =(delay = 0) => ({
        type: 'tween',
        ease: 'anticipate',
        duration: 0.8,
        delay: delay,
    });


    return (
        <CustomContainer>
        <ImageSlider images={images} interval={9000} maxhe={maxhe_} /> {/* 이미지 슬라이더 컴포넌트를 추가합니다. */}
            <div className="buttonWrapper"
                 style={{display: 'flex', justifyContent: 'top', flexDirection: 'column', marginLeft: '10px'}}>
                <div style={{width: '100%', height: '2px', marginBottom: '2.5%'}}></div>
                <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={buttonVariants}
                    transition={buttonTransition(0.2)}
                >
                    <UsernameInputForm username={constusername} onUsernameChange={setConstUsername}
                                       placeholder="Username"/>
                </motion.div>
                <div style={{width: '100%', height: '2px', marginBottom: '1.5%'}}></div>
                <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={buttonVariants}
                    transition={buttonTransition(0.4)}
                >
                    <UsernameInputForm username={email} onUsernameChange={setEmail} placeholder="Email"/>
                </motion.div>
                <div style={{width: '100%', height: '2px', marginBottom: '1.5%'}}></div>
                <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={buttonVariants}
                    transition={buttonTransition(0.6)}
                >
                    <PasswordInputForm password={password1} onPasswordChange={setPassword1} placeholder="비밀번호"/>
                </motion.div>
                <div style={{width: '100%', height: '2px', marginBottom: '1.5%'}}></div>
                {!ispwnull(password1) && !checkPasswordLength(password1) &&
                    <p style={{color: 'red'}}>비밀번호는 최소 8글자 이상이어야 합니다!</p>}
                {!ispwnull(password1) && checkPasswordLength(password1) && !hasSpecialCharacter(password1) &&
                    <p style={{color: 'red'}}>비밀번호는 특수문자를 포함해야 합니다!</p>}
                <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={buttonVariants}
                    transition={buttonTransition(0.8)}
                >
                    <PasswordInputForm password={password2} onPasswordChange={setPassword2} placeholder="비밀번호 확인"/>
                </motion.div>
                {!checkPasswordMatch() && <p style={{color: 'red'}}>비밀번호가 다릅니다!</p>}
                <div style={{width: '100%', height: '2px', marginBottom: '5%'}}></div>
                <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={buttonVariants}
                    transition={buttonTransition(1)}
                >
                    <LoginButton onClick={handleSignUp}
                                 disabled={!areAllFieldsFilled() || !checkPasswordMatch() || !checkPasswordLength(password1)}>
                        Sign Up
                    </LoginButton>
                </motion.div>
            </div>

        </CustomContainer>

);
}

export default SignUp;