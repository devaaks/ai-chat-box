import React, { useState, useEffect, useRef } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Paper,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Box,
  Fade,
  Divider,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/material/styles';
import { useOpenAI } from '../hooks/use-open-ai';
import parse from 'html-react-parser';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

const ChatContainer = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '90vh',
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  boxShadow: theme.shadows[5],
  width: '99vw',
}));

const MessagesContainer = styled(List)(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
}));

const UserMessage = styled(ListItem)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,
  alignSelf: 'flex-end',
  borderRadius: '15px 15px 0 15px',
  padding: theme.spacing(1.5),
  marginBottom: theme.spacing(1),
  maxWidth: '100%',
  animation: 'fadeIn 0.3s ease-in-out',
}));

const AIMessage = styled(ListItem)(({ theme }) => ({
  backgroundColor: theme.palette.grey[300],
  color: theme.palette.text.primary,
  alignSelf: 'flex-start',
  borderRadius: '15px 15px 15px 0',
  padding: theme.spacing(1.5),
  marginBottom: theme.spacing(1),
  maxWidth: '100%',
  animation: 'fadeIn 0.3s ease-in-out',
}));

const ChatApp: React.FC = () => {
  const openAI = useOpenAI();
  openAI.initializeOpenAI();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');

    const aiResponse = await openAI.getCompletion(input);
    setMessages((prevMessages) => [...prevMessages, { sender: 'ai', text: aiResponse }]);
  };

  return (
    <div style={{ padding: '2px', marginLeft: '2px' }}>
      <AppBar position="static" color="primary" elevation={3}>
        <Toolbar>
          <Typography variant="h6">LLM Chat</Typography>
        </Toolbar>
      </AppBar>

      <ChatContainer>
        <MessagesContainer>
          {messages.map((msg, index) => (
            <Fade in={true} timeout={500} key={index}>
              {msg.sender === 'user' ? (
                <UserMessage>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>U</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={msg.text} sx={{ whiteSpace: 'pre-wrap' }} />
                </UserMessage>
              ) : (
                <AIMessage>
                  <ListItemAvatar>
                    <Avatar>👧🏻</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={parse(msg.text)} />
                </AIMessage>
              )}
            </Fade>
          ))}
          <div ref={messagesEndRef} />
        </MessagesContainer>

        <Divider />

        <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSend();
                e.preventDefault();
              }
            }}
          />
          <IconButton color="primary" onClick={handleSend} sx={{ ml: 1 }}>
            <SendIcon />
          </IconButton>
        </Box>
      </ChatContainer>
    </div>
  );
};

export default ChatApp;
