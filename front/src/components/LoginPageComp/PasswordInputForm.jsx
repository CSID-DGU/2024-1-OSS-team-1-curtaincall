import React from 'react';
import { TextField, ThemeProvider } from '@mui/material';
import { InputFormTheme } from '../.PublicTheme/InputForm'

function PasswordInputForm({ password, onPasswordChange }) {
    return (
        <ThemeProvider theme={InputFormTheme}>
            <TextField
                hiddenLabel
                type="password"
                variant="outlined"
                placeholder="Password"
                value={password}
                onChange={(e) => onPasswordChange(e.target.value)}
                fullWidth
            />
        </ThemeProvider>
    );
}

export default PasswordInputForm;