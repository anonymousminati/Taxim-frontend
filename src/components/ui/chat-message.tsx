"use client";

import React from "react";
import { Bot, User } from "lucide-react";

// Utility function
function cn(...inputs: (string | undefined | null | boolean)[]): string {
  return inputs.filter(Boolean).join(' ');
}

// Types
interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Chat Message Component
const ChatMessage = ({ message }: { message: ChatMessage }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={cn("flex gap-3 mb-4", isUser ? "justify-end" : "justify-start")}>
      <div className={cn("flex gap-3 max-w-[80%]", isUser ? "flex-row-reverse" : "flex-row")}>
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border",
          isUser 
            ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-primary/20" 
            : "bg-gradient-to-br from-muted to-muted/80 border-border/50"
        )}>
          {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-primary" />}
        </div>        <div className={cn(
          "rounded-lg p-3 text-sm border backdrop-blur-sm",
          isUser 
            ? "bg-gradient-to-br from-primary to-primary/90 text-primary-foreground border-primary/20 shadow-lg" 
            : "bg-gradient-to-br from-card to-card/80 text-foreground border-border/50 shadow-sm"
        )}>
          <p className="whitespace-pre-wrap">{message.content}</p>          <div className={cn(
            "text-xs mt-1",
            isUser ? "opacity-70" : "opacity-60 text-muted-foreground"
          )}>
            {message.timestamp.toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
export type { ChatMessage as ChatMessageType };
