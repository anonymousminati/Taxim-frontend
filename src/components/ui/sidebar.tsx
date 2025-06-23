"use client";

import React, { useRef, useEffect } from "react";
import { Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ChatMessage, { ChatMessageType } from "./chat-message";

interface SidebarProps {
  messages: ChatMessageType[];
  inputMessage: string;
  setInputMessage: (message: string) => void;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  isLoading?: boolean;
}

const Sidebar = ({ 
  messages, 
  inputMessage, 
  setInputMessage, 
  onSendMessage, 
  onKeyPress,
  isLoading = false
}: SidebarProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (    <div className="w-2/7 border-r flex flex-col bg-card/50">
      <div className="p-4 border-b bg-gradient-to-r from-card via-muted/20 to-card">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-primary animate-pulse" />
          <h2 className="font-semibold text-foreground">Manim Assistant</h2>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Ask me anything about creating animations
        </p>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}        {isLoading && (
          <div className="mb-4 p-3 rounded-lg bg-gradient-to-r from-muted/30 to-muted/50 border border-dashed border-primary/30">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-primary/70 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-2 h-2 bg-primary/40 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
              <span className="ml-2">Generating animation...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
        {/* Input */}
      <div className="p-4 border-t bg-gradient-to-t from-card/30 to-transparent">
        <div className="flex gap-2">
          <Textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={onKeyPress}
            placeholder="Ask about Manim animations..."
            className="flex-1 min-h-[40px] max-h-[120px] bg-input/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 resize-none"
            rows={1}
            disabled={isLoading}
          />
          <Button 
            onClick={onSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            size="sm"
            className="shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
