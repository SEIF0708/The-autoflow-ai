import React, { useRef, useState } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Avatar, Button, TextField, Box, Typography, IconButton, InputAdornment
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function ProfileDialog({ open, onClose }) {
    const [name, setName] = useState('John Doe');
    const [avatar, setAvatar] = useState('/avatar.png');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const fileInputRef = useRef();

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => setAvatar(ev.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        // TODO: Save logic (API call etc.)
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>Account Settings</DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                    <Avatar src={avatar} sx={{ width: 80, height: 80, mb: 1 }} />
                    <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                        onChange={handleAvatarChange}
                    />
                    <Button
                        variant="outlined"
                        startIcon={<PhotoCamera />}
                        size="small"
                        onClick={() => fileInputRef.current.click()}
                        sx={{ mb: 2 }}
                    >
                        Change Photo
                    </Button>
                </Box>
                <TextField
                    label="Name"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>Change Password</Typography>
                <TextField
                    label="Current Password"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    margin="normal"
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(s => !s)} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <TextField
                    label="New Password"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    margin="normal"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                />
                <TextField
                    label="Confirm New Password"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    margin="normal"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button onClick={handleSave} variant="contained" color="primary">Save</Button>
            </DialogActions>
        </Dialog>
    );
} 