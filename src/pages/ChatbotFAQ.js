import React, { useState } from 'react';
import {
    Typography,
    Box,
    Card,
    CardContent,
    Button,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Chip,
    Switch,
    IconButton,
    InputAdornment,
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from '@mui/material';
import {
    Add,
    Search,
    Download,
    Upload,
    Settings
} from '@mui/icons-material';

export default function ChatbotFAQ() {
    const [faqs, setFaqs] = useState([
        { id: 1, question: 'How do I reset my password?', answer: 'Click on "Forgot Password" and follow the instructions.', triggers: ['password', 'reset'], enabled: true, type: 'always' },
        { id: 2, question: 'What are your business hours?', answer: 'We are open Monday-Friday, 9 AM to 6 PM EST.', triggers: ['hours', 'business'], enabled: true, type: 'always' },
        { id: 3, question: 'How can I contact support?', answer: 'You can reach us at support@company.com or call 1-800-123-4567.', triggers: ['contact', 'support'], enabled: false, type: 'fallback' }
    ]);
    const [openDialog, setOpenDialog] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');

    const handleAddFAQ = () => {
        setOpenDialog(true);
    };

    const filteredFaqs = faqs.filter(faq => {
        const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterType === 'all' || faq.type === filterType;
        return matchesSearch && matchesFilter;
    });

    return (
        <Box sx={{ p: 3 }}>
            <Box mb={3}>
                <Typography variant="h4" fontWeight={700} mb={1}>
                    FAQ Manager
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Create and manage question/answer pairs for automated responses
                </Typography>
            </Box>

            <Box display="flex" gap={2} mb={3} flexWrap="wrap">
                <TextField
                    placeholder="Search FAQs..."
                    size="small"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                    }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ minWidth: 200 }}
                />
                <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>Filter</InputLabel>
                    <Select
                        value={filterType}
                        label="Filter"
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="always">Always Reply</MenuItem>
                        <MenuItem value="fallback">Fallback Only</MenuItem>
                    </Select>
                </FormControl>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={handleAddFAQ}
                >
                    Add New FAQ
                </Button>
                <Button variant="outlined" startIcon={<Upload />}>
                    Import
                </Button>
                <Button variant="outlined" startIcon={<Download />}>
                    Export
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Question</TableCell>
                            <TableCell>Answer</TableCell>
                            <TableCell>Triggers</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredFaqs.map((faq) => (
                            <TableRow key={faq.id}>
                                <TableCell>{faq.question}</TableCell>
                                <TableCell>{faq.answer}</TableCell>
                                <TableCell>
                                    <Box display="flex" gap={0.5} flexWrap="wrap">
                                        {faq.triggers.map((trigger, index) => (
                                            <Chip key={index} label={trigger} size="small" />
                                        ))}
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={faq.type === 'always' ? 'Always Reply' : 'Fallback Only'}
                                        color={faq.type === 'always' ? 'primary' : 'secondary'}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Switch
                                        checked={faq.enabled}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <IconButton size="small">
                                        <Settings />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
                <DialogTitle>Add New FAQ</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Question"
                        margin="normal"
                        multiline
                        rows={2}
                    />
                    <TextField
                        fullWidth
                        label="Answer"
                        margin="normal"
                        multiline
                        rows={4}
                    />
                    <TextField
                        fullWidth
                        label="Triggers (comma-separated)"
                        margin="normal"
                        placeholder="password, reset, forgot"
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Reply Type</InputLabel>
                        <Select label="Reply Type">
                            <MenuItem value="always">Always Reply</MenuItem>
                            <MenuItem value="fallback">Fallback Only</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button variant="contained">Add FAQ</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
} 