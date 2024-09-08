// src/App.tsx
import React, { useState, useEffect } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { Subscription } from 'rxjs';
import ChatWindow from './chat/component/chatWindow';
import ChatInput from './chat/component/chatInput';
import { generateStream } from './chat/service/chatService';

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  const handleSendMessage = (message: string) => {
    // Añadir el mensaje del usuario al chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'user', text: message },
    ]);

    // Limpiar cualquier suscripción previa
    subscription?.unsubscribe();

    // Suscribirse al flujo de mensajes generados por el bot usando RxJS
    const newSubscription = generateStream(message).subscribe({
      next: (botMessage: string) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'bot', text: botMessage },
        ]);
      },
      error: (error) => {
        console.error('Error streaming message:', error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'bot', text: 'Error retrieving response' },
        ]);
      },
      complete: () => {
        console.log('Stream complete');
      },
    });

    setSubscription(newSubscription);
  };

  // Cleanup: cancelar suscripciones al desmontar el componente
  useEffect(() => {
    return () => subscription?.unsubscribe();
  }, [subscription]);

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          ChatGPT-like Application with RxJS
        </Typography>
        <ChatWindow messages={messages} />
        <ChatInput onSendMessage={handleSendMessage} />
      </Box>
    </Container>
  );
};

export default App;

