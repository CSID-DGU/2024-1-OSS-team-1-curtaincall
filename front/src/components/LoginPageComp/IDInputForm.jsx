import React from 'react';
import { ThemeProvider } from '@mui/material';
import { InputFormTheme } from '../.PublicTheme/InputForm'
import Form from 'react-bootstrap/Form';

function IDInputForm({ username, onUsernameChange, placeholder }) {
    return (
        <ThemeProvider theme={InputFormTheme}>
            <div className="emailInputWrapper" style={{width: '100%', display: 'flex', justifyContent: 'self-start', flexDirection: 'column', alignItems: 'self-start' }}>
            <Form.Label htmlFor="inputPassword5">Email</Form.Label>
            <Form.Control
                type="input"
                id="inputPassword5"
                aria-describedby="passwordHelpBlock"
                style={{ width: '100%' }}
            />
            </div>
            {/* <Form.Text id="passwordHelpBlock" muted>
                Your password must be 8-20 characters long, contain letters and numbers,
                and must not contain spaces, special characters, or emoji.
            </Form.Text> */}
        </ThemeProvider>
    );
}

export default IDInputForm;