"use client";

import React from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoPreviewProps {
  videoUrl?: string;
}

const VideoPreview = ({ videoUrl }: VideoPreviewProps) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-3 border-b bg-muted/30">
        <h3 className="font-semibold text-sm">Animation Preview</h3>
        <Button size="sm" variant="outline">
          <Play className="w-4 h-4 mr-1" />
          Render
        </Button>
      </div>      <div className="flex-1 flex items-center justify-center bg-black/5">
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
            <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>No animation to preview</p>
            <p className="text-sm">Write some Manim code and click Render</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPreview;
