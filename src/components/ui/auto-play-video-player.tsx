"use client";

import { useRef, useEffect, useState } from "react";
import { Play, Pause, VideoOff } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AutoPlayVideoPlayerProps {
  readonly src: any;
  readonly className?: string;
  readonly poster?: string;
}

export default function AutoPlayVideoPlayer({ src, className = "", poster }: AutoPlayVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Intersection Observer to detect when video is in viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        
        if (entry.isIntersecting) {
          // Auto-play when in view
          video.play().then(() => {
            setIsPlaying(true);
          }).catch((error) => {
            console.log("Auto-play failed:", error);
          });
        } else {
          // Pause when out of view
          video.pause();
          setIsPlaying(false);
        }
      },
      {
        threshold: 0.5, // Trigger when 50% of video is visible
      }
    );

    observer.observe(video);    // Video event listeners
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleError = () => setHasError(true);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('error', handleError);

    return () => {
      observer.disconnect();
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('error', handleError);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch((error) => {
        console.log("Play failed:", error);
      });
    }
  };
  return (
    <div className={`relative group ${className}`}>
      {hasError ? (
        // Error fallback when video fails to load
        <div className="w-full h-64 bg-slate-800 rounded-lg flex flex-col items-center justify-center border border-slate-700">
          <VideoOff className="w-16 h-16 text-gray-500 mb-4" />
          <div className="text-gray-400 text-lg font-medium mb-2">Demo Video Coming Soon</div>
          <div className="text-gray-500 text-sm text-center max-w-md">
            We're preparing an amazing bubble sort algorithm animation to showcase here. 
            In the meantime, try creating your own animations!
          </div>
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            className="w-full h-full rounded-lg shadow-lg"
            loop
            muted
            playsInline
            preload="metadata"
          />
          
          {/* Custom Controls Overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
            <Button
              onClick={togglePlay}
              size="lg"
              className="bg-black/50 hover:bg-black/70 text-white border-none backdrop-blur-sm shadow-lg"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8" />
              ) : (
                <Play className="w-8 h-8 ml-1" />
              )}
            </Button>
          </div>

          {/* Loading indicator */}
          {!isInView && (
            <div className="absolute inset-0 bg-slate-800 rounded-lg flex items-center justify-center">
              <div className="text-gray-400 text-sm">Video will auto-play when in view</div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
