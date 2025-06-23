"use client";

import React, { useState } from "react";
import Sidebar from "./sidebar";
import MainContent from "./main-content";
import MobileWarning from "./mobile-warning";
import { ChatMessageType } from "./chat-message";

// Main Manim Studio Component
const ManimStudio = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m here to help you create amazing mathematical animations with Manim. What would you like to animate today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [manimCode, setManimCode] = useState(`from manim import *

class MyAnimation(Scene):
    def construct(self):
        # Create a simple circle animation
        circle = Circle(radius=1, color=BLUE)
        square = Square(side_length=2, color=RED)
        
        # Add objects to scene
        self.add(circle)
        
        # Animate transformation
        self.play(Transform(circle, square))
        self.wait(1)`);
  const [videoUrl, setVideoUrl] = useState<string>();

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: ChatMessageType = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I can help you with that! Here's a Manim code example for "${inputMessage}". You can modify it in the code editor and render it to see the animation.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Check if screen is mobile (less than 768px)
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Show mobile warning on small screens
  if (isMobile) {
    return <MobileWarning />;
  }

  return (
    <div className="h-full flex bg-background">
      <Sidebar 
        messages={messages}
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        onSendMessage={handleSendMessage}
        onKeyPress={handleKeyPress}
      />
      
      <MainContent 
        manimCode={manimCode}
        setManimCode={setManimCode}
        videoUrl={videoUrl}
      />
    </div>
  );
};

export default ManimStudio;