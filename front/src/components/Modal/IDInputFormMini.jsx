import React from 'react';
import { TextField, ThemeProvider, Box } from '@mui/material';
import { InputFormMiniTheme } from '../.PublicTheme/InputFormMini'

function IDInputFormMini({ username, onUsernameChange, placeholder }) {
    return (
        <ThemeProvider theme={InputFormMiniTheme}>
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <TextField
                    hiddenLabel
                    type="text"
                    variant="outlined"
                    placeholder={placeholder}
                    value={username}
                    onChange={(e) => onUsernameChange(e.target.value)}
                    sx={{ width: '33.33vw', marginTop: '0.25vw' }}
                />
            </Box>
        </ThemeProvider>
    );
}

export default IDInputFormMini;
