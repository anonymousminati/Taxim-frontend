"use client";

import React from "react";
import { Copy, Download, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  onRender?: () => void;
  isRendering?: boolean;
  renderError?: string | null;
}

const CodeEditor = ({ 
  code, 
  onChange, 
  onRender, 
  isRendering = false,
  renderError 
}: CodeEditorProps) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleSave = () => {
    const element = document.createElement('a');
    const file = new Blob([code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `manim_animation_${Date.now()}.py`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-3 border-b bg-gradient-to-r from-card/50 via-muted/30 to-card/50">
        <h3 className="font-semibold text-sm text-foreground">Manim Code</h3>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={handleCopy} className="border-border/50 hover:bg-muted/50">
            <Copy className="w-4 h-4 mr-1" />
            Copy
          </Button>
          <Button size="sm" variant="outline" onClick={handleSave} className="border-border/50 hover:bg-muted/50">
            <Download className="w-4 h-4 mr-1" />
            Save
          </Button>
          {onRender && (
            <Button 
              size="sm" 
              onClick={onRender}
              disabled={isRendering || !code.trim()}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isRendering ? (
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-1" />
              ) : (
                <Play className="w-4 h-4 mr-1" />
              )}
              {isRendering ? 'Rendering...' : 'Render'}
            </Button>
          )}
        </div>
      </div>
      {renderError && (
        <div className="p-3 bg-gradient-to-r from-destructive/10 to-destructive/5 border-b border-destructive/20">
          <p className="text-sm text-destructive">❌ {renderError}</p>
        </div>
      )}
      <textarea
        value={code}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 p-4 font-mono text-sm bg-card/30 text-foreground border-0 resize-none focus:outline-none focus:bg-card/50 transition-colors placeholder:text-muted-foreground/60"
        placeholder="# Write your Manim code here
from manim import *

class MyAnimation(Scene):
    def construct(self):
        # Your animation code here
        circle = Circle()
        self.play(Create(circle))
        self.wait()"
      />
    </div>
  );
};

export default CodeEditor;
