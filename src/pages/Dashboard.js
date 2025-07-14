import React from 'react';
import {
    Box,
    Grid,
    Typography,
    Paper,
    Card,
    CardContent,
    Chip,
    Avatar,
    Divider
} from '@mui/material';
import {
    Message,
    Email,
    SmartToy,
    Savings,
    TrendingUp,
    TrendingDown,
    CheckCircle,
    Error,
    Warning
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line, CartesianGrid } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { useSMSStats } from '../context/SMSStatsContext';
import SpotlightCard from '../components/SpotlightCard';
import { useThemeMode } from '../context/ThemeContext';


const statsData = [
    { name: 'Week 1', SMS: 400, Email: 240, Chatbot: 140 },
    { name: 'Week 2', SMS: 300, Email: 139, Chatbot: 221 },
    { name: 'Week 3', SMS: 200, Email: 980, Chatbot: 229 },
    { name: 'Week 4', SMS: 278, Email: 390, Chatbot: 200 },
];

function PlatformCard({ data, idx, sidebarOpen = true, isDarkMode, colors }) {
    const getTrendIcon = (trend) => {
        return trend === 'up' ? <TrendingUp fontSize="small" /> : <TrendingDown fontSize="small" />;
    };

    const getTrendColor = (trend) => {
        return trend === 'up' ? 'success' : 'error';
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            style={{ height: '100%', width: '100%' }}
        >
            <Card
                elevation={0}
                sx={{
                    height: '320px', // Increased height
                    minHeight: '320px',
                    maxHeight: '320px',
                    width: '100%',
                    borderRadius: 3,
                    border: `1px solid ${colors.border}`,
                    transition: 'all 0.6s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    background: colors.cardBackground,
                    boxShadow: colors.shadow,
                    '&:hover': {
                        transform: 'translateY(-2px) scale(1.02)',
                        boxShadow: colors.neonGlow,
                        borderColor: data.color,
                    },
                }}
            >
                <CardContent sx={{ p: 3, position: 'relative', zIndex: 1 }}>
                    {/* Header */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar
                            sx={{
                                bgcolor: data.color,
                                width: 40,
                                height: 40,
                                mr: 2,
                                boxShadow: `0 0 15px ${data.color}40`
                            }}
                        >
                            {data.icon}
                        </Avatar>
                        <Box flexGrow={1}>
                            <Typography variant="h6" fontWeight={600} sx={{ color: colors.text }}>
                                {data.title}
                            </Typography>
                            <Typography variant="body2" sx={{ color: colors.textSecondary }}>
                                {data.mainLabel}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Main Metric */}
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h4" fontWeight={700} sx={{
                            color: data.color,
                            textShadow: isDarkMode ? `0 0 10px ${data.color}40` : 'none',
                            mb: 0.5
                        }}>
                            {data.mainMetric}
                        </Typography>
                    </Box>

                    {/* Secondary Metrics */}
                    <Box sx={{ mb: 3 }}>
                        <Grid container spacing={2}>
                            {data.secondaryMetrics.map((metric, index) => (
                                <Grid item xs={6} key={index}>
                                    <Box sx={{
                                        p: 2,
                                        bgcolor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                                        borderRadius: 2,
                                        border: `1px solid ${colors.border}`,
                                        textAlign: 'center'
                                    }}>
                                        <Typography variant="caption" sx={{
                                            color: colors.textSecondary,
                                            fontWeight: 500,
                                            display: 'block',
                                            mb: 0.5
                                        }}>
                                            {metric.label}
                                        </Typography>
                                        <Typography variant="h6" fontWeight={600} sx={{ color: colors.text }}>
                                            {metric.value}
                                        </Typography>
                                        <Typography variant="caption" sx={{
                                            color: metric.trend === 'up' ? '#10B981' : '#EF4444',
                                            fontWeight: 600
                                        }}>
                                            {metric.percentage}
                                        </Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>

                    <Divider sx={{ my: 2, borderColor: colors.divider }} />

                    {/* Additional Info */}
                    <Box>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="caption" sx={{
                                        color: colors.textSecondary,
                                        display: 'block',
                                        mb: 0.5
                                    }}>
                                        Today
                                    </Typography>
                                    <Typography variant="body2" fontWeight={600} sx={{ color: colors.text }}>
                                        {data.additionalInfo.today}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={4}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="caption" sx={{
                                        color: colors.textSecondary,
                                        display: 'block',
                                        mb: 0.5
                                    }}>
                                        This Week
                                    </Typography>
                                    <Typography variant="body2" fontWeight={600} sx={{ color: colors.text }}>
                                        {data.additionalInfo.thisWeek}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={4}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="caption" sx={{
                                        color: colors.textSecondary,
                                        display: 'block',
                                        mb: 0.5
                                    }}>
                                        {data.title === 'Chatbot' ? 'Satisfaction' : data.title === 'Money Saved' ? 'ROI' : 'Conversion'}
                                    </Typography>
                                    <Typography variant="body2" fontWeight={600} sx={{ color: colors.text }}>
                                        {data.title === 'Chatbot' ? data.additionalInfo.satisfactionRate :
                                            data.title === 'Money Saved' ? data.additionalInfo.roi :
                                                data.additionalInfo.conversionRate}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
            </Card>
        </motion.div>
    );
}

export default function Dashboard({ sidebarOpen = true }) {
    const navigate = useNavigate();
    const { smsStats } = useSMSStats();
    const { mode } = useThemeMode();
    const isDarkMode = mode === 'dark';
    const smsRecipientsCount = smsStats.recipients;
    const smsDeliveredCount = smsStats.delivered;
    const smsFailedCount = smsStats.failed;

    // Theme-aware colors
    const getThemeColors = () => {
        if (isDarkMode) {
            return {
                background: 'linear-gradient(135deg, #111827 0%, #1F2937 100%)',
                cardBackground: 'linear-gradient(135deg, #1F2937 0%, #374151 100%)',
                text: '#F9FAFB',
                textSecondary: '#D1D5DB',
                border: 'rgba(59, 130, 246, 0.2)',
                shadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                neonGlow: '0 0 20px rgba(59, 130, 246, 0.3)',
                divider: 'rgba(255, 255, 255, 0.1)'
            };
        } else {
            return {
                background: 'linear-gradient(135deg, #F9FAFB 0%, #FFFFFF 100%)',
                cardBackground: 'linear-gradient(135deg, #FFFFFF 0%, #F3F4F6 100%)',
                text: '#111827',
                textSecondary: '#6B7280',
                border: 'rgba(59, 130, 246, 0.1)',
                shadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                neonGlow: '0 0 15px rgba(59, 130, 246, 0.2)',
                divider: 'rgba(0, 0, 0, 0.1)'
            };
        }
    };

    const colors = getThemeColors();

    const platformData = [
        {
            title: 'SMS',
            icon: <Message />,
            color: '#3B82F6', // Blue
            bgColor: isDarkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)',
            mainMetric: smsRecipientsCount.toLocaleString(),
            mainLabel: 'Total Recipients',
            secondaryMetrics: [
                { label: 'Delivered', value: smsDeliveredCount.toLocaleString(), percentage: '93.2%', trend: 'up', color: 'success' },
                { label: 'Failed', value: smsFailedCount.toLocaleString(), percentage: '6.8%', trend: 'down', color: 'error' }
            ],
            additionalInfo: {
                today: '156',
                thisWeek: '1,234',
                conversionRate: '4.2%'
            }
        },
        {
            title: 'Email',
            icon: <Email />,
            color: '#8B5CF6', // Purple
            bgColor: isDarkMode ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0.05)',
            mainMetric: '15,432',
            mainLabel: 'Total Emails Sent',
            secondaryMetrics: [
                { label: 'Opened', value: '8,765', percentage: '56.8%', trend: 'up', color: 'success' },
                { label: 'Bounced', value: '234', percentage: '1.5%', trend: 'down', color: 'error' }
            ],
            additionalInfo: {
                today: '892',
                thisWeek: '6,543',
                conversionRate: '3.8%'
            }
        },
        {
            title: 'Chatbot',
            icon: <SmartToy />,
            color: '#10B981', // Green
            bgColor: isDarkMode ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.05)',
            mainMetric: '8,921',
            mainLabel: 'Total Conversations',
            secondaryMetrics: [
                { label: 'Resolved', value: '7,234', percentage: '81.1%', trend: 'up', color: 'success' },
                { label: 'Escalated', value: '456', percentage: '5.1%', trend: 'down', color: 'warning' }
            ],
            additionalInfo: {
                today: '234',
                thisWeek: '2,156',
                satisfactionRate: '94.2%'
            }
        },
        {
            title: 'Money Saved',
            icon: <Savings />,
            color: '#F59E0B', // Orange
            bgColor: isDarkMode ? 'rgba(245, 158, 11, 0.1)' : 'rgba(245, 158, 11, 0.05)',
            mainMetric: '$12,847',
            mainLabel: 'Total Savings',
            secondaryMetrics: [
                { label: 'Month', value: '$2,456', percentage: '+19.2%', trend: 'up', color: 'success' },
                { label: 'Last Month', value: '$1,234', percentage: '+10.8%', trend: 'up', color: 'success' }
            ],
            additionalInfo: {
                today: '$156',
                thisWeek: '$3,234',
                roi: '342%'
            }
        }
    ];

    return (
        <Box
            sx={{
                p: 3,
                maxWidth: '100%',
                mx: 0,
                background: colors.background,
                minHeight: '100vh',
                position: 'relative',
                overflow: 'hidden',
                '&::-webkit-scrollbar': {
                    display: 'none'
                },
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
            }}
        >
            {/* Subtle Background Pattern */}
            <div className="background-pattern">
                <svg className="pattern-svg" viewBox="0 0 1200 800" preserveAspectRatio="none">
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke={isDarkMode ? 'rgba(59, 130, 246, 0.05)' : 'rgba(59, 130, 246, 0.02)'} strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            <style jsx>{`
                .background-pattern {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    z-index: 0;
                    pointer-events: none;
                    opacity: 0.3;
                }
                
                .pattern-svg {
                    width: 100%;
                    height: 100%;
                }
            `}</style>

            {/* Main Content */}
            <Box sx={{ position: 'relative', zIndex: 1, p: 3 }}>
                {/* Header */}
                <Box sx={{ mb: 4 }}>
                    <Typography
                        variant="h4"
                        fontWeight={700}
                        sx={{
                            color: colors.text,
                            mb: 1,
                            textShadow: isDarkMode ? '0 0 10px rgba(59, 130, 246, 0.3)' : 'none'
                        }}
                    >
                        Dashboard Overview
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: colors.textSecondary,
                            maxWidth: 600
                        }}
                    >
                        Monitor your communication platforms performance and track key metrics across SMS, Email, and Chatbot channels.
                    </Typography>
                </Box>

                {/* Platform Cards Grid */}
                <Grid container spacing={3} sx={{ mb: 4, flexWrap: 'nowrap' }}>
                    {platformData.map((data, idx) => (
                        <Grid item xs={12} sm={6} lg={3} key={data.title} sx={{
                            display: 'flex',
                            minHeight: '320px',
                            flex: '1 1 25%',
                            ...(sidebarOpen && {
                                width: '25%',
                                minWidth: '250px',
                                maxWidth: '300px',
                            }),
                            transition: 'all 0.3s ease-in-out',
                        }}>
                            <PlatformCard
                                data={data}
                                idx={idx}
                                sidebarOpen={sidebarOpen}
                                isDarkMode={isDarkMode}
                                colors={colors}
                            />
                        </Grid>
                    ))}
                </Grid>

                {/* Charts Section */}
                <Box sx={{ position: 'relative', width: '100%' }}>
                    {/* Activity Chart */}
                    <Box sx={{
                        minWidth: sidebarOpen ? '805px' : '945px',
                        width: sidebarOpen ? '805px' : '945px',
                        minHeight: '380px',
                        height: '380px',
                        transition: 'all 0.3s ease-in-out',
                        display: 'inline-block',
                    }}>
                        <Card
                            elevation={0}
                            sx={{
                                background: colors.cardBackground,
                                border: `1px solid ${colors.border}`,
                                borderRadius: 3,
                                boxShadow: colors.shadow,
                                p: 3,
                                minWidth: sidebarOpen ? '805px' : '945px',
                                width: sidebarOpen ? '805px' : '945px',
                                minHeight: '380px',
                                height: '380px',
                                transition: 'all 0.3s ease-in-out',
                                '&:hover': {
                                    boxShadow: colors.neonGlow,
                                    transform: 'translateY(-2px)',
                                    transition: 'all 0.3s ease-in-out',
                                }
                            }}
                        >
                            <Typography variant="h6" fontWeight={600} sx={{ color: colors.text, mb: 3 }}>
                                Platform Activity
                            </Typography>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={statsData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke={colors.divider} />
                                    <XAxis
                                        dataKey="name"
                                        stroke={colors.textSecondary}
                                        fontSize={12}
                                    />
                                    <YAxis
                                        stroke={colors.textSecondary}
                                        fontSize={12}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
                                            border: `1px solid ${colors.border}`,
                                            borderRadius: 8,
                                            color: colors.text
                                        }}
                                    />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="SMS"
                                        stroke="#3B82F6"
                                        strokeWidth={2}
                                        dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="Email"
                                        stroke="#8B5CF6"
                                        strokeWidth={2}
                                        dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="Chatbot"
                                        stroke="#10B981"
                                        strokeWidth={2}
                                        dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </Card>
                    </Box>

                    {/* Message Distribution Chart */}
                    <Box sx={{
                        position: 'absolute',
                        right: sidebarOpen ? '44px' : '34px',
                        top: '0px',
                        minWidth: sidebarOpen ? '200px' : '300px',
                        width: sidebarOpen ? '200px' : '300px',
                        minHeight: '380px',
                        height: '380px',
                        marginLeft: sidebarOpen ? '-145px' : '-85px',
                        transition: 'all 0.3s ease-in-out',
                    }}>
                        <Card
                            elevation={0}
                            sx={{
                                background: colors.cardBackground,
                                border: `1px solid ${colors.border}`,
                                borderRadius: 3,
                                boxShadow: colors.shadow,
                                p: 3,
                                minWidth: sidebarOpen ? '200px' : '300px',
                                width: sidebarOpen ? '200px' : '300px',
                                minHeight: '380px',
                                height: '380px',
                                transition: 'all 0.3s ease-in-out',
                                '&:hover': {
                                    boxShadow: colors.neonGlow,
                                    transform: 'translateY(-2px)',
                                    transition: 'all 0.3s ease-in-out',
                                }
                            }}
                        >
                            <Typography variant="h6" fontWeight={600} sx={{ color: colors.text, mb: 3 }}>
                                Message Distribution
                            </Typography>
                            <Box sx={{ width: '100%', height: '280px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <Typography variant="h4" sx={{ color: colors.text, mb: 2 }}>
                                    Message Distribution
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', maxWidth: '200px' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Box sx={{ width: '20px', height: '20px', bgcolor: '#3B82F6', borderRadius: '50%' }} />
                                        <Typography variant="body2" sx={{ color: colors.text }}>
                                            SMS: 45%
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Box sx={{ width: '20px', height: '20px', bgcolor: '#8B5CF6', borderRadius: '50%' }} />
                                        <Typography variant="body2" sx={{ color: colors.text }}>
                                            Email: 35%
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Box sx={{ width: '20px', height: '20px', bgcolor: '#10B981', borderRadius: '50%' }} />
                                        <Typography variant="body2" sx={{ color: colors.text }}>
                                            Chatbot: 20%
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Card>
                    </Box>

                </Box>
            </Box>
        </Box>
    );
} 