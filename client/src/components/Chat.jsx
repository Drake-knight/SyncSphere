import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import api from '../utils/axios'; 
import { Container, TextField, Button, List, ListItem, ListItemText, Paper, Typography, Divider } from '@mui/material';

const socket = io('http://localhost:5100', {
    transports: ['websocket'],
});

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [workspaceId, setWorkspaceId] = useState('');
    const endOfMessagesRef = useRef(null);

    useEffect(() => {
        const storedWorkspaceId = localStorage.getItem('selectedWorkspaceId');
        if (storedWorkspaceId) {
            setWorkspaceId(storedWorkspaceId);
        } else {
            console.error('No workspaceId found in local storage.');
        }
    }, []);

    useEffect(() => {
        if (!workspaceId) return;

        const fetchMessages = async () => {
            try {
                const response = await api.get('/messages', {
                    params: { workspace: workspaceId },
                });
                setMessages(response.data.messages);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();

        socket.emit('joinWorkspace', workspaceId);

        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off('message');
        };
    }, [workspaceId]);

    useEffect(() => {
        if (endOfMessagesRef.current) {
            endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleSendMessage = async () => {
        if (message.trim()) {
            const newMessage = {
                content: message,
                workspace: workspaceId,
            };
            try {
                await api.post('/messages', newMessage);
                setMessage(''); 
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    return (
        <Container maxWidth="md" style={{ display: 'flex', flexDirection: 'column', height: '60vh', backgroundColor: '#0B051D' }}>
            <Paper style={{ flex: '1', display: 'flex', flexDirection: 'column', overflowY: 'auto', padding: '5px', backgroundColor: '#343849', border: '1px solid #4A5FBD' }}>
                <Typography variant="h6" gutterBottom style={{ backgroundColor: '#4A5FBD', color: 'white', padding: '5px', borderRadius: '4px' }}>
                    Chats
                </Typography>
                <Divider style={{ marginBottom: '10px' }} />
                <List style={{ flexGrow: 1, overflowY: 'auto' }}>
                    {messages.map((msg, index) => (
                        <ListItem key={index} style={{ padding: '6px', backgroundColor: '#4A5FBD', borderRadius: '5px', marginBottom: '3px', wordBreak: 'break-word', maxWidth: '100%' }}>
                            <ListItemText
                                primary={<strong style={{ fontSize: '0.9rem', maxWidth: '80%', wordBreak: 'break-word' }}>{msg.sender?.name || 'Unknown'}</strong>}
                                secondary={
                                    <span style={{ fontSize: '0.8rem', whiteSpace: 'pre-wrap', maxWidth: '80%', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                                        {msg.content}
                                    </span>
                                }
                            />
                        </ListItem>
                    ))}
                    <div ref={endOfMessagesRef} />
                </List>
            </Paper>
            <div style={{ display: 'flex', padding: '10px', backgroundColor: '#343849', border: '1px solid #4A5FBD', color:'white' }}>
                <TextField
                    variant="outlined"
                    fullWidth
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleSendMessage();
                        }
                    }}
                    placeholder="Type a message..."
                    style={{ marginRight: '10px', color: 'white', borderColor: '#4A5FBD' }}
                    InputProps={{ style: { color: 'white' } }} 
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSendMessage}
                >
                    Send
                </Button>
            </div>
        </Container>
    );
};

export default Chat;
