import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft, Sparkles, Zap, Code, Brain, Palette, Shield, Users, Clock, Download } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features - Taxim AI Mathematical Animations",
  description: "Discover all the powerful features of Taxim. AI-powered animation generation, advanced LaTeX support, and much more.",
};

export default function FeaturesPage() {
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
          <Button variant="ghost" className="text-purple-300 bg-purple-500/10">
            Features
          </Button>
          <Link href="/examples">
            <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-slate-800/50 transition-all duration-200">
              Examples
            </Button>
          </Link>
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
              Powerful Features
            </span>
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            Everything you need to create stunning mathematical animations with AI assistance
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* AI-Powered Generation */}
          <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm hover:bg-slate-900/70 transition-all duration-300 group">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-white text-xl">AI-Powered Generation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">
                Advanced AI understands natural language descriptions and generates precise Manim code automatically.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Natural language processing</li>
                <li>• Context-aware code generation</li>
                <li>• Intelligent error correction</li>
              </ul>
            </CardContent>
          </Card>

          {/* LaTeX Support */}
          <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm hover:bg-slate-900/70 transition-all duration-300 group">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Code className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-white text-xl">Advanced LaTeX</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">
                Complete LaTeX support with intelligent error handling and progressive fallback strategies.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Complex mathematical expressions</li>
                <li>• Automatic error detection</li>
                <li>• Progressive error recovery</li>
              </ul>
            </CardContent>
          </Card>

          {/* Lightning Fast */}
          <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm hover:bg-slate-900/70 transition-all duration-300 group">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-white text-xl">Lightning Fast</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">
                Optimized rendering pipeline ensures your animations are generated quickly and efficiently.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Sub-5 second generation</li>
                <li>• Parallel processing</li>
                <li>• Smart caching system</li>
              </ul>
            </CardContent>
          </Card>

          {/* Visual Studio */}
          <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm hover:bg-slate-900/70 transition-all duration-300 group">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-white text-xl">Visual Studio</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">
                Intuitive web-based interface for creating, editing, and previewing your mathematical animations.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Real-time preview</li>
                <li>• Code editor with syntax highlighting</li>
                <li>• Interactive controls</li>
              </ul>
            </CardContent>
          </Card>

          {/* Error Handling */}
          <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm hover:bg-slate-900/70 transition-all duration-300 group">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-white text-xl">Robust Error Handling</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">
                Advanced error detection and recovery system ensures your animations always render successfully.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Progressive error recovery</li>
                <li>• User-friendly explanations</li>
                <li>• Automatic fallback strategies</li>
              </ul>
            </CardContent>
          </Card>

          {/* Community */}
          <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm hover:bg-slate-900/70 transition-all duration-300 group">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-white text-xl">Community Driven</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">
                Built by educators, for educators. Join thousands of creators sharing knowledge and animations.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Example library</li>
                <li>• Community templates</li>
                <li>• Educational resources</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Technical Features */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Technical Capabilities</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-slate-900/30 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-purple-400" />
                  Performance Optimizations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-gray-300">
                <div>• Session-based conversation memory</div>
                <div>• Intelligent code caching</div>
                <div>• Parallel rendering pipeline</div>
                <div>• Automatic media cleanup</div>
                <div>• Resource usage monitoring</div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/30 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Download className="w-5 h-5 mr-2 text-pink-400" />
                  Export & Integration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-gray-300">
                <div>• High-quality MP4 export</div>
                <div>• Custom resolution support</div>
                <div>• Python code download</div>
                <div>• API access for developers</div>
                <div>• Batch processing capabilities</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Experience These Features?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Start creating beautiful mathematical animations today with all these powerful features at your fingertips.
          </p>
          <Link href="/manim-studio">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-10 py-5 text-xl group shadow-xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
              Try Taxim Now
              <Sparkles className="ml-3 w-6 h-6" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
