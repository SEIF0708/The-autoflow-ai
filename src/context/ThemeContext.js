import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const ThemeModeContext = createContext();

// Theme utilities
const getSystemTheme = () => {
    if (typeof window !== 'undefined') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark'; // Default fallback
};

const getStoredTheme = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('theme-preference');
    }
    return null;
};

const setStoredTheme = (theme) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('theme-preference', theme);
    }
};

const applyThemeToDOM = (theme) => {
    if (typeof window !== 'undefined') {
        const html = document.documentElement;
        if (theme === 'dark') {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }
    }
};

export function ThemeModeProvider({ children }) {
    const [mode, setMode] = useState('dark');
    const [isInitialized, setIsInitialized] = useState(false);

    // Initialize theme on mount
    useEffect(() => {
        const storedTheme = getStoredTheme();
        const systemTheme = getSystemTheme();
        const initialTheme = storedTheme || systemTheme;

        setMode(initialTheme);
        applyThemeToDOM(initialTheme);
        setIsInitialized(true);
    }, []);

    // Listen for system theme changes
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e) => {
            const storedTheme = getStoredTheme();
            // Only update if user hasn't manually set a preference
            if (!storedTheme) {
                const newTheme = e.matches ? 'dark' : 'light';
                setMode(newTheme);
                applyThemeToDOM(newTheme);
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const toggleTheme = () => {
        const newMode = mode === 'light' ? 'dark' : 'light';
        setMode(newMode);
        setStoredTheme(newMode);
        applyThemeToDOM(newMode);
    };

    const setTheme = (newMode) => {
        setMode(newMode);
        setStoredTheme(newMode);
        applyThemeToDOM(newMode);
    };

    const theme = useMemo(() =>
        createTheme({
            palette: {
                mode,
                primary: {
                    main: '#00FFFF', // Neon Cyan
                    light: '#4DFFFF', // Bright Cyan
                    dark: '#00BFFF', // Deep Cyan
                },
                secondary: {
                    main: '#1ecbe1', // Neon Blue
                    light: '#4DE8FF', // Bright Blue
                    dark: '#0099CC', // Dark Blue
                },
                success: {
                    main: '#00FF88', // Neon Green
                    light: '#4DFFAA', // Bright Green
                    dark: '#00CC66', // Dark Green
                },
                warning: {
                    main: '#FFAA00', // Neon Orange
                    light: '#FFCC4D', // Bright Orange
                    dark: '#CC8800', // Dark Orange
                },
                error: {
                    main: '#FF0066', // Neon Pink
                    light: '#FF4D94', // Bright Pink
                    dark: '#CC0052', // Dark Pink
                },
                background: {
                    default: mode === 'dark' ? '#000000' : '#F9FAFB',
                    paper: mode === 'dark' ? '#0A0A0A' : '#FFFFFF',
                },
                text: {
                    primary: mode === 'dark' ? '#F0F0F0' : '#111827',
                    secondary: mode === 'dark' ? '#B0B0B0' : '#6B7280',
                },
                divider: mode === 'dark' ? '#1A1A1A' : '#E5E7EB',
            },
            typography: {
                fontFamily: '"Inter", "Space Grotesk", "IBM Plex Sans", "Roboto", "Helvetica", "Arial", sans-serif',
                h1: {
                    fontFamily: '"Space Grotesk", "Inter", sans-serif',
                    fontWeight: 800,
                    fontSize: '2.5rem',
                    lineHeight: 1.2,
                    letterSpacing: '-0.05em',
                    color: mode === 'dark' ? '#F0F0F0' : '#111827',
                },
                h2: {
                    fontFamily: '"Space Grotesk", "Inter", sans-serif',
                    fontWeight: 700,
                    fontSize: '2rem',
                    lineHeight: 1.3,
                    letterSpacing: '-0.025em',
                    color: mode === 'dark' ? '#F0F0F0' : '#111827',
                },
                h3: {
                    fontFamily: '"Space Grotesk", "Inter", sans-serif',
                    fontWeight: 600,
                    fontSize: '1.5rem',
                    lineHeight: 1.4,
                    letterSpacing: '-0.025em',
                    color: mode === 'dark' ? '#F0F0F0' : '#111827',
                },
                h4: {
                    fontFamily: '"Space Grotesk", "Inter", sans-serif',
                    fontWeight: 600,
                    fontSize: '1.25rem',
                    lineHeight: 1.4,
                    letterSpacing: '-0.025em',
                    color: mode === 'dark' ? '#F0F0F0' : '#111827',
                },
                h5: {
                    fontFamily: '"Space Grotesk", "Inter", sans-serif',
                    fontWeight: 600,
                    fontSize: '1.125rem',
                    lineHeight: 1.4,
                    letterSpacing: '-0.025em',
                    color: mode === 'dark' ? '#F0F0F0' : '#111827',
                },
                h6: {
                    fontFamily: '"Space Grotesk", "Inter", sans-serif',
                    fontWeight: 600,
                    fontSize: '1rem',
                    lineHeight: 1.4,
                    letterSpacing: '-0.025em',
                    color: mode === 'dark' ? '#F0F0F0' : '#111827',
                },
                body1: {
                    fontFamily: '"Inter", "IBM Plex Sans", sans-serif',
                    fontWeight: 400,
                    fontSize: '1rem',
                    lineHeight: 1.6,
                    letterSpacing: '0.025em',
                    color: mode === 'dark' ? '#F0F0F0' : '#111827',
                },
                body2: {
                    fontFamily: '"Inter", "IBM Plex Sans", sans-serif',
                    fontWeight: 400,
                    fontSize: '0.875rem',
                    lineHeight: 1.6,
                    letterSpacing: '0.025em',
                    color: mode === 'dark' ? '#B0B0B0' : '#6B7280',
                },
                caption: {
                    fontFamily: '"Inter", "IBM Plex Sans", sans-serif',
                    fontWeight: 400,
                    fontSize: '0.75rem',
                    lineHeight: 1.4,
                    letterSpacing: '0.025em',
                    color: mode === 'dark' ? '#B0B0B0' : '#6B7280',
                },
                button: {
                    fontFamily: '"Inter", "IBM Plex Sans", sans-serif',
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    lineHeight: 1.5,
                    letterSpacing: '0.025em',
                    textTransform: 'none',
                },
            },
            shape: {
                borderRadius: 16,
            },
            components: {
                MuiCard: {
                    styleOverrides: {
                        root: {
                            background: mode === 'dark'
                                ? 'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(10, 10, 10, 0.9) 100%)'
                                : '#FFFFFF',
                            boxShadow: mode === 'dark'
                                ? '0 0 20px rgba(0, 255, 255, 0.2), 0 4px 6px -1px rgba(0, 0, 0, 0.3)'
                                : '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                            border: mode === 'dark' ? '1px solid rgba(0, 255, 255, 0.3)' : '1px solid #E5E7EB',
                            backdropFilter: mode === 'dark' ? 'blur(10px)' : 'none',
                            borderRadius: 16,
                            transition: 'all 0.3s ease-in-out',
                            '&:hover': {
                                boxShadow: mode === 'dark'
                                    ? '0 0 30px rgba(0, 255, 255, 0.4), 0 10px 15px -3px rgba(0, 0, 0, 0.4)'
                                    : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                                transform: 'translateY(-2px)',
                                border: mode === 'dark' ? '1px solid rgba(0, 255, 255, 0.6)' : '1px solid #E5E7EB',
                            },
                        },
                    },
                },
                MuiPaper: {
                    styleOverrides: {
                        root: {
                            background: mode === 'dark'
                                ? 'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(10, 10, 10, 0.9) 100%)'
                                : '#FFFFFF',
                            boxShadow: mode === 'dark'
                                ? '0 0 20px rgba(0, 255, 255, 0.2), 0 4px 6px -1px rgba(0, 0, 0, 0.3)'
                                : '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                            border: mode === 'dark' ? '1px solid rgba(0, 255, 255, 0.3)' : '1px solid #E5E7EB',
                            backdropFilter: mode === 'dark' ? 'blur(10px)' : 'none',
                            borderRadius: 16,
                        },
                    },
                },
                MuiButton: {
                    styleOverrides: {
                        root: {
                            borderRadius: 12,
                            textTransform: 'none',
                            fontWeight: 500,
                            padding: '12px 24px',
                            fontSize: '0.875rem',
                            letterSpacing: '0.025em',
                            transition: 'all 0.3s ease-in-out',
                            '&:hover': {
                                transform: 'translateY(-1px)',
                                boxShadow: mode === 'dark' ? '0 0 15px rgba(0, 255, 255, 0.3)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            },
                        },
                        contained: {
                            boxShadow: mode === 'dark'
                                ? '0 0 20px rgba(0, 255, 255, 0.3), 0 4px 6px -1px rgba(0, 0, 0, 0.3)'
                                : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            '&:hover': {
                                boxShadow: mode === 'dark'
                                    ? '0 0 30px rgba(0, 255, 255, 0.5), 0 10px 15px -3px rgba(0, 0, 0, 0.4)'
                                    : '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                            },
                        },
                        outlined: {
                            borderWidth: '2px',
                            '&:hover': {
                                borderWidth: '2px',
                                boxShadow: mode === 'dark' ? '0 0 15px rgba(0, 255, 255, 0.3)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            },
                        },
                    },
                },
                MuiChip: {
                    styleOverrides: {
                        root: {
                            borderRadius: 8,
                            fontWeight: 500,
                            background: mode === 'dark' ? 'rgba(0, 255, 255, 0.1)' : 'rgba(0, 255, 255, 0.1)',
                            border: mode === 'dark' ? '1px solid rgba(0, 255, 255, 0.3)' : '1px solid rgba(0, 255, 255, 0.3)',
                            color: mode === 'dark' ? '#00FFFF' : '#00FFFF',
                            '&:hover': {
                                background: mode === 'dark' ? 'rgba(0, 255, 255, 0.2)' : 'rgba(0, 255, 255, 0.2)',
                                boxShadow: mode === 'dark' ? '0 0 10px rgba(0, 255, 255, 0.3)' : '0 0 10px rgba(0, 255, 255, 0.3)',
                            },
                        },
                    },
                },
                MuiListItemButton: {
                    styleOverrides: {
                        root: {
                            borderRadius: 12,
                            margin: '4px 8px',
                            transition: 'all 0.3s ease-in-out',
                            '&.Mui-selected': {
                                background: mode === 'dark'
                                    ? 'linear-gradient(135deg, rgba(0, 255, 255, 0.2) 0%, rgba(30, 203, 225, 0.1) 100%)'
                                    : 'rgba(0, 255, 255, 0.1)',
                                boxShadow: mode === 'dark'
                                    ? '0 0 15px rgba(0, 255, 255, 0.3), inset 0 0 10px rgba(0, 255, 255, 0.1)'
                                    : '0 2px 4px rgba(0, 255, 255, 0.2)',
                                border: mode === 'dark' ? '1px solid rgba(0, 255, 255, 0.4)' : '1px solid rgba(0, 255, 255, 0.3)',
                                '&:hover': {
                                    background: mode === 'dark'
                                        ? 'linear-gradient(135deg, rgba(0, 255, 255, 0.3) 0%, rgba(30, 203, 225, 0.2) 100%)'
                                        : 'rgba(0, 255, 255, 0.15)',
                                },
                            },
                        },
                    },
                },
                MuiAppBar: {
                    styleOverrides: {
                        root: {
                            background: mode === 'dark'
                                ? 'linear-gradient(180deg, #000000 0%, #0A0A0A 100%)'
                                : '#FFFFFF',
                            borderBottom: mode === 'dark' ? '1px solid rgba(0, 255, 255, 0.3)' : '1px solid #E5E7EB',
                            boxShadow: mode === 'dark'
                                ? '0 2px 10px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 255, 255, 0.1)'
                                : '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                            backdropFilter: mode === 'dark' ? 'blur(10px)' : 'none',
                        },
                    },
                },
                MuiIconButton: {
                    styleOverrides: {
                        root: {
                            borderRadius: 12,
                            transition: 'all 0.3s ease-in-out',
                            '&:hover': {
                                transform: 'scale(1.05)',
                                boxShadow: mode === 'dark' ? '0 0 15px rgba(0, 255, 255, 0.3)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            },
                        },
                    },
                },
                MuiAvatar: {
                    styleOverrides: {
                        root: {
                            borderRadius: 12,
                            border: mode === 'dark' ? '1px solid rgba(0, 255, 255, 0.3)' : '1px solid #E5E7EB',
                            boxShadow: mode === 'dark' ? '0 0 10px rgba(0, 255, 255, 0.2)' : '0 2px 4px rgba(0, 0, 0, 0.1)',
                        },
                    },
                },
            },
        }), [mode]);

    const contextValue = {
        mode,
        toggleTheme,
        setTheme,
        isInitialized,
        isSystemTheme: !getStoredTheme(),
    };

    return (
        <ThemeModeContext.Provider value={contextValue}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThemeModeContext.Provider>
    );
}

export function useThemeMode() {
    const context = useContext(ThemeModeContext);
    if (!context) {
        throw new Error('useThemeMode must be used within a ThemeModeProvider');
    }
    return context;
} 