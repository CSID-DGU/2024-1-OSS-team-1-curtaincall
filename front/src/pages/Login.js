import React, { useState } from 'react';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LoginButton from '../component/LoginPageComp/LoginButton'; // Adjust the path accordingly
import UsernameInputForm from '../component/LoginPageComp/IDInputForm'; // Adjust the path accordingly
import PasswordInputForm from '../component/LoginPageComp/PasswordInputForm'; // Adjust the path accordingly

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log('Logging in with:', { username, password });
        navigate('/');
    };

    return (
        <Container>
            <br/>
            <UsernameInputForm username={username} onUsernameChange={setUsername} />
            <br/>
            <PasswordInputForm password={password} onPasswordChange={setPassword} />
            <br/>
            <LoginButton onClick={handleLogin}>Login</LoginButton>
        </Container>
    );
}

export default Login;