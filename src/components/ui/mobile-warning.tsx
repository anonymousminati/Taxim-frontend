"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const MobileWarning = () => {
  return (
    <div className="h-screen flex items-center justify-center p-6 bg-background">
      <Card className="max-w-md w-full">
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
            <MessageCircle className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Desktop Experience Required</h2>
          <p className="text-muted-foreground mb-4">
            Manim Studio is optimized for tablets and desktop computers to provide the best coding and animation experience.
          </p>
          <p className="text-sm text-muted-foreground">
            Please access this application on a device with a larger screen for the full experience.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MobileWarning;
