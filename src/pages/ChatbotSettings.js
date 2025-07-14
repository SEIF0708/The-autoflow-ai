import React, { useState } from 'react';
import {
    Typography,
    Box,
    Grid,
    Card,
    CardContent,
    TextField,
    Switch,
    FormControlLabel,
    Slider,
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from '@mui/material';

export default function ChatbotSettings() {
    const [language, setLanguage] = useState('en');
    const [welcomeMessage, setWelcomeMessage] = useState(true);
    const [offlineMessage, setOfflineMessage] = useState('We are currently offline. Please leave a message and we\'ll get back to you soon.');
    const [messageDelay, setMessageDelay] = useState(1000);

    return (
        <Box sx={{ p: 3 }}>
            <Box mb={3}>
                <Typography variant="h4" fontWeight={700} mb={1}>
                    Chatbot Settings
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Configure global chatbot behavior and preferences
                </Typography>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" fontWeight={600} mb={2}>
                                General Settings
                            </Typography>

                            <FormControl fullWidth margin="normal">
                                <InputLabel>Language</InputLabel>
                                <Select
                                    value={language}
                                    label="Language"
                                    onChange={(e) => setLanguage(e.target.value)}
                                >
                                    <MenuItem value="en">English</MenuItem>
                                    <MenuItem value="es">Spanish</MenuItem>
                                    <MenuItem value="fr">French</MenuItem>
                                    <MenuItem value="de">German</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={welcomeMessage}
                                        onChange={(e) => setWelcomeMessage(e.target.checked)}
                                        color="primary"
                                    />
                                }
                                label="Enable Welcome Message"
                                sx={{ mt: 2 }}
                            />

                            <TextField
                                fullWidth
                                label="Offline Fallback Message"
                                multiline
                                rows={3}
                                value={offlineMessage}
                                onChange={(e) => setOfflineMessage(e.target.value)}
                                margin="normal"
                            />

                            <Box mt={3}>
                                <Typography gutterBottom>
                                    Message Delay: {messageDelay}ms
                                </Typography>
                                <Slider
                                    value={messageDelay}
                                    onChange={(e, newValue) => setMessageDelay(newValue)}
                                    step={100}
                                    marks
                                    min={0}
                                    max={3000}
                                    valueLabelDisplay="auto"
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" fontWeight={600} mb={2}>
                                Channel-Specific Settings
                            </Typography>

                            <Box mb={2}>
                                <Typography variant="subtitle1" fontWeight={600} mb={1}>
                                    Instagram
                                </Typography>
                                <FormControlLabel
                                    control={<Switch color="primary" />}
                                    label="Auto-reply to stories"
                                />
                            </Box>

                            <Box mb={2}>
                                <Typography variant="subtitle1" fontWeight={600} mb={1}>
                                    WhatsApp
                                </Typography>
                                <FormControlLabel
                                    control={<Switch color="primary" defaultChecked />}
                                    label="Business hours only"
                                />
                            </Box>

                            <Box mb={2}>
                                <Typography variant="subtitle1" fontWeight={600} mb={1}>
                                    Facebook
                                </Typography>
                                <FormControlLabel
                                    control={<Switch color="primary" />}
                                    label="Page messenger"
                                />
                            </Box>

                            <Box>
                                <Typography variant="subtitle1" fontWeight={600} mb={1}>
                                    TikTok
                                </Typography>
                                <FormControlLabel
                                    control={<Switch color="primary" />}
                                    label="Comment replies"
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
} 