
import { useState, useEffect, useCallback } from 'react';
import { ChatState, Message } from './chat/types';
import { sendMessageToAPI, handleApiError } from './chat/api';
import { generateId, simplifyResponse, WELCOME_MESSAGE } from './chat/messageUtils';

export type { Message, ChatState };

export const useChat = () => {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null,
    isTyping: false,
  });

  // Add a message to the chat
  const addMessage = useCallback((content: string, role: 'user' | 'assistant') => {
    setChatState((prevState) => ({
      ...prevState,
      messages: [
        ...prevState.messages,
        {
          id: generateId(),
          content,
          role,
          timestamp: new Date(),
        },
      ],
    }));
  }, []);

  // Reset messages to initial state
  const resetMessages = useCallback(() => {
    setChatState((prevState) => ({
      ...prevState,
      messages: [
        {
          id: generateId(),
          content: WELCOME_MESSAGE,
          role: 'assistant',
          timestamp: new Date(),
        }
      ],
      error: null,
    }));
  }, []);

  // Simulate typing animation for assistant messages
  const simulateTyping = useCallback(async (message: string) => {
    setChatState((prevState) => ({
      ...prevState,
      isTyping: true,
    }));

    // Create a temporary message with empty content that will be filled gradually
    const messageId = generateId();
    setChatState((prevState) => ({
      ...prevState,
      messages: [
        ...prevState.messages,
        {
          id: messageId,
          content: '',
          role: 'assistant',
          timestamp: new Date(),
        },
      ],
    }));

    // Split the message into characters for typing animation
    const characters = message.split('');
    
    // Gradually add characters to simulate typing
    let currentText = '';
    for (let i = 0; i < characters.length; i++) {
      currentText += characters[i];
      
      setChatState((prevState) => ({
        ...prevState,
        messages: prevState.messages.map(msg => 
          msg.id === messageId
            ? { ...msg, content: currentText }
            : msg
        ),
      }));
      
      // Random delay between 15-45ms for a more natural typing effect
      await new Promise(resolve => setTimeout(resolve, Math.random() * 30 + 15));
    }
    
    setChatState((prevState) => ({
      ...prevState,
      isTyping: false,
    }));
  }, []);

  // Send a message to the API
  const sendMessage = useCallback(async (message: string) => {
    // Add user message to state
    addMessage(message, 'user');
    
    setChatState((prevState) => ({
      ...prevState,
      isLoading: true,
      error: null,
    }));

    try {
      const botResponse = await sendMessageToAPI(message);
      const simplifiedResponse = simplifyResponse(botResponse);
      // Instead of immediately adding the message, simulate typing
      await simulateTyping(simplifiedResponse);
    } catch (error) {
      const errorMessage = handleApiError(error);
      setChatState((prevState) => ({
        ...prevState,
        error: errorMessage,
      }));
    } finally {
      setChatState((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }
  }, [addMessage, simulateTyping]);

  // Initialize with a welcome message
  useEffect(() => {
    if (chatState.messages.length === 0) {
      addMessage(WELCOME_MESSAGE, 'assistant');
    }
  }, [addMessage, chatState.messages.length]);

  return {
    messages: chatState.messages,
    isLoading: chatState.isLoading,
    isTyping: chatState.isTyping,
    error: chatState.error,
    sendMessage,
    resetMessages,
  };
};
