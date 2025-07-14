import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Chip, Divider, Dialog, DialogTitle, DialogContent, DialogActions, Card, CardContent, Switch, FormControlLabel } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import PaymentIcon from '@mui/icons-material/Payment';
import { styled } from '@mui/material/styles';

const paymentHistory = [
    { date: '2024-05-01', fees: 'TND 119', forfait: 'Standard', status: 'Paid' },
    { date: '2024-04-01', fees: 'TND 119', forfait: 'Standard', status: 'Paid' },
    { date: '2024-03-01', fees: 'TND 249', forfait: 'Pro', status: 'Pending' },
];

const pricingData = {
    monthly: [
        { name: 'Basic', price: 39, features: ['1,000 SMS/month', 'Basic personalization', 'Standard support', 'Good for small stores'], plan: 'basic' },
        { name: 'Standard', price: 119, features: ['4,000 SMS/month', '✔️ Chatbot included', 'Custom automation', 'Advanced analytics', 'Priority support'], plan: 'standard', featured: true },
        { name: 'Pro', price: 249, features: ['10,000 SMS/month', '✔️ Full chatbot features', 'Full customization', 'Premium analytics', '24/7 support', 'API access'], plan: 'pro' }
    ],
    yearly: [
        { name: 'Basic', price: 390, features: ['12,000 SMS/year', 'Basic personalization', 'Standard support', 'Good for small stores'], plan: 'basic' },
        { name: 'Standard', price: 1190, features: ['48,000 SMS/year', '✔️ Chatbot included', 'Custom automation', 'Advanced analytics', 'Priority support'], plan: 'standard', featured: true },
        { name: 'Pro', price: 2490, features: ['120,000 SMS/year', '✔️ Full chatbot features', 'Full customization', 'Premium analytics', '24/7 support', 'API access'], plan: 'pro' }
    ]
};

// Styled components for the pricing design
const PricingCard = styled(Card)(({ theme, featured }) => ({
    background: 'rgba(15, 15, 15, 0.9)',
    padding: '2.5rem 2rem 3rem',
    borderRadius: '20px',
    boxShadow: featured
        ? '0 25px 50px rgba(0, 150, 255, 0.4)'
        : '0 15px 40px rgba(0, 150, 255, 0.15)',
    transition: 'all 0.3s ease',
    position: 'relative',
    cursor: 'pointer',
    border: featured ? '2px solid #0096ff' : '2px solid rgba(0, 150, 255, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    color: '#ffffff',
    transform: featured ? 'scale(1.05)' : 'scale(1)',
    zIndex: featured ? 1 : 0,
    '&:hover': {
        borderColor: '#0096ff',
        boxShadow: '0 25px 50px rgba(0, 150, 255, 0.3)',
        transform: featured ? 'translateY(-10px) scale(1.05)' : 'translateY(-10px) scale(1.02)',
    }
}));

const Badge = styled('div')({
    position: 'absolute',
    top: '20px',
    right: '20px',
    background: '#ffbf00',
    color: '#fff',
    fontWeight: 700,
    fontSize: '0.9rem',
    padding: '6px 14px',
    borderRadius: '30px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    boxShadow: '0 5px 15px rgba(255, 191, 0, 0.4)',
});

const PlanName = styled(Typography)({
    fontSize: '1.8rem',
    fontWeight: 700,
    color: '#ffffff',
    marginBottom: '1rem',
});

const PlanPrice = styled(Typography)({
    fontSize: '2.5rem',
    fontWeight: 800,
    color: '#0096ff',
    marginBottom: '2rem',
});

const PlanFeatures = styled('ul')({
    listStyle: 'none',
    paddingLeft: 0,
    marginBottom: '2rem',
    textAlign: 'left',
    flexGrow: 1,
    '& li': {
        marginBottom: '1rem',
        fontSize: '1rem',
        color: '#b0b0b0',
        position: 'relative',
        paddingLeft: '24px',
        '&::before': {
            content: '"✔️"',
            position: 'absolute',
            left: 0,
            top: 0,
            fontSize: '1.2rem',
            lineHeight: 1,
            color: '#0096ff',
        }
    }
});

const PlanButton = styled(Button)({
    background: 'linear-gradient(45deg, #0096ff, #00d4ff)',
    color: 'white',
    fontWeight: 700,
    padding: '14px 0',
    borderRadius: '50px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '1.1rem',
    letterSpacing: '0.03em',
    userSelect: 'none',
    display: 'block',
    textDecoration: 'none',
    boxShadow: '0 10px 30px rgba(0, 150, 255, 0.4)',
    border: '1px solid rgba(0, 150, 255, 0.3)',
    '&:hover': {
        background: 'linear-gradient(45deg, #0080ff, #00b3ff)',
        boxShadow: '0 15px 40px rgba(0, 150, 255, 0.6)',
        borderColor: 'rgba(0, 150, 255, 0.6)',
    }
});

const ToggleContainer = styled('div')({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '3rem',
    justifyContent: 'center',
    fontWeight: 600,
    color: '#b0b0b0',
});

const ToggleLabel = styled('span')({
    fontSize: '1.1rem',
    userSelect: 'none',
});

