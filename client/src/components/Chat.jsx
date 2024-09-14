import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import api from '../utils/axios'; 
import { Container, TextField, Button, List, ListItem, ListItemText, Paper } from '@mui/material';

const socket = io('http://localhost:5000', {
    transports: ['websocket'],
});

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [workspaceId, setWorkspaceId] = useState('');

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
        <Container maxWidth="sm" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Paper style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
                <List>
                    {messages.map((msg, index) => (
                        <ListItem key={index}>
                            <ListItemText
                                primary={`${msg.sender?.name || 'Unknown'}`}
                                secondary={msg.content}
                            />
                        </ListItem>
                    ))}
                </List>
            </Paper>
            <div style={{ display: 'flex', padding: '10px' }}>
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
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSendMessage}
                    style={{ marginLeft: '10px' }}
                >
                    Send
                </Button>
            </div>
        </Container>
    );
};

export default Chat;
