"use client";

import { Button } from "@/components/ui/button";
import { CopyIcon, Check } from "lucide-react";
import { useState } from "react";

interface CopyButtonProps {
  text: string;
}

export default function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    
    // Store in localStorage for Manim Studio
    localStorage.setItem('taxim-copied-prompt', text);
    localStorage.setItem('taxim-copied-prompt-timestamp', Date.now().toString());
    
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    
    // Optional: Show a toast message (can be enhanced later)
    console.log('Prompt copied and saved for Manim Studio:', text);
  };
  return (
    <Button 
      size="sm" 
      variant="outline" 
      className="border-gray-600 text-gray-300 hover:bg-gray-800/50 transition-all duration-200"
      onClick={handleCopy}
      title={copied ? "Copied!" : "Copy prompt for Manim Studio"}
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-400" />
      ) : (
        <CopyIcon className="w-4 h-4" />
      )}
    </Button>
  );
}
