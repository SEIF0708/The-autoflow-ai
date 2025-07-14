import React, { useState } from 'react';
import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Tooltip,
    IconButton,
    Collapse,
    ListItem,
    useMediaQuery,
    useTheme,
    Box,
    Typography
} from '@mui/material';
import {
    Dashboard,
    Sms,
    Email,
    SmartToy,
    BarChart,
    ViewKanban,
    CalendarMonth,
    AttachMoney,
    Settings,
    QuestionAnswer,
    Inbox,
    Tune,
    ExpandLess,
    ExpandMore,
    AccountCircle
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useThemeMode } from '../context/ThemeContext';
import Logo from './Logo';

const navItems = [
    { label: 'Dashboard', icon: <Dashboard />, path: '/' },
    { label: 'SMS', icon: <Sms />, path: '/sms' },
    { label: 'Email', icon: <Email />, path: '/email' },
    {
        label: 'Chatbot',
        icon: <SmartToy />,
        path: '/chatbot',
        subItems: [
            { label: 'Channels', icon: <Settings />, path: '/chatbot/channels' },
            { label: 'FAQ Manager', icon: <QuestionAnswer />, path: '/chatbot/faq' },
            { label: 'AI Assistant', icon: <SmartToy />, path: '/chatbot/ai' },
            { label: 'Chat Inbox', icon: <Inbox />, path: '/chatbot/inbox' },
            { label: 'Settings', icon: <Tune />, path: '/chatbot/settings' }
        ]
    },
    { label: 'Analytics', icon: <BarChart />, path: '/analytics' },
    { label: 'Kanban', icon: <ViewKanban />, path: '/kanban' },
    { label: 'Calendar', icon: <CalendarMonth />, path: '/calendar' },
    { label: 'Billing & Payment', icon: <AttachMoney />, path: '/billing' },
    { label: 'Reports', icon: <BarChart />, path: '/reports' },
    { label: 'Users', icon: <AccountCircle />, path: '/users' },
    { label: 'Settings', icon: <Settings />, path: '/settings' },
    { label: 'Help', icon: <QuestionAnswer />, path: '/help' },
    { label: 'Support', icon: <Inbox />, path: '/support' },
    { label: 'Documentation', icon: <Settings />, path: '/docs' },
    { label: 'API', icon: <BarChart />, path: '/api' },
    { label: 'Integrations', icon: <Settings />, path: '/integrations' },
    { label: 'Backup', icon: <Settings />, path: '/backup' },
    { label: 'Security', icon: <Settings />, path: '/security' },
    { label: 'Logs', icon: <BarChart />, path: '/logs' },
];

const drawerWidth = 280;
const collapsedWidth = 80;

