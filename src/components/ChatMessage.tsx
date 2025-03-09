
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Message } from '@/hooks/useChat';
import { Avatar } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const messageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const isUser = message.role === 'user';
  const formattedTime = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  }).format(message.timestamp);

  return (
    <div 
      ref={messageRef}
      className={cn(
        'flex items-start gap-3 mb-4 animate-slide-in',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      {!isUser && (
        <Avatar className="w-8 h-8 bg-secondary border border-border shadow-sm">
          <span className="text-xs font-semibold">AI</span>
        </Avatar>
      )}
      
      <div className={cn('max-w-[80%]', isUser ? 'order-1' : 'order-2')}>
        <Card 
          className={cn(
            'px-4 py-3 shadow-sm',
            isUser 
              ? 'bg-primary text-primary-foreground rounded-2xl rounded-tr-sm' 
              : 'bg-secondary text-secondary-foreground rounded-2xl rounded-tl-sm'
          )}
        >
          <div className="text-sm whitespace-pre-wrap">
            {message.content}
          </div>
        </Card>
        <div className={cn(
          'text-xs text-muted-foreground mt-1',
          isUser ? 'text-right' : 'text-left'
        )}>
          {formattedTime}
        </div>
      </div>
      
      {isUser && (
        <Avatar className="w-8 h-8 bg-accent order-2 border border-border shadow-sm">
          <span className="text-xs font-semibold">You</span>
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;
