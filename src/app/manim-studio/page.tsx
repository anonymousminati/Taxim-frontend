import ManimStudio from "@/components/ui/manim-studio";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manim Studio - Create Mathematical Animations",
  description: "AI-powered Manim animation creator. Generate beautiful mathematical animations with Python and Manim.",
};

export default function ManimStudioPage() {
  return <ManimStudio />;
}
