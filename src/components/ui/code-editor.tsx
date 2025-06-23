"use client";

import React from "react";
import { Copy, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
}

const CodeEditor = ({ code, onChange }: CodeEditorProps) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-3 border-b bg-muted/30">
        <h3 className="font-semibold text-sm">Manim Code</h3>
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            <Copy className="w-4 h-4 mr-1" />
            Copy
          </Button>
          <Button size="sm" variant="outline">
            <Download className="w-4 h-4 mr-1" />
            Save
          </Button>
        </div>
      </div>
      <textarea
        value={code}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 p-4 font-mono text-sm bg-background border-0 resize-none focus:outline-none"
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
