import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Code } from "lucide-react";
import AutoPlayVideoPlayer from "@/components/ui/auto-play-video-player";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 relative z-10">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Taxim
          </span>
        </div>
          <div className="flex items-center space-x-4">
          <Link href="/features">
            <Button variant="ghost" className="text-gray-300 hover:text-white">
              Features
            </Button>
          </Link>
          <Link href="/examples">
            <Button variant="ghost" className="text-gray-300 hover:text-white">
              Examples
            </Button>
          </Link>
          <Link href="/docs">
            <Button variant="ghost" className="text-gray-300 hover:text-white">
              Docs
            </Button>
          </Link>
          <Link href="/manim-studio">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium">
              Open Studio
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 pt-20 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Mathematical Animations
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Create Beautiful
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-300 bg-clip-text text-transparent">
              Math Animations
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            Transform complex mathematical concepts into stunning visual animations with the power of AI and Manim. 
            No coding experience required.
          </p>
            <div className="flex flex-col items-center gap-8 mb-16">
            <Link href="/manim-studio">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-4 text-lg group">
                Start Creating
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            
            {/* Demo Video Section */}
            <div className="w-full max-w-2xl">
              <h3 className="text-center text-lg text-gray-300 mb-4">
                🎬 Watch Bubble Sort Algorithm Animation
              </h3>              <AutoPlayVideoPlayer 
                src="/DemoVideo.mp4"
                className="rounded-xl border border-slate-700 shadow-2xl"
                poster="/demo-poster.jpg"
              />
              <p className="text-center text-sm text-gray-400 mt-2">
                Auto-plays when scrolled into view • Created with Taxim
              </p>
            </div>
          </div>
        </div>

        {/* Feature Preview */}
        <div className="relative max-w-6xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl"></div>
          <Card className="relative bg-slate-900/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-white">
                    From Idea to Animation in Seconds
                  </h2>
                  <p className="text-gray-300 text-lg">
                    Simply describe your mathematical concept, and our AI will generate beautiful Manim animations. 
                    Perfect for educators, students, and content creators.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span className="text-gray-300">Natural language input</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                      <span className="text-gray-300">Advanced LaTeX support</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span className="text-gray-300">Instant video generation</span>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                  <div className="text-sm text-gray-400 mb-2">Example prompt:</div>
                  <div className="bg-slate-900 rounded p-4 mb-4 border border-slate-600">
                    <code className="text-green-400 text-sm">
                      "Create an animation showing the Pythagorean theorem with a right triangle and squares on each side"
                    </code>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <span>Generated in 3.2 seconds</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <Card className="bg-slate-900/30 border-slate-700 backdrop-blur-sm hover:bg-slate-900/50 transition-colors">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">AI-Powered</h3>
              <p className="text-gray-300">
                Leveraging advanced AI to understand your mathematical concepts and generate precise animations.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/30 border-slate-700 backdrop-blur-sm hover:bg-slate-900/50 transition-colors">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Manim Integration</h3>
              <p className="text-gray-300">
                Built on top of Manim, the industry-standard mathematical animation engine used by 3Blue1Brown.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/30 border-slate-700 backdrop-blur-sm hover:bg-slate-900/50 transition-colors">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Lightning Fast</h3>
              <p className="text-gray-300">
                Advanced error handling and optimization ensure your animations render quickly and reliably.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Bring Math to Life?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of educators and creators who are already using Taxim to create engaging mathematical content.
          </p>
          <Link href="/manim-studio">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-4 text-lg group">
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Taxim
              </span>
            </div>
            <div className="flex items-center space-x-6 text-gray-400">
              <span className="text-sm">© 2025 Taxim. All rights reserved.</span>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  Privacy
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  Terms
                </Button>                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <Code className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
