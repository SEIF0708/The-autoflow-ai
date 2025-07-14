import React, { useState } from 'react';
import {
    Typography,
    Box,
    Paper,
    TextField,
    Button,
    Grid,
    Card,
    CardContent,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    Alert,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Stepper,
    Step,
    StepLabel,
    StepContent,
    FormControlLabel,
    Switch,
    InputAdornment,
    Avatar,
    Badge,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    ExpandMore,
    Collapse,
    IconButton as MuiIconButton
} from '@mui/material';
import {
    CloudUpload,
    Message,
    Schedule,
    Preview,
    Send,
    CheckCircle,
    Error,
    Info,
    Phone,
    Description,
    Campaign,
    Analytics,
    Person,
    MoreVert,
    Search
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import * as XLSX from 'xlsx';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSMSStats } from '../context/SMSStatsContext';

const SMS_TEMPLATES = [
    { id: 'appointment', name: 'Appointment Reminder', template: 'Hi {name}, your appointment is scheduled for {date} at {time}. Please confirm by replying YES.' },
    { id: 'marketing', name: 'Marketing Campaign', template: 'Hi {name}! {message} Reply STOP to unsubscribe.' },
    { id: 'custom', name: 'Custom Message', template: '' },
];

export default function SMS() {
    const [activeStep, setActiveStep] = useState(0);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [message, setMessage] = useState('');
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [campaignName, setCampaignName] = useState('');
    const [scheduledDate, setScheduledDate] = useState('');
    const [scheduledTime, setScheduledTime] = useState('');
    const [isScheduled, setIsScheduled] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [recipients, setRecipients] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const [history, setHistory] = useState([]);
    const [expandedHistory, setExpandedHistory] = useState(null);
    const [historySearch, setHistorySearch] = useState('');
    const [historyStatus, setHistoryStatus] = useState('all');
    const { setSMSStats } = useSMSStats();

    // Function to update SMS stats in context
    const updateSMSStats = (recipientsList) => {
        const delivered = recipientsList.filter(r => r.status === 'delivered').length;
        const failed = recipientsList.filter(r => r.status === 'failed').length;
        const totalRecipients = recipientsList.length;

        setSMSStats({
            recipients: totalRecipients,
            delivered: delivered,
            failed: failed
        });
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        setUploadedFile(file);

        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            // Find columns for name and phone
            let nameIdx = -1, phoneIdx = -1;
            if (json.length > 0) {
                json[0].forEach((col, idx) => {
                    if (typeof col === 'string') {
                        if (col.toLowerCase().includes('name')) nameIdx = idx;
                        if (col.toLowerCase().includes('phone') || col.toLowerCase().includes('number')) phoneIdx = idx;
                    }
                });
            }
            const allRecipients = [];
            for (let i = 1; i < json.length; i++) {
                const row = json[i];
                const name = nameIdx !== -1 ? String(row[nameIdx] || '').trim() : '';
                const phone = phoneIdx !== -1 ? String(row[phoneIdx] || '').replace(/\s+/g, '') : '';
                // Validate: must start with +216 and have exactly 8 digits after
                if (/^\+216\d{8}$/.test(phone)) {
                    allRecipients.push({ name, phone, status: 'pending' });
                } else {
                    allRecipients.push({ name, phone, status: 'failed' });
                }
            }
            setRecipients(allRecipients);
            // Update SMSStatsContext
            updateSMSStats(allRecipients);
        };
        reader.readAsArrayBuffer(file);
    };

    const handleTemplateChange = (event) => {
        const templateId = event.target.value;
        setSelectedTemplate(templateId);
        const template = SMS_TEMPLATES.find(t => t.id === templateId);
        if (template && template.template) {
            setMessage(template.template);
        }
    };

    const handleSendSMS = () => {
        setShowSuccess(true);
        // Simulate sending SMS and update recipient statuses
        setTimeout(() => {
            const updatedRecipients = recipients.map((recipient, index) => {
                if (recipient.status === 'failed') {
                    return recipient; // Never change failed
                }
                // Simulate: first two become sent, third delivered, rest stay sent
                let newStatus = 'pending';
                if (index < 2) {
                    newStatus = 'sent';
                } else if (index === 2) {
                    newStatus = 'delivered';
                } else {
                    newStatus = 'sent';
                }
                return { ...recipient, status: newStatus };
            });
            setRecipients(updatedRecipients);

            // Update SMSStatsContext with new counts
            updateSMSStats(updatedRecipients);

            // Add to history
            setHistory(prev => [{
                date: new Date().toLocaleString(),
                campaignName,
                message,
                recipients: updatedRecipients.map(r => ({ name: r.name, phone: r.phone, status: r.status }))
            }, ...prev]);
        }, 2000);
    };

    // Calculate delivery status counts from recipients
    const deliveryCounts = {
        pending: 0,
        sent: 0,
        delivered: 0,
        failed: 0
    };
    recipients.forEach(r => {
        if (r.status === 'pending') deliveryCounts.pending++;
        else if (r.status === 'sent') deliveryCounts.sent++;
        else if (r.status === 'delivered') deliveryCounts.delivered++;
        else if (r.status === 'failed') deliveryCounts.failed++;
    });

    const deliveryStatus = [
        { status: 'pending', count: deliveryCounts.pending, color: 'warning', chartColor: '#ff9800' },
        { status: 'sent', count: deliveryCounts.sent, color: 'info', chartColor: '#2196f3' },
        { status: 'delivered', count: deliveryCounts.delivered, color: 'success', chartColor: '#4caf50' },
        { status: 'failed', count: deliveryCounts.failed, color: 'error', chartColor: '#f44336' },
    ];

    const totalMessages = deliveryStatus.reduce((sum, status) => sum + status.count, 0);
    const chartData = deliveryStatus
        .filter(status => status.count > 0)
        .map(status => ({
            name: status.status.charAt(0).toUpperCase() + status.status.slice(1),
            value: status.count,
            color: status.chartColor,
            percentage: totalMessages > 0 ? Math.round((status.count / totalMessages) * 100) : 0
        }));

    // Flatten history for client-level rows
    const clientHistoryRows = history.flatMap((entry, batchIdx) =>
        entry.recipients.map((r, i) => ({
            date: entry.date,
            campaignName: entry.campaignName,
            message: entry.message,
            name: r.name,
            phone: r.phone,
            status: r.status
        }))
    );

    // Search and filter on client rows
    const filteredClientRows = clientHistoryRows.filter(row => {
        const search = historySearch.trim().toLowerCase();
        const matchesSearch =
            !search ||
            (row.name && row.name.toLowerCase().includes(search)) ||
            (row.phone && row.phone.toLowerCase().includes(search));
        const matchesStatus =
            historyStatus === 'all' || row.status === historyStatus;
        return matchesSearch && matchesStatus;
    });

    const steps = [
        {
            label: 'Upload Contact List',
            content: (
                <Box>
                    <Typography variant="body1" color="textSecondary" mb={3}>
                        Upload your Google Sheets file containing client phone numbers and names.
                    </Typography>
                    <Paper
                        elevation={2}
                        sx={{
                            p: 3,
                            border: '2px dashed #ccc',
                            borderRadius: 2,
                            textAlign: 'center',
                            cursor: 'pointer',
                            '&:hover': { borderColor: '#3f51b5' }
                        }}
                        onClick={() => document.getElementById('file-upload').click()}
                    >
                        <input
                            id="file-upload"
                            type="file"
                            accept=".xlsx,.xls"
                            style={{ display: 'none' }}
                            onChange={handleFileUpload}
                        />
                        <CloudUpload sx={{ fontSize: 48, color: '#3f51b5', mb: 2 }} />
                        <Typography variant="h6" mb={1}>
                            {uploadedFile ? uploadedFile.name : 'Click to upload Google Sheets file'}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Supports .xlsx and .xls files
                        </Typography>
                    </Paper>
                    {uploadedFile && (
                        <Alert severity="success" sx={{ mt: 2 }}>
                            File uploaded successfully! Found {recipients.length} contacts.
                        </Alert>
                    )}
                </Box>
            )
        },
        {
            label: 'Compose Message',
            content: (
                <Box>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Campaign Name"
                                value={campaignName}
                                onChange={(e) => setCampaignName(e.target.value)}
                                placeholder="Enter campaign name for tracking"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Message Template</InputLabel>
                                <Select
                                    value={selectedTemplate}
                                    onChange={handleTemplateChange}
                                    label="Message Template"
                                >
                                    {SMS_TEMPLATES.map((template) => (
                                        <MenuItem key={template.id} value={template.id}>
                                            {template.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                label="Message Content"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Enter your message here..."
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Typography variant="caption" color="textSecondary">
                                                {message.length}/160
                                            </Typography>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                    </Grid>
                </Box>
            )
        },
        {
            label: 'Schedule & Send',
            content: (
                <Box>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={isScheduled}
                                        onChange={(e) => setIsScheduled(e.target.checked)}
                                    />
                                }
                                label="Schedule for later"
                            />
                        </Grid>
                        {isScheduled && (
                            <>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        type="date"
                                        label="Scheduled Date"
                                        value={scheduledDate}
                                        onChange={(e) => setScheduledDate(e.target.value)}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        type="time"
                                        label="Scheduled Time"
                                        value={scheduledTime}
                                        onChange={(e) => setScheduledTime(e.target.value)}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>
                            </>
                        )}
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                <Button
                                    variant="outlined"
                                    startIcon={<Preview />}
                                    onClick={() => setPreviewOpen(true)}
                                >
                                    Preview
                                </Button>
                                <Button
                                    variant="contained"
                                    startIcon={<Send />}
                                    onClick={handleSendSMS}
                                    disabled={!uploadedFile || !message.trim()}
                                >
                                    {isScheduled ? 'Schedule SMS' : 'Send SMS'}
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            )
        }
    ];

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Header Section */}
            <Box sx={{ mb: 3 }}>
                {showSuccess && (
                    <Alert severity="success" sx={{ mb: 2 }} onClose={() => setShowSuccess(false)}>
                        SMS campaign created successfully! Your messages are being processed through n8n workflows.
                    </Alert>
                )}
            </Box>

            {/* Main Content - Aligned Grid */}
            <Box sx={{ flex: 1, display: 'flex', gap: 3, alignItems: 'flex-start', minHeight: 0 }}>
                {/* Main SMS Creation - Left Side */}
                <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Paper elevation={3} sx={{ p: 3, borderRadius: 3, height: 'fit-content' }}>
                        <Typography variant="h6" fontWeight={600} mb={3}>
                            Create SMS Campaign
                        </Typography>
                        <Stepper activeStep={activeStep} orientation="vertical">
                            {steps.map((step, index) => (
                                <Step key={step.label}>
                                    <StepLabel>{step.label}</StepLabel>
                                    <StepContent>
                                        <Box sx={{ mb: 2 }}>
                                            {step.content}
                                            <Box sx={{ mt: 2 }}>
                                                <Button
                                                    variant="contained"
                                                    onClick={() => setActiveStep((prevActiveStep) => prevActiveStep + 1)}
                                                    disabled={index === 0 && !uploadedFile}
                                                    sx={{ mr: 1 }}
                                                >
                                                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                                </Button>
                                                <Button
                                                    disabled={index === 0}
                                                    onClick={() => setActiveStep((prevActiveStep) => prevActiveStep - 1)}
                                                >
                                                    Back
                                                </Button>
                                            </Box>
                                        </Box>
                                    </StepContent>
                                </Step>
                            ))}
                        </Stepper>
                    </Paper>
                    {/* Message History - wide and always aligned below the stepper */}
                    <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2, flexWrap: 'wrap' }}>
                            <Typography variant="h5" fontWeight={700} sx={{ flexGrow: 1 }}>
                                Message History
                            </Typography>
                            <TextField
                                size="small"
                                variant="outlined"
                                placeholder="Search by name or number"
                                value={historySearch}
                                onChange={e => setHistorySearch(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ minWidth: 220 }}
                            />
                            <FormControl size="small" sx={{ minWidth: 140 }}>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    label="Status"
                                    value={historyStatus}
                                    onChange={e => setHistoryStatus(e.target.value)}
                                >
                                    <MenuItem value="all">All</MenuItem>
                                    <MenuItem value="sent">Sent</MenuItem>
                                    <MenuItem value="delivered">Delivered</MenuItem>
                                    <MenuItem value="failed">Failed</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        {filteredClientRows.length === 0 ? (
                            <Typography variant="body1" color="textSecondary">No clients found.</Typography>
                        ) : (
                            <TableContainer sx={{ borderRadius: 3, maxHeight: 400 }}>
                                <Table stickyHeader size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>#</TableCell>
                                            <TableCell>Date</TableCell>
                                            <TableCell>Campaign Name</TableCell>
                                            <TableCell>Message</TableCell>
                                            <TableCell>Client Name</TableCell>
                                            <TableCell>Client Number</TableCell>
                                            <TableCell>Status</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filteredClientRows.map((row, idx) => (
                                            <TableRow hover key={idx}>
                                                <TableCell>{idx + 1}</TableCell>
                                                <TableCell>{row.date}</TableCell>
                                                <TableCell>{row.campaignName || 'No Campaign Name'}</TableCell>
                                                <TableCell sx={{ maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.message}</TableCell>
                                                <TableCell>{row.name}</TableCell>
                                                <TableCell>{row.phone}</TableCell>
                                                <TableCell>
                                                    <Chip
                                                        label={row.status}
                                                        color={row.status === 'failed' ? 'error' : row.status === 'delivered' ? 'success' : row.status === 'sent' ? 'info' : 'default'}
                                                        size="small"
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                    </Paper>
                </Box>
                {/* Sidebar - Right Side */}
                <Box sx={{ width: 400, minWidth: 320, maxWidth: 440, display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}>
                    {/* Recipients Card - longer */}
                    <Card elevation={3} sx={{ borderRadius: 3, flex: 1, minHeight: 280 }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                                <Typography variant="h6" fontWeight={600}>
                                    Recipients
                                </Typography>
                                <Badge badgeContent={recipients.length} color="primary">
                                    <Avatar sx={{ bgcolor: '#3f51b5', width: 32, height: 32 }}>
                                        <Person fontSize="small" />
                                    </Avatar>
                                </Badge>
                            </Box>
                            {recipients.length > 0 ? (
                                <List dense sx={{ maxHeight: 200, overflow: 'auto' }}>
                                    {recipients.map((recipient, index) => (
                                        <ListItem
                                            key={index}
                                            sx={{
                                                mb: 1,
                                                bgcolor: '#2a2a2a',
                                                borderRadius: 2,
                                                '&:hover': { bgcolor: '#3a3a3a' }
                                            }}
                                        >
                                            <ListItemIcon>
                                                <Avatar sx={{ width: 32, height: 32, bgcolor: '#3f51b5' }}>
                                                    {recipient.name.charAt(0)}
                                                </Avatar>
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={
                                                    <Typography variant="body2" fontWeight={500}>
                                                        {recipient.name}
                                                    </Typography>
                                                }
                                                secondary={
                                                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                                                        <Phone fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                                                        <Typography variant="caption" color="textSecondary">
                                                            {recipient.phone}
                                                        </Typography>
                                                    </Box>
                                                }
                                            />
                                            <Chip
                                                label={recipient.status}
                                                size="small"
                                                sx={{
                                                    minWidth: 60,
                                                    bgcolor: recipient.status === 'pending' ? '#ff9800' :
                                                        recipient.status === 'sent' ? '#2196f3' :
                                                            recipient.status === 'delivered' ? '#4caf50' : '#f44336',
                                                    color: 'white',
                                                    fontWeight: 500
                                                }}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            ) : (
                                <Box sx={{ textAlign: 'center', py: 3 }}>
                                    <Phone sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
                                    <Typography variant="body2" color="textSecondary">
                                        Upload a file to see recipients
                                    </Typography>
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                    {/* Delivery Status Card - taller */}
                    <Card elevation={3} sx={{ borderRadius: 3, flex: 1, minHeight: 340 }}>
                        <CardContent>
                            <Typography variant="h6" fontWeight={600} mb={2}>
                                Delivery Status
                            </Typography>
                            {totalMessages > 0 ? (
                                <Box>
                                    {/* Pie Chart */}
                                    <Box sx={{ height: 200, mb: 2 }}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={chartData}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={40}
                                                    outerRadius={80}
                                                    paddingAngle={2}
                                                    dataKey="value"
                                                >
                                                    {chartData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                                    ))}
                                                </Pie>
                                                <Tooltip
                                                    formatter={(value, name) => [`${value} (${chartData.find(d => d.name === name)?.percentage}%)`, name]}
                                                />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </Box>

                                    {/* Enhanced Status Legend */}
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, gap: 1 }}>
                                        {deliveryStatus.map((status) => (
                                            <Box key={status.status} sx={{ display: 'flex', alignItems: 'center', minWidth: 60, px: 0.5 }}>
                                                <Box
                                                    sx={{
                                                        width: 11,
                                                        height: 11,
                                                        borderRadius: '50%',
                                                        bgcolor: status.chartColor,
                                                        mr: 0.5,
                                                        border: '1.5px solid #fff',
                                                        boxShadow: '0 0 0 1px #ccc',
                                                    }}
                                                />
                                                <Typography variant="caption" fontWeight={600} sx={{ mr: 0.3, lineHeight: 1 }}>
                                                    {status.status.charAt(0).toUpperCase() + status.status.slice(1)}
                                                </Typography>
                                                <Typography variant="caption" color="textSecondary" sx={{ lineHeight: 1 }}>
                                                    {status.count}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                </Box>
                            ) : (
                                <Box sx={{ textAlign: 'center', py: 3 }}>
                                    <Send sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
                                    <Typography variant="body2" color="textSecondary">
                                        No messages sent yet
                                    </Typography>
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                </Box>
            </Box>

            {/* Preview Dialog */}
            <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Message Preview</DialogTitle>
                <DialogContent>
                    <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 2, mb: 2 }}>
                        <Typography variant="body1">{message}</Typography>
                    </Box>
                    <Typography variant="body2" color="textSecondary">
                        This message will be sent to {recipients.length} recipients.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setPreviewOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
} 