"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import MainContent from "./main-content";
import MobileWarning from "./mobile-warning";
import { ChatMessageType } from "./chat-message";
import { api, handleApiError, createLoadingState, LoadingState } from "@/lib/api";

// Main Manim Studio Component
const ManimStudio = () => {
  // Generate unique session ID for this browser session
  const [sessionId] = useState(() => {
    return `frontend-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
  });

  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hello! I'm here to help you create amazing mathematical animations with Manim. What would you like to animate today?\n\n*Session ID: ${sessionId}*`,
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
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code');

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
    setLoadingState({ isLoading: true, error: null });    try {
      // Generate animation from prompt with unique session ID
      const response = await api.generateAnimation(currentPrompt, sessionId);
        // Debug logging to verify new code is received
      const debugClassMatch = /class\s+(\w+)\s*\(/.exec(response.code);
      console.log(`[Session ${sessionId}] New code received:`, {
        codeLength: response.code.length,
        preview: response.code.substring(0, 100) + '...',
        className: debugClassMatch?.[1] ?? 'Unknown'
      });
      
      // Update code editor with generated code (potentially fixed)
      setManimCode(response.code);
      
      // Set video URL for preview
      const fullVideoUrl = api.getVideoUrl(response.videoFileName);
      setVideoUrl(fullVideoUrl);

      // Automatically switch to preview tab when video is ready
      setActiveTab('preview');      // Create detailed success message with metadata
      const classMatch = /class\s+(\w+)\s*\(/.exec(response.code);
      const className = classMatch?.[1] ?? 'Unknown';
      let successMessage = `✅ Great! I've generated a Manim animation for "${currentPrompt}".`;
      
      // Add code info
      successMessage += `\n\n📝 **Generated Code Info:**`;
      successMessage += `\n• Class Name: \`${className}\``;
      successMessage += `\n• Code Length: ${response.code.length} characters`;
      successMessage += `\n• Session ID: \`${sessionId.substring(0, 16)}...\``;
      
      if (response.metadata) {
        const { generationAttempts, wasCodeFixed, wasImproved, renderingAttempts } = response.metadata;
        
        if (wasCodeFixed || wasImproved) {
          successMessage += '\n\n🔧 **Code Improvements Made:**';
          if (wasCodeFixed) {
            successMessage += `\n• Fixed compilation errors (${generationAttempts} attempts)`;
          }
          if (wasImproved) {
            successMessage += '\n• Enhanced code for better rendering';
          }
          if (renderingAttempts > 1) {
            successMessage += `\n• Rendering succeeded after ${renderingAttempts} attempts`;
          }
        }
      }
      
      successMessage += '\n\nThe animation is now playing in the Preview tab! You can modify the code and re-render if needed.';

      const aiResponse: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: successMessage,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      
    } catch (error) {
      const errorMessage = handleApiError(error);
      const aiResponse: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `❌ Sorry, I encountered an error while generating the animation: ${errorMessage}. Please try again with a simpler prompt or check your backend connection.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    } finally {
      setLoadingState({ isLoading: false, error: null });
    }
  };

  const handleRenderAnimation = async () => {
    if (!manimCode.trim() || renderingState.isLoading) return;
    
    setRenderingState({ isLoading: true, error: null });    try {
      // Render the current code with session ID
      const response = await api.renderAnimation(manimCode, sessionId);
      
      // Update code if it was fixed during rendering
      if (response.code && response.code !== manimCode) {
        setManimCode(response.code);
      }
      
      // Set video URL for preview
      const fullVideoUrl = api.getVideoUrl(response.videoFileName);
      setVideoUrl(fullVideoUrl);

      // Automatically switch to preview tab
      setActiveTab('preview');

      // Create detailed success message
      let successMessage = '🎬 Animation rendered successfully!';
      
      if (response.metadata) {
        const { wasCodeFixed, wasImproved, renderingAttempts } = response.metadata;
        
        if (wasCodeFixed || wasImproved) {
          successMessage += '\n\n🔧 **Code Improvements Made:**';
          if (wasCodeFixed) {
            successMessage += '\n• Fixed compilation errors automatically';
          }
          if (wasImproved) {
            successMessage += '\n• Enhanced code for better rendering';
          }
          if (renderingAttempts > 1) {
            successMessage += `\n• Rendering succeeded after ${renderingAttempts} attempts`;
          }
          successMessage += '\n\nThe updated code is now in the editor.';
        }
      }
      
      successMessage += '\n\nYou can now view the animation in the Preview tab!';

      const successMessageObj: ChatMessageType = {
        id: Date.now().toString(),
        role: 'assistant',
        content: successMessage,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, successMessageObj]);
      
    } catch (error) {
      const errorMessage = handleApiError(error);
      const aiResponse: ChatMessageType = {
        id: Date.now().toString(),
        role: 'assistant',
        content: `❌ Error rendering animation: ${errorMessage}. I tried to fix common issues automatically, but you may need to review the code manually.`,
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
    <div className="h-full flex bg-gradient-to-br from-background via-background to-muted/20">
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
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
};

export default ManimStudio;