import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './pages/Dashboard';
import SMS from './pages/SMS';
import Email from './pages/Email';
import Chatbot from './pages/Chatbot';
import ChatbotChannels from './pages/ChatbotChannels';
import ChatbotFAQ from './pages/ChatbotFAQ';
import ChatbotAI from './pages/ChatbotAI';
import ChatbotInbox from './pages/ChatbotInbox';
import ChatbotSettings from './pages/ChatbotSettings';
import Analytics from './pages/Analytics';
import Kanban from './pages/Kanban';
import Calendar from './pages/Calendar';
import Billing from './pages/Billing';
import ThemeDemo from './pages/ThemeDemo';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import LandingPage from './pages/LandingPage';
import { Box } from '@mui/material';
import { SMSStatsProvider } from './context/SMSStatsContext';
import { ThemeModeProvider } from './context/ThemeContext';

function AppContent() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const location = useLocation();

    // Hide sidebar/topbar on auth/landing pages
    const hideSidebar = ['/login', '/signup', '/'].includes(location.pathname);

    return (
        <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
            {!hideSidebar && <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />}
            <Box sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                ml: !hideSidebar ? { sm: `${sidebarOpen ? 280 : 80}px` } : 0,
                transition: 'margin-left 0.3s ease-in-out',
                width: !hideSidebar ? { sm: `calc(100% - ${sidebarOpen ? 280 : 80}px)` } : '100%',
            }}>
                {!hideSidebar && <TopBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} currentPage={''} />}
                <Box
                    className="main-content theme-transition"
                    sx={{
                        flex: 1,
                        overflow: 'auto',
                        p: 0,
                        mt: !hideSidebar ? { xs: '64px', sm: '72px' } : 0,
                        height: !hideSidebar ? { xs: 'calc(100vh - 64px)', sm: 'calc(100vh - 72px)' } : '100vh',
                        boxSizing: 'border-box',
                    }}
                >
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/dashboard" element={<Dashboard sidebarOpen={sidebarOpen} />} />
                        <Route path="/sms" element={<SMS />} />
                        <Route path="/email" element={<Email />} />
                        <Route path="/chatbot" element={<Chatbot />} />
                        <Route path="/chatbot/channels" element={<ChatbotChannels />} />
                        <Route path="/chatbot/faq" element={<ChatbotFAQ />} />
                        <Route path="/chatbot/ai" element={<ChatbotAI />} />
                        <Route path="/chatbot/inbox" element={<ChatbotInbox />} />
                        <Route path="/chatbot/settings" element={<ChatbotSettings />} />
                        <Route path="/analytics" element={<Analytics />} />
                        <Route path="/kanban" element={<Kanban />} />
                        <Route path="/calendar" element={<Calendar />} />
                        <Route path="/billing" element={<Billing />} />
                        <Route path="/theme-demo" element={<ThemeDemo />} />
                    </Routes>
                </Box>
            </Box>
        </Box>
    );
}

function App() {
    return (
        <ThemeModeProvider>
            <SMSStatsProvider>
                <Router>
                    <AppContent />
                </Router>
            </SMSStatsProvider>
        </ThemeModeProvider>
    );
}

export default App; 