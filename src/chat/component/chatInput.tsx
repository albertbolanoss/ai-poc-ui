import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage(''); // Limpiar el input después de enviar
    }
  };

  return (
    <Box display="flex" gap={2} mt={2}>
      <TextField
        variant="outlined"
        fullWidth
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        label="Type a message"
      />
      <Button variant="contained" onClick={handleSend}>
        Send
      </Button>
    </Box>
  );
};

export default ChatInput;
