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
      <div className="flex items-center justify-between p-3 border-b bg-muted/30">
        <h3 className="font-semibold text-sm">Animation Preview</h3>
        {onRender && (
          <Button 
            size="sm" 
            variant="outline"
            onClick={onRender}
            disabled={isRendering}
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
        <div className="p-3 bg-destructive/10 border-b border-destructive/20">
          <p className="text-sm text-destructive">❌ {renderError}</p>
        </div>
      )}      <div className="flex-1 flex items-center justify-center bg-black/5">
        {videoUrl ? (
          <video 
            controls 
            className="max-w-full max-h-full"
            src={videoUrl}
          >
            <track kind="captions" srcLang="en" label="English captions" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="text-center text-muted-foreground">
            {isRendering ? (
              <>
                <div className="w-16 h-16 mx-auto mb-4 border-4 border-primary border-t-transparent rounded-full animate-spin opacity-50" />
                <p>Rendering animation...</p>
                <p className="text-sm">This may take a few moments</p>
              </>
            ) : (
              <>
                <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>No animation to preview</p>
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
