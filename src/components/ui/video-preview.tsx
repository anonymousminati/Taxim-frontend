"use client";

import React from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoPreviewProps {
  videoUrl?: string;
  onRender?: () => void;
  isRendering?: boolean;
  renderError?: string | null;
}

const VideoPreview = ({ 
  videoUrl, 
  onRender, 
  isRendering = false,
  renderError 
}: VideoPreviewProps) => {  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-3 border-b bg-gradient-to-r from-card/50 via-muted/30 to-card/50">
        <h3 className="font-semibold text-sm text-foreground">Animation Preview</h3>
        {onRender && (
          <Button 
            size="sm" 
            variant="outline"
            onClick={onRender}
            disabled={isRendering}
            className="border-border/50 hover:bg-muted/50"
          >
            {isRendering ? (
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-1" />
            ) : (
              <Play className="w-4 h-4 mr-1" />
            )}
            {isRendering ? 'Rendering...' : 'Render'}
          </Button>
        )}
      </div>
      {renderError && (
        <div className="p-3 bg-gradient-to-r from-destructive/10 to-destructive/5 border-b border-destructive/20">
          <p className="text-sm text-destructive">❌ {renderError}</p>
        </div>
      )}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-background via-card/20 to-background">
        {videoUrl ? (
          <div className="relative max-w-full max-h-full p-4">
            <video 
              controls 
              className="max-w-full max-h-full rounded-lg shadow-2xl border border-border/20"
              src={videoUrl}
            >
              <track kind="captions" srcLang="en" label="English captions" />
              Your browser does not support the video tag.
            </video>
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            {isRendering ? (
              <>
                <div className="w-16 h-16 mx-auto mb-4 border-4 border-primary border-t-transparent rounded-full animate-spin opacity-70" />
                <p className="text-lg font-medium text-foreground mb-2">Rendering animation...</p>
                <p className="text-sm">This may take a few moments</p>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-primary/70 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-primary/40 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
              </>
            ) : (
              <>
                <Play className="w-16 h-16 mx-auto mb-4 opacity-50 text-primary" />
                <p className="text-lg font-medium text-foreground mb-2">No animation to preview</p>
                <p className="text-sm">Write some Manim code and click Render</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPreview;
