import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Box,
    Avatar,
    Menu,
    MenuItem,
    useMediaQuery,
    useTheme,
    Badge
} from '@mui/material';
import {
    Menu as MenuIcon,
    Notifications,
    AccountCircle,
    Settings,
    Logout,
    Search,
    DarkMode,
    LightMode,
    ChevronLeft
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useThemeMode } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';

export default function TopBar({ sidebarOpen, setSidebarOpen }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const { mode } = useThemeMode();
    const isDarkMode = mode === 'dark';
    const [anchorEl, setAnchorEl] = useState(null);

    // Theme-aware colors
    const getThemeColors = () => {
        if (isDarkMode) {
            return {
                background: 'linear-gradient(135deg, #1F2937 0%, #111827 100%)',
                text: '#F9FAFB',
                textSecondary: '#D1D5DB',
                border: 'rgba(59, 130, 246, 0.2)',
                shadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                hoverBg: 'rgba(59, 130, 246, 0.1)',
                iconColor: '#F9FAFB',
                iconHoverColor: '#3B82F6'
            };
        } else {
            return {
                background: 'linear-gradient(135deg, #FFFFFF 0%, #F9FAFB 100%)',
                text: '#111827',
                textSecondary: '#6B7280',
                border: 'rgba(59, 130, 246, 0.1)',
                shadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                hoverBg: 'rgba(59, 130, 246, 0.05)',
                iconColor: '#111827',
                iconHoverColor: '#3B82F6'
            };
        }
    };

    const colors = getThemeColors();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSidebarToggle = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${sidebarOpen ? 280 : 80}px)` },
                    background: colors.background,
                    backdropFilter: 'blur(20px)',
                    borderBottom: `1px solid ${colors.border}`,
                    boxShadow: colors.shadow,
                    zIndex: 1100,
                    transition: 'all 0.3s ease-in-out',
                    top: 0,
                    left: { sm: `${sidebarOpen ? 280 : 80}px` },
                    borderRadius: 0, // Make it rectangular
                    height: { xs: '64px', sm: '72px' }, // Match sidebar header height
                }}
                elevation={0}
            >
                <Toolbar sx={{
                    px: { xs: 2, sm: 3 },
                    py: 0,
                    minHeight: { xs: '64px', sm: '72px' },
                    height: { xs: '64px', sm: '72px' },
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxSizing: 'border-box',
                }}>
                    {/* Left Side - Sidebar Toggle */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            color="inherit"
                            aria-label="toggle sidebar"
                            edge="start"
                            onClick={handleSidebarToggle}
                            sx={{
                                mr: 2,
                                color: colors.iconColor,
                                '&:hover': {
                                    color: colors.iconHoverColor,
                                    backgroundColor: colors.hoverBg,
                                },
                                transition: 'all 0.3s ease-in-out',
                                transform: sidebarOpen ? 'rotate(0deg)' : 'rotate(180deg)',
                            }}
                        >
                            <ChevronLeft />
                        </IconButton>
                    </Box>

                    {/* Right Side Icons */}
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                    }}>
                        {/* Theme Toggle */}
                        <ThemeToggle />

                        {/* Notifications */}
                        <IconButton
                            sx={{
                                color: colors.iconColor,
                                '&:hover': {
                                    color: colors.iconHoverColor,
                                    backgroundColor: colors.hoverBg,
                                },
                                transition: 'all 0.3s ease-in-out',
                            }}
                        >
                            <Badge badgeContent={3} color="error">
                                <Notifications />
                            </Badge>
                        </IconButton>

                        {/* User Menu */}
                        <IconButton
                            onClick={handleMenu}
                            sx={{
                                color: colors.iconColor,
                                '&:hover': {
                                    color: colors.iconHoverColor,
                                    backgroundColor: colors.hoverBg,
                                },
                                transition: 'all 0.3s ease-in-out',
                            }}
                        >
                            <Avatar
                                sx={{
                                    width: 32,
                                    height: 32,
                                    bgcolor: colors.iconHoverColor,
                                    fontSize: '0.875rem',
                                    fontWeight: 600,
                                }}
                            >
                                JD
                            </Avatar>
                        </IconButton>

                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            PaperProps={{
                                sx: {
                                    backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
                                    border: `1px solid ${colors.border}`,
                                    borderRadius: 2,
                                    boxShadow: colors.shadow,
                                    mt: 1,
                                    minWidth: 200,
                                }
                            }}
                        >
                            <MenuItem onClick={handleClose} sx={{
                                color: colors.text,
                                '&:hover': {
                                    backgroundColor: colors.hoverBg,
                                },
                                transition: 'all 0.3s ease-in-out',
                            }}>
                                <AccountCircle sx={{ mr: 2 }} />
                                Profile
                            </MenuItem>
                            <MenuItem onClick={handleClose} sx={{
                                color: colors.text,
                                '&:hover': {
                                    backgroundColor: colors.hoverBg,
                                },
                                transition: 'all 0.3s ease-in-out',
                            }}>
                                <Settings sx={{ mr: 2 }} />
                                Settings
                            </MenuItem>
                            <MenuItem onClick={handleClose} sx={{
                                color: colors.text,
                                '&:hover': {
                                    backgroundColor: colors.hoverBg,
                                },
                                transition: 'all 0.3s ease-in-out',
                            }}>
                                <Logout sx={{ mr: 2 }} />
                                Logout
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
        </motion.div>
    );
} 