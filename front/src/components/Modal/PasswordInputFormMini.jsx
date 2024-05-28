import React from 'react';
import { TextField, ThemeProvider, Box } from '@mui/material';
import { InputFormMiniTheme } from '../.PublicTheme/InputFormMini'

function PasswordInputFormMini({ password, onPasswordChange, placeholder }) {
    return (
        <ThemeProvider theme={InputFormMiniTheme}>
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <TextField
                    hiddenLabel
                    type="password"
                    variant="outlined"
                    placeholder={placeholder}
                    value={password}
                    onChange={(e) => onPasswordChange(e.target.value)}
                    sx={{ width: '33.33vw', marginTop: '0.25vw', marginLeft: '0.25vw' }}
                />
            </Box>
        </ThemeProvider>
    );
}

export default PasswordInputFormMini;
