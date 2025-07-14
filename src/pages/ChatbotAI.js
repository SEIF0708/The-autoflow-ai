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
    Button
} from '@mui/material';
import {
    Upload,
    Add
} from '@mui/icons-material';

export default function ChatbotAI() {
    const [enableGPT, setEnableGPT] = useState(true);
    const [systemMessage, setSystemMessage] = useState('You are a helpful support agent for an online store.');
    const [creativity, setCreativity] = useState(0.7);
    const [useContext, setUseContext] = useState(true);

    return (
        <Box sx={{ p: 3 }}>
            <Box mb={3}>
                <Typography variant="h4" fontWeight={700} mb={1}>
                    AI Assistant Configuration
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Control GPT behavior and training for intelligent responses
                </Typography>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" fontWeight={600} mb={2}>
                                GPT Settings
                            </Typography>

                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={enableGPT}
                                        onChange={(e) => setEnableGPT(e.target.checked)}
                                        color="primary"
                                    />
                                }
                                label="Enable GPT Fallback"
                                sx={{ mb: 2 }}
                            />

                            <TextField
                                fullWidth
                                label="Default System Message"
                                multiline
                                rows={4}
                                value={systemMessage}
                                onChange={(e) => setSystemMessage(e.target.value)}
                                margin="normal"
                                helperText="Define the AI's role and behavior"
                            />

                            <Box mt={3}>
                                <Typography gutterBottom>
                                    Creativity Level: {Math.round(creativity * 100)}%
                                </Typography>
                                <Slider
                                    value={creativity}
                                    onChange={(e, newValue) => setCreativity(newValue)}
                                    step={0.1}
                                    marks
                                    min={0}
                                    max={1}
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
                                Context Settings
                            </Typography>

                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={useContext}
                                        onChange={(e) => setUseContext(e.target.checked)}
                                        color="primary"
                                    />
                                }
                                label="Use conversation + FAQs as context"
                                sx={{ mb: 2 }}
                            />

                            <Typography variant="body2" color="text.secondary" mb={2}>
                                When enabled, the AI will consider previous conversation history and FAQ knowledge when generating responses.
                            </Typography>

                            <Button
                                variant="outlined"
                                startIcon={<Upload />}
                                fullWidth
                                sx={{ mb: 2 }}
                            >
                                Upload Knowledge Base
                            </Button>

                            <Button
                                variant="outlined"
                                startIcon={<Add />}
                                fullWidth
                            >
                                Add Custom Training Data
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
} 