export default function Sidebar({ open, setOpen }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [expandedItems, setExpandedItems] = useState(new Set());
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const { mode } = useThemeMode();
    const isDarkMode = mode === 'dark';

    // Theme-aware colors
    const getThemeColors = () => {
        if (isDarkMode) {
            return {
                background: 'linear-gradient(180deg, #111827 0%, #1F2937 100%)',
                text: '#F9FAFB',
                textSecondary: '#D1D5DB',
                selectedText: '#3B82F6',
                selectedBg: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(37, 99, 235, 0.1) 100%)',
                hoverBg: 'rgba(59, 130, 246, 0.1)',
                border: 'rgba(59, 130, 246, 0.3)',
                shadow: '0 0 20px rgba(59, 130, 246, 0.3)',
                glow: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.6))',
                sidebarBorder: 'rgba(59, 130, 246, 0.2)'
            };
        } else {
            return {
                background: 'linear-gradient(180deg, #FFFFFF 0%, #F9FAFB 100%)',
                text: '#111827',
                textSecondary: '#6B7280',
                selectedText: '#3B82F6',
                selectedBg: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.05) 100%)',
                hoverBg: 'rgba(59, 130, 246, 0.05)',
                border: 'rgba(59, 130, 246, 0.2)',
                shadow: '0 0 15px rgba(59, 130, 246, 0.2)',
                glow: 'drop-shadow(0 0 5px rgba(59, 130, 246, 0.4))',
                sidebarBorder: 'rgba(59, 130, 246, 0.1)'
            };
        }
    };

    const colors = getThemeColors();

    const handleItemClick = (item) => {
        if (item.subItems) {
            // For items with sub-items, navigate to main path first, then toggle expansion
            navigate(item.path);
            const newExpanded = new Set(expandedItems);
            if (newExpanded.has(item.label)) {
                newExpanded.delete(item.label);
            } else {
                newExpanded.add(item.label);
            }
            setExpandedItems(newExpanded);
        } else {
            // Navigate to the path
            navigate(item.path);
            // Close sidebar on mobile after navigation
            if (isMobile) {
                setOpen(false);
            }
        }
    };

    const isItemSelected = (item) => {
        if (item.subItems) {
            // Check if any sub-item is selected
            return item.subItems.some(subItem => location.pathname === subItem.path);
        }
        return location.pathname === item.path;
    };

    const isSubItemSelected = (subItem) => {
        return location.pathname === subItem.path;
    };

    const renderNavItem = (item, level = 0) => {
        const isSelected = isItemSelected(item);
        const isExpanded = expandedItems.has(item.label);
        const hasSubItems = item.subItems && item.subItems.length > 0;

        return (
            <div key={item.label}>
                <Tooltip title={!open ? item.label : ''} placement="right">
                    <ListItemButton
                        selected={isSelected}
                        onClick={() => handleItemClick(item)}
                        sx={{
                            justifyContent: open ? 'flex-start' : 'center',
                            px: { xs: 2, sm: 3 },
                            py: { xs: 1.5, sm: 2 },
                            borderRadius: 3,
                            mb: 1,
                            mx: 1,
                            ml: level * 2 + 1,
                            background: isSelected ? colors.selectedBg : 'transparent',
                            color: isSelected ? colors.selectedText : colors.text,
                            border: isSelected
                                ? `1px solid ${colors.border}`
                                : '1px solid transparent',
                            boxShadow: isSelected ? colors.shadow : 'none',
                            transition: 'all 0.3s ease-in-out',
                            '&:hover': {
                                background: isSelected
                                    ? colors.selectedBg.replace('0.2', '0.3').replace('0.1', '0.2')
                                    : colors.hoverBg,
                                color: colors.selectedText,
                                boxShadow: isSelected
                                    ? colors.shadow.replace('0.3', '0.4')
                                    : `0 0 10px ${colors.border}`,
                            },
                        }}
                    >
                        <ListItemIcon sx={{
                            minWidth: 0,
                            color: isSelected ? colors.selectedText : colors.text,
                            mr: open ? 2 : 0,
                            justifyContent: 'center',
                            filter: isSelected ? colors.glow : 'none',
                            transition: 'all 0.3s ease-in-out',
                            fontSize: { xs: '1.25rem', sm: '1.5rem' },
                        }}>
                            {item.icon}
                        </ListItemIcon>
                        {open && (
                            <>
                                <ListItemText
                                    primary={item.label}
                                    sx={{
                                        '& .MuiTypography-root': {
                                            fontWeight: isSelected ? 600 : 400,
                                            textShadow: isSelected ? `0 0 8px ${colors.selectedText}40` : 'none',
                                            color: isSelected ? colors.selectedText : colors.text,
                                            fontSize: { xs: '0.875rem', sm: '1rem' },
                                            letterSpacing: '0.025em',
                                        }
                                    }}
                                />
                                {hasSubItems && (
                                    <IconButton
                                        size="small"
                                        sx={{
                                            color: isSelected ? colors.selectedText : colors.text,
                                            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                            transition: 'transform 0.3s ease',
                                            '&:hover': {
                                                color: colors.selectedText,
                                                filter: colors.glow,
                                            }
                                        }}
                                    >
                                        {isExpanded ? <ExpandLess /> : <ExpandMore />}
                                    </IconButton>
                                )}
                            </>
                        )}
                    </ListItemButton>
                </Tooltip>

                {hasSubItems && open && (
                    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {item.subItems.map((subItem) => (
                                <Tooltip key={subItem.label} title={!open ? subItem.label : ''} placement="right">
                                    <ListItemButton
                                        selected={isSubItemSelected(subItem)}
                                        onClick={() => {
                                            navigate(subItem.path);
                                            if (isMobile) {
                                                setOpen(false);
                                            }
                                        }}
                                        sx={{
                                            justifyContent: open ? 'flex-start' : 'center',
                                            px: { xs: 2, sm: 3 },
                                            py: { xs: 1, sm: 1.5 },
                                            borderRadius: 3,
                                            mb: 0.5,
                                            mx: 1,
                                            ml: (level + 1) * 2 + 1,
                                            background: isSubItemSelected(subItem)
                                                ? colors.selectedBg.replace('0.2', '0.15').replace('0.1', '0.05')
                                                : 'transparent',
                                            color: isSubItemSelected(subItem) ? colors.selectedText : colors.text,
                                            border: isSubItemSelected(subItem)
                                                ? `1px solid ${colors.border}`
                                                : '1px solid transparent',
                                            boxShadow: isSubItemSelected(subItem)
                                                ? colors.shadow.replace('0.3', '0.2')
                                                : 'none',
                                            transition: 'all 0.3s ease-in-out',
                                            '&:hover': {
                                                background: isSubItemSelected(subItem)
                                                    ? colors.selectedBg.replace('0.2', '0.25').replace('0.1', '0.15')
                                                    : colors.hoverBg,
                                                color: colors.selectedText,
                                                boxShadow: isSubItemSelected(subItem)
                                                    ? colors.shadow.replace('0.3', '0.3')
                                                    : `0 0 8px ${colors.border}`,
                                            },
                                        }}
                                    >
                                        <ListItemIcon sx={{
                                            minWidth: 0,
                                            color: isSubItemSelected(subItem) ? colors.selectedText : colors.text,
                                            mr: open ? 2 : 0,
                                            justifyContent: 'center',
                                            filter: isSubItemSelected(subItem) ? colors.glow.replace('0.6', '0.4') : 'none',
                                            transition: 'all 0.3s ease-in-out',
                                            fontSize: { xs: '1rem', sm: '1.25rem' },
                                        }}>
                                            {subItem.icon}
                                        </ListItemIcon>
                                        {open && (
                                            <ListItemText
                                                primary={subItem.label}
                                                sx={{
                                                    '& .MuiTypography-root': {
                                                        fontWeight: isSubItemSelected(subItem) ? 600 : 400,
                                                        fontSize: { xs: '0.8rem', sm: '0.9rem' },
                                                        textShadow: isSubItemSelected(subItem) ? `0 0 5px ${colors.selectedText}30` : 'none',
                                                        color: isSubItemSelected(subItem) ? colors.selectedText : colors.text,
                                                        letterSpacing: '0.025em',
                                                    }
                                                }}
                                            />
                                        )}
                                    </ListItemButton>
                                </Tooltip>
                            ))}
                        </List>
                    </Collapse>
                )}
            </div>
        );
    };

    return (
        <motion.div
            animate={{ width: open ? drawerWidth : collapsedWidth }}
            transition={{ duration: 0.3 }}
            style={{
                height: '100vh',
                background: colors.background,
                boxShadow: `0 0 30px ${colors.shadow}, 2px 0 8px rgba(0,0,0,0.1)`,
                overflow: 'hidden',
                position: 'fixed',
                left: 0,
                top: 0,
                zIndex: 1200,
                borderRight: `1px solid ${colors.sidebarBorder}`,
                padding: 0,
                backdropFilter: 'blur(10px)',
            }}
        >
            {/* Sidebar Header */}
            <Box sx={{
                height: { xs: '64px', sm: '72px' },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottom: `1px solid ${colors.border}`,
                background: colors.background,
                boxSizing: 'border-box',
                flexShrink: 0,
                position: 'relative',
                overflow: 'hidden',
            }}>
                <Logo
                    compact={!open}
                    style={{ width: '100%', maxWidth: drawerWidth - 32, height: 'auto', display: 'block', margin: '0 auto' }}
                />
            </Box>

            {/* Sidebar Content */}
            <Box sx={{
                height: `calc(100vh - ${isMobile ? '64px' : '72px'})`,
                display: 'flex',
                flexDirection: 'column',
                padding: '1rem 0',
                overflow: 'hidden',
                '& .sidebar-scroll': {
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    height: '100%',
                    paddingRight: '8px',
                    '&::-webkit-scrollbar': {
                        width: '6px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: 'transparent',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: isDarkMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)',
                        borderRadius: '3px',
                        '&:hover': {
                            background: isDarkMode ? 'rgba(59, 130, 246, 0.5)' : 'rgba(59, 130, 246, 0.4)',
                        },
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        background: isDarkMode ? 'rgba(59, 130, 246, 0.6)' : 'rgba(59, 130, 246, 0.5)',
                    },
                    // Firefox scrollbar styling
                    scrollbarWidth: 'thin',
                    scrollbarColor: isDarkMode ? 'rgba(59, 130, 246, 0.3) transparent' : 'rgba(59, 130, 246, 0.2) transparent',
                },
            }}>
                <div className="sidebar-scroll">
                    <List sx={{
                        flexGrow: 1,
                        px: 1,
                        '& .MuiListItemButton-root': {
                            marginBottom: '4px',
                        },
                    }}>
                        {navItems.map((item) => renderNavItem(item))}
                    </List>
                </div>
            </Box>
        </motion.div>
    );
} 