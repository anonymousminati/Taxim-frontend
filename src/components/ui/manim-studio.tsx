"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import MainContent from "./main-content";
import MobileWarning from "./mobile-warning";
import { ChatMessageType } from "./chat-message";
import { api, handleApiError, createLoadingState, LoadingState } from "@/lib/api";

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
  const [loadingState, setLoadingState] = useState<LoadingState>(createLoadingState());
  const [renderingState, setRenderingState] = useState<LoadingState>(createLoadingState());

  // Check backend status on component mount
  useEffect(() => {
    checkBackendStatus();
  }, []);

  const checkBackendStatus = async () => {
    try {
      await api.healthCheck();
      const status = await api.getStatus();
      
      if (!status.requirements.allRequirementsMet) {
        const warningMessage: ChatMessageType = {
          id: Date.now().toString(),
          role: 'assistant',
          content: `⚠️ System Requirements Check:\n\n${status.recommendations.join('\n')}\n\nPlease ensure all requirements are installed for the best experience.`,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, warningMessage]);
      }
    } catch (error) {
      const errorMessage: ChatMessageType = {
        id: Date.now().toString(),
        role: 'assistant',
        content: `❌ Unable to connect to backend server. Please ensure the backend is running on the correct port. Error: ${handleApiError(error)}`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || loadingState.isLoading) return;

    const newMessage: ChatMessageType = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    const currentPrompt = inputMessage;
    setInputMessage('');
    
    // Set loading state
    setLoadingState({ isLoading: true, error: null });

    try {
      // Generate animation from prompt
      const response = await api.generateAnimation(currentPrompt);
      
      // Update code editor with generated code
      setManimCode(response.code);
      
      // Set video URL for preview
      const fullVideoUrl = api.getVideoUrl(response.videoFileName);
      setVideoUrl(fullVideoUrl);

      // Add success message
      const aiResponse: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `✅ Great! I've generated a Manim animation for "${currentPrompt}". The code has been updated in the editor and the animation is ready to preview. You can modify the code and re-render if needed.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      
    } catch (error) {
      const errorMessage = handleApiError(error);
      const aiResponse: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `❌ Sorry, I encountered an error while generating the animation: ${errorMessage}. Please try again or check your backend connection.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    } finally {
      setLoadingState({ isLoading: false, error: null });
    }
  };

  const handleRenderAnimation = async () => {
    if (!manimCode.trim() || renderingState.isLoading) return;
    
    setRenderingState({ isLoading: true, error: null });

    try {
      // Render the current code
      const response = await api.renderAnimation(manimCode);
      
      // Set video URL for preview
      const fullVideoUrl = api.getVideoUrl(response.videoFileName);
      setVideoUrl(fullVideoUrl);

      // Add success message
      const successMessage: ChatMessageType = {
        id: Date.now().toString(),
        role: 'assistant',
        content: '🎬 Animation rendered successfully! You can now view it in the Preview tab.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, successMessage]);
      
    } catch (error) {
      const errorMessage = handleApiError(error);
      const aiResponse: ChatMessageType = {
        id: Date.now().toString(),
        role: 'assistant',
        content: `❌ Error rendering animation: ${errorMessage}. Please check your code and try again.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setRenderingState({ isLoading: false, error: errorMessage });
      return;
    }
    
    setRenderingState({ isLoading: false, error: null });
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Check if screen is mobile (less than 768px)
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
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
        isLoading={loadingState.isLoading}
      />
      
      <MainContent 
        manimCode={manimCode}
        setManimCode={setManimCode}
        videoUrl={videoUrl}
        onRender={handleRenderAnimation}
        isRendering={renderingState.isLoading}
        renderError={renderingState.error}
      />
    </div>
  );
};

export default ManimStudio;