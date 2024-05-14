import React from 'react';
import { TextField, ThemeProvider } from '@mui/material';

import { URLTheme } from './Theme/URLTheme'; // Import the custom theme for URLInput

function URLInputForm({ url, onUrlChange }) {
    return (
        <ThemeProvider theme={URLTheme}>
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