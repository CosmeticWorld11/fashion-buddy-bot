
import React, { useRef, useEffect } from 'react';
import { useChat } from '@/hooks/useChat';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { Button } from '@/components/ui/button';
import { X, Maximize2, Minimize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatBotProps {
  initialOpen?: boolean;
}

const ChatBot: React.FC<ChatBotProps> = ({ initialOpen = false }) => {
  const { messages, isLoading, sendMessage } = useChat();
  const [isOpen, setIsOpen] = React.useState(initialOpen);
  const [isMinimized, setIsMinimized] = React.useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => {
    if (isMinimized) {
      setIsMinimized(false);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const toggleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(!isMinimized);
  };

  useEffect(() => {
    if (messagesEndRef.current && !isMinimized) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isMinimized, isOpen]);

  if (!isOpen) {
    return (
      <Button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg z-50 animate-fade-in transition-all hover:scale-105"
      >
        <span className="text-xl">💬</span>
      </Button>
    );
  }

  return (
    <div
      className={cn(
        'fixed bottom-6 right-6 z-50 transition-all duration-300 ease-in-out shadow-xl',
        'rounded-xl overflow-hidden chat-container border border-border',
        isMinimized ? 'w-64 h-12' : 'w-96 h-[550px]',
        'animate-fade-in'
      )}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between p-4 bg-background/50 backdrop-blur-md border-b border-border cursor-pointer"
        onClick={isMinimized ? toggleChat : undefined}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
          <h3 className="text-sm font-medium">Fashion Advisor</h3>
        </div>
        <div className="flex items-center gap-1">
          <Button
            size="icon"
            variant="ghost"
            className="w-6 h-6 rounded-full"
            onClick={toggleMinimize}
          >
            {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="w-6 h-6 rounded-full"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-background/20 to-background/10 backdrop-blur-sm" style={{ height: 'calc(550px - 120px)' }}>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            
            {isLoading && (
              <div className="flex items-start gap-3 mb-4 animate-slide-in">
                <div className="w-8 h-8 rounded-full bg-secondary border border-border shadow-sm flex items-center justify-center">
                  <span className="text-xs font-semibold">AI</span>
                </div>
                <div className="max-w-[80%]">
                  <div className="px-4 py-3 bg-secondary text-secondary-foreground rounded-2xl rounded-tl-sm shadow-sm">
                    <div className="flex items-center h-6">
                      <div className="dot-typing"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
        </>
      )}
    </div>
  );
};

export default ChatBot;
