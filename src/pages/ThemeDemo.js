import React from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Divider,
    Paper,
    Chip
} from '@mui/material';
import {
    AnimatedThemeToggle,
    CompactThemeToggle,
    SystemAwareThemeToggle
} from '../components/ThemeToggle';
import { useThemeMode } from '../context/ThemeContext';

export default function ThemeDemo() {
    const { mode, isSystemTheme, isInitialized } = useThemeMode();

    if (!isInitialized) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Typography variant="h4">Loading theme...</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{
                background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #121212 100%)',
                minHeight: '100vh',
                color: '#F0F0F0',
                borderRadius: 3,
                p: { xs: 3, sm: 4, md: 6 }
            }}>
                {/* Header */}
                <Box sx={{ mb: 6, textAlign: 'center' }}>
                    <Typography
                        variant="h2"
                        fontWeight={800}
                        sx={{
                            color: '#00FFFF',
                            textShadow: '0 0 20px rgba(0, 255, 255, 0.6)',
                            letterSpacing: '-0.05em',
                            mb: 2,
                            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
                        }}
                    >
                        Theme Switcher Demo
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: '#B0B0B0',
                            fontSize: { xs: '1rem', sm: '1.125rem' },
                            maxWidth: '600px',
                            mx: 'auto'
                        }}
                    >
                        Experience the advanced light/dark theme switcher with system preference detection,
                        localStorage persistence, and smooth animations.
                    </Typography>
                </Box>

                {/* Current Theme Status */}
                <Paper sx={{
                    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(10, 10, 10, 0.9) 100%)',
                    border: '1px solid rgba(0, 255, 255, 0.3)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 3,
                    p: 4,
                    mb: 4,
                    textAlign: 'center'
                }}>
                    <Typography variant="h5" fontWeight={600} sx={{ color: '#00FFFF', mb: 2 }}>
                        Current Theme Status
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                        <Chip
                            label={`Mode: ${mode}`}
                            color="primary"
                            variant="outlined"
                            sx={{
                                background: 'rgba(0, 255, 255, 0.1)',
                                border: '1px solid rgba(0, 255, 255, 0.3)',
                                color: '#00FFFF'
                            }}
                        />
                        <Chip
                            label={`System Theme: ${isSystemTheme ? 'Yes' : 'No'}`}
                            color="secondary"
                            variant="outlined"
                            sx={{
                                background: 'rgba(30, 203, 225, 0.1)',
                                border: '1px solid rgba(30, 203, 225, 0.3)',
                                color: '#1ecbe1'
                            }}
                        />
                        <Chip
                            label={`Initialized: ${isInitialized ? 'Yes' : 'No'}`}
                            color="success"
                            variant="outlined"
                            sx={{
                                background: 'rgba(0, 255, 136, 0.1)',
                                border: '1px solid rgba(0, 255, 136, 0.3)',
                                color: '#00FF88'
                            }}
                        />
                    </Box>
                </Paper>

                {/* Theme Toggle Variants */}
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Card sx={{
                            background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(10, 10, 10, 0.9) 100%)',
                            border: '1px solid rgba(0, 255, 255, 0.3)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: 3,
                            height: '100%',
                            '&:hover': {
                                boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
                                transform: 'translateY(-2px)',
                            }
                        }}>
                            <CardContent sx={{ p: 4 }}>
                                <Typography variant="h6" fontWeight={600} sx={{ color: '#00FFFF', mb: 3 }}>
                                    Icon Toggle Variants
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Typography variant="body2" sx={{ color: '#B0B0B0', minWidth: '80px' }}>
                                            Small:
                                        </Typography>
                                        <AnimatedThemeToggle variant="icon" size="small" />
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Typography variant="body2" sx={{ color: '#B0B0B0', minWidth: '80px' }}>
                                            Medium:
                                        </Typography>
                                        <AnimatedThemeToggle variant="icon" size="medium" />
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Typography variant="body2" sx={{ color: '#B0B0B0', minWidth: '80px' }}>
                                            Large:
                                        </Typography>
                                        <AnimatedThemeToggle variant="icon" size="large" />
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Card sx={{
                            background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(10, 10, 10, 0.9) 100%)',
                            border: '1px solid rgba(0, 255, 255, 0.3)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: 3,
                            height: '100%',
                            '&:hover': {
                                boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
                                transform: 'translateY(-2px)',
                            }
                        }}>
                            <CardContent sx={{ p: 4 }}>
                                <Typography variant="h6" fontWeight={600} sx={{ color: '#00FFFF', mb: 3 }}>
                                    Button & Switch Variants
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Typography variant="body2" sx={{ color: '#B0B0B0', minWidth: '80px' }}>
                                            Button:
                                        </Typography>
                                        <AnimatedThemeToggle variant="button" />
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Typography variant="body2" sx={{ color: '#B0B0B0', minWidth: '80px' }}>
                                            Switch:
                                        </Typography>
                                        <AnimatedThemeToggle variant="switch" />
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Typography variant="body2" sx={{ color: '#B0B0B0', minWidth: '80px' }}>
                                            Compact:
                                        </Typography>
                                        <CompactThemeToggle />
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12}>
                        <Card sx={{
                            background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(10, 10, 10, 0.9) 100%)',
                            border: '1px solid rgba(0, 255, 255, 0.3)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: 3,
                            '&:hover': {
                                boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
                                transform: 'translateY(-2px)',
                            }
                        }}>
                            <CardContent sx={{ p: 4 }}>
                                <Typography variant="h6" fontWeight={600} sx={{ color: '#00FFFF', mb: 3 }}>
                                    System-Aware Theme Toggle
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                                    <SystemAwareThemeToggle />
                                    <Typography variant="body2" sx={{ color: '#B0B0B0', ml: 2 }}>
                                        Shows system preference indicator
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Features List */}
                <Box sx={{ mt: 6 }}>
                    <Typography variant="h5" fontWeight={600} sx={{ color: '#00FFFF', mb: 3 }}>
                        Features
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card sx={{
                                background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(10, 10, 10, 0.9) 100%)',
                                border: '1px solid rgba(0, 255, 255, 0.3)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: 3,
                                height: '100%',
                                '&:hover': {
                                    boxShadow: '0 0 15px rgba(0, 255, 255, 0.3)',
                                }
                            }}>
                                <CardContent>
                                    <Typography variant="h6" fontWeight={600} sx={{ color: '#00FFFF', mb: 1 }}>
                                        System Preference
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                                        Automatically detects and follows the user's system theme preference using `prefers-color-scheme`.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card sx={{
                                background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(10, 10, 10, 0.9) 100%)',
                                border: '1px solid rgba(0, 255, 255, 0.3)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: 3,
                                height: '100%',
                                '&:hover': {
                                    boxShadow: '0 0 15px rgba(0, 255, 255, 0.3)',
                                }
                            }}>
                                <CardContent>
                                    <Typography variant="h6" fontWeight={600} sx={{ color: '#00FFFF', mb: 1 }}>
                                        Persistent Storage
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                                        Saves user preference in localStorage for consistent experience across sessions.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card sx={{
                                background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(10, 10, 10, 0.9) 100%)',
                                border: '1px solid rgba(0, 255, 255, 0.3)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: 3,
                                height: '100%',
                                '&:hover': {
                                    boxShadow: '0 0 15px rgba(0, 255, 255, 0.3)',
                                }
                            }}>
                                <CardContent>
                                    <Typography variant="h6" fontWeight={600} sx={{ color: '#00FFFF', mb: 1 }}>
                                        Smooth Animations
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                                        Framer Motion powered animations with spring physics for natural feel.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card sx={{
                                background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(10, 10, 10, 0.9) 100%)',
                                border: '1px solid rgba(0, 255, 255, 0.3)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: 3,
                                height: '100%',
                                '&:hover': {
                                    boxShadow: '0 0 15px rgba(0, 255, 255, 0.3)',
                                }
                            }}>
                                <CardContent>
                                    <Typography variant="h6" fontWeight={600} sx={{ color: '#00FFFF', mb: 1 }}>
                                        Multiple Variants
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                                        Icon, button, switch, and compact variants for different use cases.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card sx={{
                                background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(10, 10, 10, 0.9) 100%)',
                                border: '1px solid rgba(0, 255, 255, 0.3)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: 3,
                                height: '100%',
                                '&:hover': {
                                    boxShadow: '0 0 15px rgba(0, 255, 255, 0.3)',
                                }
                            }}>
                                <CardContent>
                                    <Typography variant="h6" fontWeight={600} sx={{ color: '#00FFFF', mb: 1 }}>
                                        Responsive Design
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                                        Adapts to different screen sizes with mobile-optimized components.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card sx={{
                                background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(10, 10, 10, 0.9) 100%)',
                                border: '1px solid rgba(0, 255, 255, 0.3)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: 3,
                                height: '100%',
                                '&:hover': {
                                    boxShadow: '0 0 15px rgba(0, 255, 255, 0.3)',
                                }
                            }}>
                                <CardContent>
                                    <Typography variant="h6" fontWeight={600} sx={{ color: '#00FFFF', mb: 1 }}>
                                        Production Ready
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                                        Modular architecture with proper error handling and TypeScript support.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
} 