const PricingGrid = styled(Grid)({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2.5rem',
});

export default function Billing() {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [billingMode, setBillingMode] = useState('monthly');
    const [selectedPlan, setSelectedPlan] = useState(null);

    const handleDialogOpen = () => setDialogOpen(true);
    const handleDialogClose = () => {
        setDialogOpen(false);
        setSelectedPlan(null);
    };

    const handlePlanSelect = (plan) => {
        setSelectedPlan(plan);
        // Here you would typically handle the payment process
        console.log('Selected plan:', plan);
    };

    const renderPricingCards = () => {
        return pricingData[billingMode].map((plan, index) => (
            <Grid item xs={12} sm={4} key={plan.name}>
                <PricingCard featured={plan.featured}>
                    {plan.featured && <Badge>✨ MOST POPULAR</Badge>}
                    <Box>
                        <PlanName variant="h6">{plan.name}</PlanName>
                        <PlanPrice>
                            <span style={{ fontSize: '1.1rem', fontWeight: 600, verticalAlign: 'top', marginRight: '3px', color: '#444' }}>
                                TND
                            </span>
                            {plan.price}
                        </PlanPrice>
                        <PlanFeatures>
                            {plan.features.map((feature, idx) => (
                                <li key={idx}>{feature}</li>
                            ))}
                        </PlanFeatures>
                    </Box>
                    <PlanButton
                        variant="contained"
                        fullWidth
                        onClick={() => handlePlanSelect(plan)}
                    >
                        Choose {plan.name}
                    </PlanButton>
                </PricingCard>
            </Grid>
        ));
    };

    return (
        <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
            <Typography variant="h4" fontWeight={700} mb={3}>Billing & Payment</Typography>
            <Grid container spacing={3}>
                {/* Balance Section */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, mb: 2 }} elevation={2}>
                        <Typography variant="h6" fontWeight={600} gutterBottom>Balance</Typography>
                        <Typography variant="h4" color="primary" fontWeight={700}>TND 120.00</Typography>
                        <Typography variant="body2" color="textSecondary">Current available balance</Typography>
                        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleDialogOpen}>Add Balance</Button>
                    </Paper>
                </Grid>
                {/* Company Info Section */}
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 3, mb: 2 }} elevation={2}>
                        <Typography variant="h6" fontWeight={600} gutterBottom>Company Info</Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Typography variant="body1"><b>Name:</b> Example Corp</Typography>
                        <Typography variant="body1"><b>Address:</b> 123 Main St, City, Country</Typography>
                        <Typography variant="body1"><b>VAT Number:</b> 123456789</Typography>
                        <Typography variant="body1"><b>Email:</b> billing@example.com</Typography>
                    </Paper>
                </Grid>
                {/* Payment History Section */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 3 }} elevation={2}>
                        <Typography variant="h6" fontWeight={600} gutterBottom>Payment History</Typography>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Fees</TableCell>
                                        <TableCell>Forfait Type</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {paymentHistory.map((row, idx) => (
                                        <TableRow key={idx}>
                                            <TableCell>{row.date}</TableCell>
                                            <TableCell>{row.fees}</TableCell>
                                            <TableCell>{row.forfait}</TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={row.status}
                                                    color={row.status === 'Paid' ? 'success' : 'warning'}
                                                    size="small"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                {row.status === 'Pending' ? (
                                                    <Button variant="contained" color="primary" size="small" startIcon={<PaymentIcon />}>Pay</Button>
                                                ) : (
                                                    <Button variant="outlined" color="info" size="small" startIcon={<RefreshIcon />}>Refresh</Button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>

            {/* Add Balance Dialog with Pricing */}
            <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="lg" fullWidth>
                <DialogTitle sx={{ textAlign: 'center', fontSize: '2.8rem', fontWeight: 800, color: '#ffffff', mb: 2 }}>
                    Simple Plans That Scale With Your Growth
                </DialogTitle>
                <DialogContent sx={{ bgcolor: 'rgba(10, 10, 10, 0.95)', p: 3 }}>
                    {/* Billing Toggle */}
                    <ToggleContainer>
                        <ToggleLabel>Monthly</ToggleLabel>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={billingMode === 'yearly'}
                                    onChange={(e) => setBillingMode(e.target.checked ? 'yearly' : 'monthly')}
                                    sx={{
                                        '& .MuiSwitch-switchBase.Mui-checked': {
                                            color: '#667eea',
                                        },
                                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                            backgroundColor: '#667eea',
                                        },
                                    }}
                                />
                            }
                            label=""
                        />
                        <ToggleLabel>Yearly <small>(Save 20%)</small></ToggleLabel>
                    </ToggleContainer>

                    {/* Pricing Cards */}
                    <PricingGrid container spacing={3}>
                        {renderPricingCards()}
                    </PricingGrid>

                    <Typography sx={{ mt: 2, color: '#666', fontSize: '1rem', textAlign: 'center' }}>
                        💡 Not sure? Start with Free and upgrade anytime!
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ bgcolor: 'rgba(10, 10, 10, 0.95)', p: 2 }}>
                    <Button onClick={handleDialogClose} color="secondary">Cancel</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
} 