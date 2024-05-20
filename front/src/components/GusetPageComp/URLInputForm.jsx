import React from 'react';
import { TextField, ThemeProvider } from '@mui/material';
import { InputFormTheme } from '../.PublicTheme/InputForm'

function URLInputForm({ url, onUrlChange }) {
    return (
        <ThemeProvider theme={InputFormTheme}>
            <TextField
                hiddenLabel
                variant="outlined"
                placeholder="Input Room URL"
                value={url}
                onChange={(e) => onUrlChange(e.target.value)}
                fullWidth
            />
        </ThemeProvider>
    );
}

export default URLInputForm;