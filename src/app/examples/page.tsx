import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Metadata } from "next";
import AnimationCard from "@/components/ui/animation-card";

export const metadata: Metadata = {
  title: "Examples - Taxim AI Mathematical Animations",
  description: "Explore example mathematical animations created with Taxim. From basic algebra to advanced calculus.",
};

export default function ExamplesPage() {
  const examples = [
    {
      title: "Pythagorean Theorem",
      description: "Visual proof of a² + b² = c² with animated squares",
      prompt: "Create an animation showing the Pythagorean theorem with a right triangle and squares on each side",
      category: "Geometry",
      difficulty: "Beginner"
    },
    {
      title: "Derivative Visualization",
      description: "Show how derivatives represent rate of change",
      prompt: "Animate the concept of derivatives by showing a tangent line moving along a curve",
      category: "Calculus",
      difficulty: "Intermediate"
    },
    {
      title: "Bubble Sort Algorithm",
      description: "Step-by-step visualization of the bubble sort algorithm",
      prompt: "Create an animation showing bubble sort algorithm with colored bars",
      category: "Algorithms",
      difficulty: "Beginner"
    },
    {
      title: "Fourier Series",
      description: "Complex Fourier series decomposition animation",
      prompt: "Show how a square wave can be approximated using Fourier series with rotating vectors",
      category: "Advanced Math",
      difficulty: "Advanced"
    },
    {
      title: "Matrix Multiplication",
      description: "Visual representation of matrix operations",
      prompt: "Animate matrix multiplication showing how rows and columns combine",
      category: "Linear Algebra",
      difficulty: "Intermediate"
    },
    {
      title: "Prime Number Spiral",
      description: "Ulam spiral showing prime number patterns",
      prompt: "Create the Ulam spiral animation highlighting prime numbers in a spiral pattern",
      category: "Number Theory",
      difficulty: "Intermediate"
    }  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 relative z-10 bg-slate-950/50 backdrop-blur-sm border-b border-slate-800/50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <Link href="/">
            <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent cursor-pointer">
              Taxim
            </span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-6">
          <Link href="/features">
            <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-slate-800/50 transition-all duration-200">
              Features
            </Button>
          </Link>
          <Button variant="ghost" className="text-purple-300 bg-purple-500/10">
            Examples
          </Button>
          <Link href="/docs">
            <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-slate-800/50 transition-all duration-200">
              Docs
            </Button>
          </Link>
          <Link href="/manim-studio">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium transition-all duration-200 shadow-lg hover:shadow-purple-500/25">
              Open Studio
            </Button>
          </Link>
        </div>
      </nav>

      {/* Header */}
      <div className="container mx-auto px-6 pt-16 pb-12">
        <Link href="/">
          <Button variant="ghost" className="mb-8 text-gray-300 hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
        
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Animation Examples
            </span>
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            Get inspired by these mathematical animations created with Taxim. Copy the prompts and try them yourself!
          </p>
        </div>        {/* Examples Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {examples.map((example) => (
            <AnimationCard key={example.title} example={example} />
          ))}
        </div>        {/* Tips Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="bg-slate-900/30 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-2xl text-center">💡 Tips for Better Prompts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-semibold mb-2">Be Specific</h4>
                  <p className="text-sm">Include details about colors, movements, and mathematical concepts you want to visualize.</p>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Use Mathematical Terms</h4>
                  <p className="text-sm">Reference specific theorems, formulas, or mathematical objects for better results.</p>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Describe the Animation</h4>
                  <p className="text-sm">Mention how objects should move, transform, or interact with each other.</p>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Keep It Focused</h4>
                  <p className="text-sm">One main concept per animation works better than trying to explain multiple topics.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Create Your Own?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Use these examples as inspiration and start creating your own mathematical animations.
          </p>
          <Link href="/manim-studio">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-10 py-5 text-xl group shadow-xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
              Start Creating
              <Sparkles className="ml-3 w-6 h-6" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
