import React from 'react';
import { TextField, ThemeProvider } from '@mui/material';
import { InputFormTheme } from '../.PublicTheme/InputForm'

function IDInputForm({ username, onUsernameChange }) {
    return (
        <ThemeProvider theme={InputFormTheme}>
            <TextField
                hiddenLabel
                variant="outlined"
                placeholder="Username"
                value={username}
                onChange={(e) => onUsernameChange(e.target.value)}
                fullWidth
            />
        </ThemeProvider>
    );
}

export default IDInputForm;