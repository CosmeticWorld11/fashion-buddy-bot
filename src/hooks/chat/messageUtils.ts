
// Generate a unique ID for each message
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

// Process the AI response to make it more concise and customer support-like
export function simplifyResponse(response: string): string {
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
}

// Initial welcome message
export const WELCOME_MESSAGE = "How can I help with your fashion or cosmetic questions today?";
