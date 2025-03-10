
import { useState, useEffect, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';

export type Message = {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
};

export type ChatState = {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
};

// Updated API URL to use gemini-2.0-flash as specified in the user's request
const API_KEY = 'AIzaSyCznpxXJOb4zPeU3aSxGFL3si7MtbbPYTs';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export const useChat = () => {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null,
  });

  // Generate a unique ID for each message
  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };

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
          content: "How can I help with your fashion or cosmetic questions today?",
          role: 'assistant',
          timestamp: new Date(),
        }
      ],
      error: null,
    }));
  }, []);

  // Process the AI response to make it more concise and customer support-like
  const simplifyResponse = (response: string): string => {
    // Remove any lengthy introductions
    let simplified = response.replace(/^(Hello!|Hi there!|Greetings!|Sure,|Of course,|Certainly,)[^.]*\./i, '');
    
    simplified = simplified.replace(/(I'd be happy to|I'd love to|I'd be glad to|I can certainly|Let me|I'm happy to) (help|assist|provide|explain|address)[^.]*\./gi, '');
    
    simplified = simplified.replace(/(Is there anything else|Do you have any other questions|Let me know if you need|Feel free to ask)[^.]*\.$/gi, '');
    
    simplified = simplified.replace(/(let me explain|to explain|I'll explain|as you know|as you may know|it's worth noting that|it's important to note that)[^.]*\./gi, '');
    
    simplified = simplified.replace(/(I think|I believe|in my opinion|from my perspective)[^.]*\./gi, '');
    
    simplified = simplified.replace(/\*\s+/g, '• ');
    
    simplified = simplified.replace(/\*\*(.*?)\*\*/g, '$1');
    simplified = simplified.replace(/\*(.*?)\*/g, '$1');
    
    simplified = simplified.trim();
    
    if (simplified.length > 0) {
      simplified = simplified.charAt(0).toUpperCase() + simplified.slice(1);
    }
    
    if (simplified.length < 20 && simplified.length > 0) {
      simplified += " Can I help with anything specific about this?";
    }
    
    return simplified;
  };

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
      console.log("Sending message to Gemini API...");
      
      const contextualizedMessage = `As a fashion and cosmetics support assistant, provide a brief, helpful response to: ${message}`;
      
      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: contextualizedMessage }]
            }
          ],
          generation_config: {
            temperature: 0.5,
            top_k: 40,
            top_p: 0.95,
            max_output_tokens: 300,
          },
          safety_settings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        }),
      });

      console.log("Response status:", response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error("API error details:", errorData);
        throw new Error(`API request failed with status ${response.status}: ${errorData?.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      console.log("API response data:", data);
      
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        const botResponse = data.candidates[0].content.parts[0].text;
        const simplifiedResponse = simplifyResponse(botResponse);
        addMessage(simplifiedResponse, 'assistant');
      } else {
        throw new Error('Invalid response format from API');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setChatState((prevState) => ({
        ...prevState,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      }));
      toast({
        title: 'Error',
        description: 'Sorry, we are having trouble connecting. Please try again in a moment.',
        variant: 'destructive',
      });
    } finally {
      setChatState((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }
  }, [addMessage]);

  // Initialize with a simplified welcome message
  useEffect(() => {
    if (chatState.messages.length === 0) {
      addMessage(
        "How can I help with your fashion or cosmetic questions today?",
        'assistant'
      );
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
