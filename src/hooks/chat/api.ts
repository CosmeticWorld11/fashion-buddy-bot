
import { Message } from './types';
import { toast } from '@/hooks/use-toast';

// API configuration constants
const API_KEY = 'AIzaSyCznpxXJOb4zPeU3aSxGFL3si7MtbbPYTs';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// Sends a message to the Gemini API and returns the response
export async function sendMessageToAPI(message: string): Promise<string> {
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
    return data.candidates[0].content.parts[0].text;
  } else {
    throw new Error('Invalid response format from API');
  }
}

// Handles API error and shows a toast notification
export function handleApiError(error: unknown): string {
  console.error('Error sending message:', error);
  const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
  
  toast({
    title: 'Error',
    description: 'Sorry, we are having trouble connecting. Please try again in a moment.',
    variant: 'destructive',
  });
  
  return errorMessage;
}
