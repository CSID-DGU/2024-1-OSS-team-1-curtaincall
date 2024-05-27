import React, { useState } from 'react';
import axios from 'axios';
import localuri from '../../pages/localuri';

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
        <form onSubmit={handleSubmit}>
            <div>
                <label>Current Password:</label>
                <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
            </div>
            <div>
                <label>New Password:</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </div>
            <button type="submit">Change Password</button>
        </form>
    );
};

export default PasswordChangeForm;
