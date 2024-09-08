// src/components/ChatWindow.tsx
import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

interface ChatWindowProps {
  messages: ChatMessage[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
  return (
    <Box
      height="400px"
      overflow="auto"
      p={2}
      border={1}
      borderColor="grey.300"
      borderRadius={2}
      sx={{ backgroundColor: '#f5f5f5' }}
    >
      {messages.map((msg, index) => (
        <Paper
          key={index}
          sx={{
            padding: 2,
            marginBottom: 2,
            alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
            backgroundColor: msg.sender === 'user' ? '#e0f7fa' : '#e1bee7',
          }}
        >
          <Typography variant="body1">{msg.text}</Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default ChatWindow;
