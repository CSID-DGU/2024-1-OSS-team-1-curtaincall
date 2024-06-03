import React, { useState } from 'react';
import { Container } from '@mui/material';
import UsernameInputForm from '../components/LoginPageComp/IDInputForm'; // Adjust the path accordingly
import PasswordInputForm from '../components/LoginPageComp/PasswordInputForm'; // Adjust the path accordingly
import { useNavigate } from 'react-router-dom';
import LoginButton from "../components/LoginPageComp/LoginButton";
import api from "../axios";
import CustomContainer from "../components/CustomContainer";

function SignUp() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

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
        console.log('Attempting to sign up with:', { username, email, password1, password2 });
        try {
            const response = await api.post('accounts/dj-rest-auth/registration/', {
                username: username,
                email: email,
                password1: password1,
                password2: password2
            });
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
                navigate('/');
            } catch (error) {
                console.error('Sign up failed:', error.response.data);
        }
    };

    return (
        <CustomContainer>
        <Container>
            <UsernameInputForm username={username} onUsernameChange={setUsername} placeholder="Username"/>
            <UsernameInputForm username={email} onUsernameChange={setEmail} placeholder="Email"/>
            <PasswordInputForm password={password1} onPasswordChange={setPassword1}/>
            {!ispwnull(password1) && !checkPasswordLength(password1) && <p style={{ color: 'red' }}>비밀번호는 최소 8글자 이상이어야 합니다!</p>}
            {!ispwnull(password1) && checkPasswordLength(password1) && !hasSpecialCharacter(password1) && <p style={{ color: 'red' }}>비밀번호는 특수문자를 포함해야 합니다!</p>}
            <PasswordInputForm password={password2} onPasswordChange={setPassword2}/>
            {!checkPasswordMatch() && <p style={{ color: 'red' }}>비밀번호가 다릅니다!</p>}
            <LoginButton onClick={handleSignUp} disabled={!areAllFieldsFilled() || !checkPasswordMatch() || !checkPasswordLength(password1)}>
                Sign Up
            </LoginButton>

        </Container>
        </CustomContainer>
    );
}

export default SignUp;