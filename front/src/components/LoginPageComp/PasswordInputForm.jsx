import React from 'react';
import { TextField, ThemeProvider } from '@mui/material';
import { InputFormTheme } from '../.PublicTheme/InputForm'
import Form from 'react-bootstrap/Form';

function PasswordInputForm({ password, onPasswordChange }) {
    return (
        <ThemeProvider theme={InputFormTheme}>
            <div className="emailInputWrapper" style={{ width: '100%', display: 'flex', justifyContent: 'self-start', flexDirection: 'column', alignItems: 'self-start' }}>
            <Form.Label htmlFor="inputPassword5" style={{fontFamily: 'RIDIBatang'}}>비밀번호</Form.Label>
            <Form.Control
                type="password"
                id="inputPassword5"
                aria-describedby="passwordHelpBlock"
            />
            </div>
            {/* <Form.Text id="passwordHelpBlock" muted>
                Your password must be 8-20 characters long, contain letters and numbers,
                and must not contain spaces, special characters, or emoji.
            </Form.Text> */}
        </ThemeProvider>
    );
}

export default PasswordInputForm;