import React, { useState } from 'react';
import axios from 'axios';
import localuri from '../../pages/localuri';
import { TextField, Button, ThemeProvider } from '@mui/material';
import { InputFormTheme } from '../.PublicTheme/InputForm';

const PasswordChangeForm = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://${localuri}/change-password/`, {
            current_password: currentPassword,
            new_password: newPassword,
        })
        .then(response => {
            alert('Password changed successfully');
        })
        .catch(error => {
            console.error('Error changing password:', error);
        });
    };

    return (
        <ThemeProvider theme={InputFormTheme}>
            <form onSubmit={handleSubmit}>
                <div>
                    <TextField
                        label="Current Password"
                        type="password"
                        variant="outlined"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                </div>
                <div>
                    <TextField
                        label="New Password"
                        type="password"
                        variant="outlined"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                </div>
                <Button type="submit" variant="contained" color="primary">
                    Change Password
                </Button>
            </form>
        </ThemeProvider>
    );
};

export default PasswordChangeForm;
