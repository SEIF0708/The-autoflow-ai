import React from 'react';
import {
    Typography,
    Box,
    Grid,
    Card,
    CardContent,
    Button,
    Avatar,
    Chip,
    Container
} from '@mui/material';
import {
    Settings,
    QuestionAnswer,
    SmartToy,
    Inbox,
    Tune,
    ArrowForward
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function Chatbot() {
    const navigate = useNavigate();

    const sections = [
        {
            title: 'Channels',
            description: 'Connect your messaging platforms',
            icon: <Settings />,
            path: '/chatbot/channels',
            color: '#00FFFF',
            status: '2 Connected'
        },
        {
            title: 'FAQ Manager',
            description: 'Create and manage question/answer pairs',
            icon: <QuestionAnswer />,
            path: '/chatbot/faq',
            color: '#00FF88',
            status: '12 FAQs Active'
        },
        {
            title: 'AI Assistant',
            description: 'Control GPT behavior and training',
            icon: <SmartToy />,
            path: '/chatbot/ai',
            color: '#1ecbe1',
            status: 'GPT Enabled'
        },
        {
            title: 'Chat Inbox',
            description: 'Manage incoming messages',
            icon: <Inbox />,
            path: '/chatbot/inbox',
            color: '#FFAA00',
            status: '3 Unread'
        },
        {
            title: 'Settings',
            description: 'Configure chatbot preferences',
            icon: <Tune />,
            path: '/chatbot/settings',
            color: '#FF0066',
            status: 'English'
        }
    ];

    return (
        <Container maxWidth="xl" sx={{ py: 4, px: { xs: 2, sm: 3, md: 4 } }}>
            <Box sx={{
                background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #121212 100%)',
                minHeight: '100vh',
                color: '#F0F0F0',
                borderRadius: 3,
                p: { xs: 3, sm: 4, md: 6 }
            }}>
                {/* Header Section */}
                <Box sx={{ mb: { xs: 4, md: 6 } }}>
                    <Typography
                        variant="h3"
                        fontWeight={800}
                        sx={{
                            color: '#00FFFF',
                            textShadow: '0 0 20px rgba(0, 255, 255, 0.6)',
                            letterSpacing: '-0.05em',
                            mb: 2,
                            fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' }
                        }}
                    >
                        Chatbot Management
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: '#B0B0B0',
                            fontSize: { xs: '0.875rem', sm: '1rem' },
                            lineHeight: 1.6,
                            maxWidth: '600px'
                        }}
                    >
                        Configure and manage your AI-powered chatbot across multiple platforms with advanced automation and intelligent responses.
                    </Typography>
                </Box>

                {/* Main Grid Section */}
                <Grid container spacing={3} sx={{ mb: { xs: 4, md: 6 } }}>
                    {sections.map((section, index) => (
                        <Grid item xs={12} sm={6} md={4} key={section.title}>
                            <Card
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer',
                                    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(10, 10, 10, 0.9) 100%)',
                                    border: `1px solid ${section.color}30`,
                                    backdropFilter: 'blur(10px)',
                                    borderRadius: 3,
                                    p: 3,
                                    '&:hover': {
                                        boxShadow: `0 0 30px ${section.color}40, 0 10px 15px -3px rgba(0, 0, 0, 0.4)`,
                                        transform: 'translateY(-4px) scale(1.02)',
                                        borderColor: `${section.color}60`,
                                    }
                                }}
                                onClick={() => navigate(section.path)}
                            >
                                <CardContent sx={{
                                    flexGrow: 1,
                                    p: 0,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%'
                                }}>
                                    {/* Header with Icon and Title */}
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        mb: 3,
                                        flexDirection: { xs: 'column', sm: 'row' },
                                        textAlign: { xs: 'center', sm: 'left' }
                                    }}>
                                        <Avatar
                                            sx={{
                                                bgcolor: section.color,
                                                mr: { xs: 0, sm: 2 },
                                                mb: { xs: 2, sm: 0 },
                                                width: { xs: 56, sm: 48 },
                                                height: { xs: 56, sm: 48 },
                                                boxShadow: `0 0 15px ${section.color}50`,
                                                '&:hover': {
                                                    boxShadow: `0 0 20px ${section.color}70`,
                                                }
                                            }}
                                        >
                                            {section.icon}
                                        </Avatar>
                                        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                                            <Typography
                                                variant="h5"
                                                fontWeight={600}
                                                sx={{
                                                    color: '#F0F0F0',
                                                    textShadow: `0 0 5px ${section.color}30`,
                                                    mb: 1,
                                                    fontSize: { xs: '1.125rem', sm: '1.25rem' }
                                                }}
                                            >
                                                {section.title}
                                            </Typography>
                                            <Chip
                                                label={section.status}
                                                size="small"
                                                sx={{
                                                    background: `rgba(${section.color}20)`,
                                                    border: `1px solid ${section.color}40`,
                                                    color: section.color,
                                                    fontWeight: 500,
                                                    fontSize: '0.75rem',
                                                    '&:hover': {
                                                        background: `rgba(${section.color}30)`,
                                                        boxShadow: `0 0 10px ${section.color}30`,
                                                    }
                                                }}
                                            />
                                        </Box>
                                    </Box>

                                    {/* Description */}
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: '#B0B0B0',
                                            mb: 4,
                                            lineHeight: 1.6,
                                            flexGrow: 1,
                                            fontSize: { xs: '0.875rem', sm: '0.875rem' }
                                        }}
                                    >
                                        {section.description}
                                    </Typography>

                                    {/* Action Button */}
                                    <Button
                                        variant="outlined"
                                        endIcon={<ArrowForward />}
                                        fullWidth
                                        sx={{
                                            mt: 'auto',
                                            borderColor: section.color,
                                            color: section.color,
                                            borderRadius: 2,
                                            py: 1.5,
                                            fontSize: '0.875rem',
                                            fontWeight: 500,
                                            '&:hover': {
                                                borderColor: section.color,
                                                backgroundColor: `${section.color}10`,
                                                boxShadow: `0 0 15px ${section.color}30`,
                                                transform: 'translateY(-1px)',
                                            }
                                        }}
                                    >
                                        Manage {section.title}
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Quick Stats Section */}
                <Box>
                    <Typography
                        variant="h4"
                        fontWeight={700}
                        sx={{
                            color: '#00FFFF',
                            textShadow: '0 0 15px rgba(0, 255, 255, 0.4)',
                            mb: 4,
                            fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }
                        }}
                    >
                        Quick Stats
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card sx={{
                                background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(10, 10, 10, 0.9) 100%)',
                                border: '1px solid rgba(0, 255, 255, 0.3)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: 3,
                                p: 3,
                                '&:hover': {
                                    boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
                                    transform: 'translateY(-2px)',
                                }
                            }}>
                                <CardContent sx={{ p: 0, textAlign: 'center' }}>
                                    <Typography variant="h3" fontWeight={800} sx={{ color: '#00FFFF', mb: 1 }}>
                                        2
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#B0B0B0', fontSize: '0.875rem' }}>
                                        Connected Platforms
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card sx={{
                                background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(10, 10, 10, 0.9) 100%)',
                                border: '1px solid rgba(0, 255, 136, 0.3)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: 3,
                                p: 3,
                                '&:hover': {
                                    boxShadow: '0 0 20px rgba(0, 255, 136, 0.3)',
                                    transform: 'translateY(-2px)',
                                }
                            }}>
                                <CardContent sx={{ p: 0, textAlign: 'center' }}>
                                    <Typography variant="h3" fontWeight={800} sx={{ color: '#00FF88', mb: 1 }}>
                                        12
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#B0B0B0', fontSize: '0.875rem' }}>
                                        Active FAQs
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card sx={{
                                background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(10, 10, 10, 0.9) 100%)',
                                border: '1px solid rgba(255, 170, 0, 0.3)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: 3,
                                p: 3,
                                '&:hover': {
                                    boxShadow: '0 0 20px rgba(255, 170, 0, 0.3)',
                                    transform: 'translateY(-2px)',
                                }
                            }}>
                                <CardContent sx={{ p: 0, textAlign: 'center' }}>
                                    <Typography variant="h3" fontWeight={800} sx={{ color: '#FFAA00', mb: 1 }}>
                                        3
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#B0B0B0', fontSize: '0.875rem' }}>
                                        Unread Messages
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card sx={{
                                background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(10, 10, 10, 0.9) 100%)',
                                border: '1px solid rgba(30, 203, 225, 0.3)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: 3,
                                p: 3,
                                '&:hover': {
                                    boxShadow: '0 0 20px rgba(30, 203, 225, 0.3)',
                                    transform: 'translateY(-2px)',
                                }
                            }}>
                                <CardContent sx={{ p: 0, textAlign: 'center' }}>
                                    <Typography variant="h3" fontWeight={800} sx={{ color: '#1ecbe1', mb: 1 }}>
                                        98%
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#B0B0B0', fontSize: '0.875rem' }}>
                                        Response Rate
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