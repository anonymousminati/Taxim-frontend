"use client";

import React, { useRef } from "react";
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
}

const Sidebar = ({ 
  messages, 
  inputMessage, 
  setInputMessage, 
  onSendMessage, 
  onKeyPress 
}: SidebarProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-80 border-r flex flex-col">
      <div className="p-4 border-b bg-muted/30">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-primary" />
          <h2 className="font-semibold">Manim Assistant</h2>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Ask me anything about creating animations
        </p>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={onKeyPress}
            placeholder="Ask about Manim animations..."
            className="flex-1 min-h-[40px] max-h-[120px]"
            rows={1}
          />
          <Button 
            onClick={onSendMessage}
            disabled={!inputMessage.trim()}
            size="sm"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
