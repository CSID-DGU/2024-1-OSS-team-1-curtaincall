import React from 'react';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { DBTheme } from './Theme/DBTheme'; // Custom theme 파일

const DropDownButton = ({ value, onChange }) => {
    return (
        <ThemeProvider theme={DBTheme}>
            <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel id="choose-dropdown-label">Their Picks?</InputLabel>
                <Select
                    labelId="choose-dropdown-label"
                    value={value}
                    onChange={onChange}
                    label="Their Picks?"
                >
                    <MenuItem value="host">호스트</MenuItem>
                    <MenuItem value="IP1">IP1</MenuItem>
                    <MenuItem value="IP3">IP3</MenuItem>
                </Select>
            </FormControl>
        </ThemeProvider>
    );
};

export default DropDownButton;