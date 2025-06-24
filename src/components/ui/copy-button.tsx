"use client";

import { Button } from "@/components/ui/button";
import { Code } from "lucide-react";

interface CopyButtonProps {
  text: string;
}

export default function CopyButton({ text }: CopyButtonProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Button 
      size="sm" 
      variant="outline" 
      className="border-gray-600 text-gray-300 hover:bg-gray-800/50"
      onClick={handleCopy}
    >
      <Code className="w-4 h-4" />
    </Button>
  );
}
