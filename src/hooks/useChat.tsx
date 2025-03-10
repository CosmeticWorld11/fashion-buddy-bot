
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
      addMessage(simplifiedResponse, 'assistant');
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
  }, [addMessage]);

  // Initialize with a welcome message
  useEffect(() => {
    if (chatState.messages.length === 0) {
      addMessage(WELCOME_MESSAGE, 'assistant');
    }
  }, [addMessage, chatState.messages.length]);

  return {
    messages: chatState.messages,
    isLoading: chatState.isLoading,
    error: chatState.error,
    sendMessage,
    resetMessages,
  };
};
