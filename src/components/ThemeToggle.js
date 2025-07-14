import React, { useState } from 'react';
import {
    IconButton,
    Tooltip,
    Box,
    Typography,
    Switch,
    FormControlLabel,
    useMediaQuery,
    useTheme as useMuiTheme
} from '@mui/material';
import {
    Brightness4,
    Brightness7,
    DarkMode,
    LightMode,
    WbSunny,
    Nightlight
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeMode } from '../context/ThemeContext';

// Animated Theme Toggle Component
export function AnimatedThemeToggle({ variant = 'icon', size = 'medium' }) {
    const { mode, toggleTheme, isSystemTheme } = useThemeMode();
    const muiTheme = useMuiTheme();
    const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
    const [isHovered, setIsHovered] = useState(false);

    const getIconSize = () => {
        switch (size) {
            case 'small': return 20;
            case 'large': return 28;
            default: return 24;
        }
    };

    const getButtonSize = () => {
        switch (size) {
            case 'small': return 40;
            case 'large': return 56;
            default: return 48;
        }
    };

    const iconSize = getIconSize();
    const buttonSize = getButtonSize();

    if (variant === 'switch') {
        return (
            <FormControlLabel
                control={
                    <Switch
                        checked={mode === 'dark'}
                        onChange={toggleTheme}
                        sx={{
                            '& .MuiSwitch-switchBase': {
                                color: mode === 'dark' ? '#00FFFF' : '#B0B0B0',
                                '&.Mui-checked': {
                                    color: '#00FFFF',
                                    '& + .MuiSwitch-track': {
                                        backgroundColor: 'rgba(0, 255, 255, 0.3)',
                                    },
                                },
                            },
                            '& .MuiSwitch-track': {
                                backgroundColor: mode === 'dark' ? 'rgba(0, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                            },
                            '& .MuiSwitch-thumb': {
                                boxShadow: mode === 'dark' ? '0 0 10px rgba(0, 255, 255, 0.5)' : 'none',
                            },
                        }}
                    />
                }
                label={
                    <Typography variant="body2" sx={{ color: 'text.secondary', ml: 1 }}>
                        {mode === 'dark' ? 'Dark' : 'Light'} Mode
                    </Typography>
                }
            />
        );
    }

    if (variant === 'button') {
        return (
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Box
                    component="button"
                    onClick={toggleTheme}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        px: 2,
                        py: 1,
                        borderRadius: 3,
                        border: `1px solid ${mode === 'dark' ? 'rgba(0, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.1)'}`,
                        background: mode === 'dark'
                            ? 'linear-gradient(135deg, rgba(0, 255, 255, 0.1) 0%, rgba(30, 203, 225, 0.05) 100%)'
                            : 'linear-gradient(135deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.02) 100%)',
                        color: mode === 'dark' ? '#00FFFF' : '#111827',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                            background: mode === 'dark'
                                ? 'linear-gradient(135deg, rgba(0, 255, 255, 0.2) 0%, rgba(30, 203, 225, 0.1) 100%)'
                                : 'linear-gradient(135deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.05) 100%)',
                            boxShadow: mode === 'dark'
                                ? '0 0 15px rgba(0, 255, 255, 0.3)'
                                : '0 0 10px rgba(0, 0, 0, 0.1)',
                        },
                    }}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={mode}
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                            {mode === 'dark' ? <WbSunny /> : <Nightlight />}
                        </motion.div>
                    </AnimatePresence>
                    <Typography variant="body2" fontWeight={500}>
                        {mode === 'dark' ? 'Light' : 'Dark'}
                    </Typography>
                    {isSystemTheme && (
                        <Typography variant="caption" sx={{ opacity: 0.7 }}>
                            (System)
                        </Typography>
                    )}
                </Box>
            </motion.div>
        );
    }

    // Default icon variant
    return (
        <Tooltip
            title={`Switch to ${mode === 'dark' ? 'Light' : 'Dark'} Mode${isSystemTheme ? ' (System)' : ''}`}
            placement="bottom"
        >
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <IconButton
                    onClick={toggleTheme}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    sx={{
                        width: buttonSize,
                        height: buttonSize,
                        borderRadius: 3,
                        transition: 'all 0.3s ease-in-out',
                        background: isHovered
                            ? (mode === 'dark' ? 'rgba(0, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.05)')
                            : 'transparent',
                        '&:hover': {
                            background: mode === 'dark'
                                ? 'rgba(0, 255, 255, 0.2)'
                                : 'rgba(0, 0, 0, 0.1)',
                            boxShadow: mode === 'dark'
                                ? '0 0 20px rgba(0, 255, 255, 0.4)'
                                : '0 0 15px rgba(0, 0, 0, 0.2)',
                        },
                    }}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={mode}
                            initial={{ rotate: -180, scale: 0 }}
                            animate={{ rotate: 0, scale: 1 }}
                            exit={{ rotate: 180, scale: 0 }}
                            transition={{
                                duration: 0.4,
                                ease: [0.4, 0, 0.2, 1],
                                type: 'spring',
                                stiffness: 200,
                                damping: 20
                            }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            {mode === 'dark' ? (
                                <Brightness7
                                    sx={{
                                        fontSize: iconSize,
                                        color: '#00FFFF',
                                        filter: isHovered ? 'drop-shadow(0 0 8px rgba(0, 255, 255, 0.6))' : 'none',
                                    }}
                                />
                            ) : (
                                <Brightness4
                                    sx={{
                                        fontSize: iconSize,
                                        color: '#111827',
                                        filter: isHovered ? 'drop-shadow(0 0 8px rgba(0, 0, 0, 0.3))' : 'none',
                                    }}
                                />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </IconButton>
            </motion.div>
        </Tooltip>
    );
}

// Compact Theme Toggle for mobile
export function CompactThemeToggle() {
    const { mode, toggleTheme } = useThemeMode();

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <IconButton
                onClick={toggleTheme}
                sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                        backgroundColor: mode === 'dark'
                            ? 'rgba(0, 255, 255, 0.1)'
                            : 'rgba(0, 0, 0, 0.05)',
                        boxShadow: mode === 'dark'
                            ? '0 0 15px rgba(0, 255, 255, 0.3)'
                            : '0 0 10px rgba(0, 0, 0, 0.1)',
                    },
                }}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={mode}
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {mode === 'dark' ? (
                            <Brightness7 sx={{ fontSize: 20, color: '#00FFFF' }} />
                        ) : (
                            <Brightness4 sx={{ fontSize: 20, color: '#111827' }} />
                        )}
                    </motion.div>
                </AnimatePresence>
            </IconButton>
        </motion.div>
    );
}

// Theme Toggle with System Indicator
export function SystemAwareThemeToggle() {
    const { mode, toggleTheme, isSystemTheme } = useThemeMode();

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AnimatedThemeToggle variant="icon" size="medium" />
            {isSystemTheme && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <Typography
                        variant="caption"
                        sx={{
                            color: 'text.secondary',
                            fontSize: '0.75rem',
                            opacity: 0.7,
                        }}
                    >
                        System
                    </Typography>
                </motion.div>
            )}
        </Box>
    );
}

export default AnimatedThemeToggle; 