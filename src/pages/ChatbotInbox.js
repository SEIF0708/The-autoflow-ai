import React, { useState } from 'react';
import {
    Typography,
    Box,
    Card,
    CardContent,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Badge,
    IconButton
} from '@mui/material';
import {
    Instagram,
    WhatsApp,
    Facebook,
    MusicNote,
    Send,
    Person,
    Settings
} from '@mui/icons-material';

export default function ChatbotInbox() {
    const [selectedChat, setSelectedChat] = useState(null);
    const [chats] = useState([
        { id: 1, name: 'John Doe', platform: 'Instagram', lastMessage: 'How do I reset my password?', time: '2 min ago', unread: true, status: 'online' },
        { id: 2, name: 'Jane Smith', platform: 'WhatsApp', lastMessage: 'What are your business hours?', time: '5 min ago', unread: false, status: 'offline' },
        { id: 3, name: 'Mike Johnson', platform: 'Facebook', lastMessage: 'Thanks for the help!', time: '1 hour ago', unread: false, status: 'online' }
    ]);

    const [messages] = useState([
        { id: 1, sender: 'user', text: 'How do I reset my password?', time: '2:30 PM', type: 'user' },
        { id: 2, sender: 'bot', text: 'Click on "Forgot Password" and follow the instructions.', time: '2:31 PM', type: 'ai' },
        { id: 3, sender: 'user', text: 'I can\'t find that option', time: '2:32 PM', type: 'user' },
        { id: 4, sender: 'bot', text: 'Let me help you locate it. Look for the "Sign In" page...', time: '2:33 PM', type: 'faq' }
    ]);

    const getPlatformIcon = (platform) => {
        switch (platform) {
            case 'Instagram': return <Instagram />;
            case 'WhatsApp': return <WhatsApp />;
            case 'Facebook': return <Facebook />;
            case 'TikTok': return <MusicNote />;
            default: return null;
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box mb={3}>
                <Typography variant="h4" fontWeight={700} mb={1}>
                    Chat Inbox
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Manage incoming messages from all connected platforms
                </Typography>
            </Box>

            <Box display="flex" height="600px" gap={2}>
                {/* Left Panel - Chat List */}
                <Card sx={{ width: 300, flexShrink: 0 }}>
                    <CardContent sx={{ p: 0 }}>
                        <Box p={2} borderBottom={1} borderColor="divider">
                            <Typography variant="h6" fontWeight={600}>
                                Conversations
                            </Typography>
                        </Box>
                        <List sx={{ p: 0 }}>
                            {chats.map((chat) => (
                                <ListItem
                                    key={chat.id}
                                    button
                                    selected={selectedChat?.id === chat.id}
                                    onClick={() => setSelectedChat(chat)}
                                    sx={{
                                        borderBottom: 1,
                                        borderColor: 'divider',
                                        '&.Mui-selected': {
                                            backgroundColor: 'primary.main',
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: 'primary.dark',
                                            }
                                        }
                                    }}
                                >
                                    <ListItemAvatar>
                                        <Badge
                                            color="success"
                                            variant="dot"
                                            invisible={chat.status === 'offline'}
                                        >
                                            <Avatar>
                                                <Person />
                                            </Avatar>
                                        </Badge>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Box display="flex" alignItems="center" gap={1}>
                                                <Typography variant="body2" fontWeight={600}>
                                                    {chat.name}
                                                </Typography>
                                                {getPlatformIcon(chat.platform)}
                                            </Box>
                                        }
                                        secondary={
                                            <Box>
                                                <Typography variant="body2" noWrap>
                                                    {chat.lastMessage}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {chat.time}
                                                </Typography>
                                            </Box>
                                        }
                                    />
                                    {chat.unread && (
                                        <Badge badgeContent="New" color="primary" />
                                    )}
                                </ListItem>
                            ))}
                        </List>
                    </CardContent>
                </Card>

                {/* Right Panel - Chat Window */}
                <Card sx={{ flexGrow: 1 }}>
                    <CardContent sx={{ p: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
                        {selectedChat ? (
                            <>
                                {/* Chat Header */}
                                <Box p={2} borderBottom={1} borderColor="divider">
                                    <Box display="flex" alignItems="center" justifyContent="space-between">
                                        <Box display="flex" alignItems="center" gap={2}>
                                            <Avatar>
                                                <Person />
                                            </Avatar>
                                            <Box>
                                                <Typography variant="h6" fontWeight={600}>
                                                    {selectedChat.name}
                                                </Typography>
                                                <Box display="flex" alignItems="center" gap={1}>
                                                    {getPlatformIcon(selectedChat.platform)}
                                                    <Typography variant="body2" color="text.secondary">
                                                        {selectedChat.platform}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box display="flex" gap={1}>
                                            <IconButton size="small">
                                                <Person />
                                            </IconButton>
                                            <IconButton size="small">
                                                <Settings />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                </Box>

                                {/* Messages */}
                                <Box flexGrow={1} p={2} sx={{ overflowY: 'auto' }}>
                                    {messages.map((message) => (
                                        <Box
                                            key={message.id}
                                            display="flex"
                                            justifyContent={message.sender === 'user' ? 'flex-end' : 'flex-start'}
                                            mb={2}
                                        >
                                            <Box
                                                sx={{
                                                    maxWidth: '70%',
                                                    p: 1.5,
                                                    borderRadius: 2,
                                                    backgroundColor: message.sender === 'user'
                                                        ? 'primary.main'
                                                        : message.type === 'ai'
                                                            ? 'success.light'
                                                            : 'grey.100',
                                                    color: message.sender === 'user' ? 'white' : 'text.primary'
                                                }}
                                            >
                                                <Typography variant="body2">
                                                    {message.text}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                                                    {message.time}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>

                                {/* Message Input */}
                                <Box p={2} borderTop={1} borderColor="divider">
                                    <Box display="flex" gap={1}>
                                        <TextField
                                            fullWidth
                                            placeholder="Type a message..."
                                            size="small"
                                        />
                                        <Button variant="contained" startIcon={<Send />}>
                                            Send
                                        </Button>
                                    </Box>
                                </Box>
                            </>
                        ) : (
                            <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                                <Typography variant="body1" color="text.secondary">
                                    Select a conversation to start chatting
                                </Typography>
                            </Box>
                        )}
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
} 