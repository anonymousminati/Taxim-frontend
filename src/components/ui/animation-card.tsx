"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Play } from "lucide-react";
import CopyButton from "@/components/ui/copy-button";

interface AnimationExample {
  title: string;
  description: string;
  prompt: string;
  category: string;
  difficulty: string;
}

interface AnimationCardProps {
  example: AnimationExample;
}

export default function AnimationCard({ example }: AnimationCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-500/20 text-green-300 border-green-500/30";
      case "Intermediate": return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "Advanced": return "bg-red-500/20 text-red-300 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  const handleTryThis = () => {
    // Store prompt in localStorage for Manim Studio
    localStorage.setItem('taxim-copied-prompt', example.prompt);
    localStorage.setItem('taxim-copied-prompt-timestamp', Date.now().toString());
    
    console.log('Prompt stored for Manim Studio:', example.prompt);
  };

  return (
    <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm hover:bg-slate-900/70 transition-all duration-300 group">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-purple-300 font-medium">{example.category}</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(example.difficulty)}`}>
            {example.difficulty}
          </span>
        </div>
        <CardTitle className="text-white text-xl">{example.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300 mb-4">
          {example.description}
        </p>
        
        <div className="bg-slate-800/80 rounded-lg p-4 mb-4 border border-slate-600">
          <div className="text-xs text-gray-400 mb-2 font-medium">Prompt:</div>
          <code className="text-green-400 text-sm leading-relaxed">
            "{example.prompt}"
          </code>
        </div>        <div className="flex gap-2">
          <Link href="/manim-studio" className="flex-1">
            <Button 
              size="sm" 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm"
              onClick={handleTryThis}
            >
              <Play className="w-4 h-4 mr-2" />
              Try This
            </Button>
          </Link>
          <CopyButton text={example.prompt} />
        </div>
      </CardContent>
    </Card>
  );
}
