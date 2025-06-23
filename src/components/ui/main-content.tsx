"use client";

import React from "react";
import { Code, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CodeEditor from "./code-editor";
import VideoPreview from "./video-preview";

interface MainContentProps {
  manimCode: string;
  setManimCode: (code: string) => void;
  videoUrl?: string;
  onRender?: () => void;
  isRendering?: boolean;
  renderError?: string | null;
  activeTab?: 'code' | 'preview';
  onTabChange?: (tab: 'code' | 'preview') => void;
}

const MainContent = ({ 
  manimCode, 
  setManimCode, 
  videoUrl, 
  onRender, 
  isRendering = false,
  renderError,
  activeTab = 'code',
  onTabChange
}: MainContentProps) => {
  return (    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b bg-gradient-to-r from-background via-muted/20 to-background">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
          Manim Studio
        </h1>
        <p className="text-muted-foreground">Create beautiful mathematical animations with Python</p>
      </div>
        <div className="flex-1">        <Tabs value={activeTab} onValueChange={(value) => onTabChange?.(value as 'code' | 'preview')} className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-2 mx-4 mt-4 bg-muted/30 border border-border/50">
            <TabsTrigger value="code" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Code className="w-4 h-4" />
              Code
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Eye className="w-4 h-4" />
              Preview
              {videoUrl && (
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse ml-1 shadow-sm shadow-green-400/50" />
              )}
            </TabsTrigger>
          </TabsList>            <TabsContent value="code" className="flex-1 m-4 mt-2">
            <Card className="h-full border-border/50 bg-gradient-to-br from-card to-card/80 shadow-lg">
              <CodeEditor 
                code={manimCode} 
                onChange={setManimCode}
                onRender={onRender}
                isRendering={isRendering}
                renderError={renderError}
              />
            </Card>
          </TabsContent>
          
          <TabsContent value="preview" className="flex-1 m-4 mt-2">
            <Card className="h-full border-border/50 bg-gradient-to-br from-card to-card/80 shadow-lg">
              <VideoPreview 
                videoUrl={videoUrl}
                onRender={onRender}
                isRendering={isRendering}
                renderError={renderError}
              />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MainContent;
