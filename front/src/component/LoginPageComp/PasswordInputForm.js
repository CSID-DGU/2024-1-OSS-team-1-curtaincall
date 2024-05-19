import React from 'react';
import { TextField, ThemeProvider } from '@mui/material';
import { PWDTheme } from './Theme/PWDTheme'; // Import the custom theme for PasswordInput

function PasswordInputForm({ password, onPasswordChange }) {
    return (
        <ThemeProvider theme={PWDTheme}>
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