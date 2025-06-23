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
}

const MainContent = ({ 
  manimCode, 
  setManimCode, 
  videoUrl, 
  onRender, 
  isRendering = false,
  renderError 
}: MainContentProps) => {
  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b bg-muted/30">
        <h1 className="text-2xl font-bold">Manim Studio</h1>
        <p className="text-muted-foreground">Create beautiful mathematical animations with Python</p>
      </div>
      
      <div className="flex-1">
        <Tabs defaultValue="code" className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-2 mx-4 mt-4">
            <TabsTrigger value="code" className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              Code
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Preview
            </TabsTrigger>
          </TabsList>
            <TabsContent value="code" className="flex-1 m-4 mt-2">
            <Card className="h-full">
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
            <Card className="h-full">
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
