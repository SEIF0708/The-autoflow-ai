import React, { useState } from 'react';
import {
    Typography,
    Box,
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
    TextField,
    Switch,
    FormControlLabel,
    Chip,
    Avatar,
    Divider,
    Alert,
    IconButton,
    Tooltip
} from '@mui/material';
import {
    Instagram,
    WhatsApp,
    Facebook,
    MusicNote,
    Settings,
    Refresh,
    CheckCircle,
    Error
} from '@mui/icons-material';

export default function ChatbotChannels() {
    const [connections, setConnections] = useState({
        instagram: { connected: false, token: '', username: '' },
        whatsapp: { connected: false, phone: '', apiKey: '' },
        facebook: { connected: false, pageId: '', accessToken: '' },
        tiktok: { connected: false, username: '', apiKey: '' }
    });

    const handleConnectionToggle = (platform) => {
        setConnections(prev => ({
            ...prev,
            [platform]: {
                ...prev[platform],
                connected: !prev[platform].connected
            }
        }));
    };

    const handleInputChange = (platform, field, value) => {
        setConnections(prev => ({
            ...prev,
            [platform]: {
                ...prev[platform],
                [field]: value
            }
        }));
    };

    const getPlatformIcon = (platform) => {
        switch (platform) {
            case 'instagram': return <Instagram />;
            case 'whatsapp': return <WhatsApp />;
            case 'facebook': return <Facebook />;
            case 'tiktok': return <MusicNote />;
            default: return null;
        }
    };

    const getPlatformColor = (platform) => {
        switch (platform) {
            case 'instagram': return '#E4405F';
            case 'whatsapp': return '#25D366';
            case 'facebook': return '#1877F2';
            case 'tiktok': return '#000000';
            default: return '#666';
        }
    };

    const getPlatformTitle = (platform) => {
        switch (platform) {
            case 'instagram': return 'Instagram';
            case 'whatsapp': return 'WhatsApp';
            case 'facebook': return 'Facebook';
            case 'tiktok': return 'TikTok';
            default: return platform;
        }
    };

    const getConnectionStatus = (platform) => {
        const isConnected = connections[platform].connected;
        return {
            icon: isConnected ? <CheckCircle color="success" /> : <Error color="error" />,
            text: isConnected ? 'Connected' : 'Not Connected',
            color: isConnected ? 'success' : 'error'
        };
    };

    const renderPlatformCard = (platform) => {
        const status = getConnectionStatus(platform);
        const isConnected = connections[platform].connected;

        return (
            <Card
                key={platform}
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    border: `2px solid ${isConnected ? getPlatformColor(platform) : '#e0e0e0'}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        boxShadow: 4,
                        transform: 'translateY(-2px)'
                    }
                }}
            >
                <CardContent sx={{ flexGrow: 1 }}>
                    <Box display="flex" alignItems="center" mb={2}>
                        <Avatar
                            sx={{
                                bgcolor: getPlatformColor(platform),
                                mr: 2,
                                width: 48,
                                height: 48
                            }}
                        >
                            {getPlatformIcon(platform)}
                        </Avatar>
                        <Box flexGrow={1}>
                            <Typography variant="h6" fontWeight={600}>
                                {getPlatformTitle(platform)}
                            </Typography>
                            <Box display="flex" alignItems="center" gap={1}>
                                {status.icon}
                                <Typography
                                    variant="body2"
                                    color={status.color}
                                    fontWeight={500}
                                >
                                    {status.text}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {platform === 'instagram' && (
                        <Box>
                            <TextField
                                fullWidth
                                label="Instagram Username"
                                value={connections.instagram.username}
                                onChange={(e) => handleInputChange('instagram', 'username', e.target.value)}
                                margin="normal"
                                size="small"
                            />
                            <TextField
                                fullWidth
                                label="Access Token"
                                type="password"
                                value={connections.instagram.token}
                                onChange={(e) => handleInputChange('instagram', 'token', e.target.value)}
                                margin="normal"
                                size="small"
                            />
                        </Box>
                    )}

                    {platform === 'whatsapp' && (
                        <Box>
                            <TextField
                                fullWidth
                                label="Phone Number"
                                value={connections.whatsapp.phone}
                                onChange={(e) => handleInputChange('whatsapp', 'phone', e.target.value)}
                                margin="normal"
                                size="small"
                                placeholder="+1234567890"
                            />
                            <TextField
                                fullWidth
                                label="API Key"
                                type="password"
                                value={connections.whatsapp.apiKey}
                                onChange={(e) => handleInputChange('whatsapp', 'apiKey', e.target.value)}
                                margin="normal"
                                size="small"
                            />
                        </Box>
                    )}

                    {platform === 'facebook' && (
                        <Box>
                            <TextField
                                fullWidth
                                label="Page ID"
                                value={connections.facebook.pageId}
                                onChange={(e) => handleInputChange('facebook', 'pageId', e.target.value)}
                                margin="normal"
                                size="small"
                            />
                            <TextField
                                fullWidth
                                label="Access Token"
                                type="password"
                                value={connections.facebook.accessToken}
                                onChange={(e) => handleInputChange('facebook', 'accessToken', e.target.value)}
                                margin="normal"
                                size="small"
                            />
                        </Box>
                    )}

                    {platform === 'tiktok' && (
                        <Box>
                            <TextField
                                fullWidth
                                label="TikTok Username"
                                value={connections.tiktok.username}
                                onChange={(e) => handleInputChange('tiktok', 'username', e.target.value)}
                                margin="normal"
                                size="small"
                            />
                            <TextField
                                fullWidth
                                label="API Key"
                                type="password"
                                value={connections.tiktok.apiKey}
                                onChange={(e) => handleInputChange('tiktok', 'apiKey', e.target.value)}
                                margin="normal"
                                size="small"
                            />
                        </Box>
                    )}
                </CardContent>

                <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                    <Button
                        variant={isConnected ? "outlined" : "contained"}
                        color={isConnected ? "error" : "primary"}
                        onClick={() => handleConnectionToggle(platform)}
                        startIcon={isConnected ? <Error /> : <CheckCircle />}
                        size="small"
                    >
                        {isConnected ? "Disconnect" : "Connect"}
                    </Button>

                    <Box>
                        <Tooltip title="Settings">
                            <IconButton size="small">
                                <Settings />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Refresh">
                            <IconButton size="small">
                                <Refresh />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </CardActions>
            </Card>
        );
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box mb={3}>
                <Typography variant="h4" fontWeight={700} mb={1}>
                    Channel Integrations
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Connect your messaging platforms to enable automated responses
                </Typography>
            </Box>

            <Alert severity="info" sx={{ mb: 3 }}>
                <Typography variant="body2">
                    Configure your chatbot to automatically respond to messages on Instagram, WhatsApp, Facebook, and TikTok.
                    Each platform requires specific API credentials and configuration.
                </Typography>
            </Alert>

            <Grid container spacing={3}>
                {['instagram', 'whatsapp', 'facebook', 'tiktok'].map((platform) => (
                    <Grid item xs={12} sm={6} md={3} key={platform}>
                        {renderPlatformCard(platform)}
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
} 