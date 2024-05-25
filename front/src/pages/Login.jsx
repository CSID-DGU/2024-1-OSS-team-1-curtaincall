import React, { useState } from 'react';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import LoginButton from '../components/LoginPageComp/LoginButton'; // Adjust the path accordingly
import UsernameInputForm from '../components/LoginPageComp/IDInputForm'; // Adjust the path accordingly
import PasswordInputForm from '../components/LoginPageComp/PasswordInputForm'; // Adjust the path accordingly
import api from '../axios'

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log('Logging in with:', { username, password });
        navigate('/');
    };

    const handleGoogleLoginSuccess = async (response) => {
        console.log('Google login successful:', response);
        try {
            const res = await api.post('/auth/complete/google-oauth2/', {
                access_token: response.credential,
                state: response.state  // state 매개변수 포함
            });
            if (res.data.key) {
                navigate('/');
            } else {
                console.error('Login failed:', res.data.message);
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <Container>
            <br/>
            <UsernameInputForm username={username} onUsernameChange={setUsername} />
            <br/>
            <PasswordInputForm password={password} onPasswordChange={setPassword} />
            <br/>
            <LoginButton onClick={handleLogin}>Login</LoginButton>
            <br/>
            <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onFailure={(response) => console.error('Google login failed:', response)}
            />
        </Container>
    );
}

export default Login;
