import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft, Sparkles, Book, Code, Lightbulb, AlertCircle, CheckCircle } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation - Taxim AI Mathematical Animations",
  description: "Complete guide to using Taxim. Learn how to create amazing mathematical animations with AI assistance.",
};

export default function DocsPage() {
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
          <Link href="/examples">
            <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-slate-800/50 transition-all duration-200">
              Examples
            </Button>
          </Link>
          <Button variant="ghost" className="text-purple-300 bg-purple-500/10">
            Docs
          </Button>
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
              Documentation
            </span>
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            Everything you need to know to create amazing mathematical animations with Taxim
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm sticky top-8">
              <CardHeader>
                <CardTitle className="text-white text-lg">Quick Navigation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <a href="#getting-started" className="block text-purple-300 hover:text-purple-200 transition-colors">Getting Started</a>
                <a href="#writing-prompts" className="block text-gray-300 hover:text-white transition-colors">Writing Prompts</a>
                <a href="#advanced-features" className="block text-gray-300 hover:text-white transition-colors">Advanced Features</a>
                <a href="#troubleshooting" className="block text-gray-300 hover:text-white transition-colors">Troubleshooting</a>
                <a href="#api-reference" className="block text-gray-300 hover:text-white transition-colors">API Reference</a>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-12">
            
            {/* Getting Started */}
            <section id="getting-started">
              <Card className="bg-slate-900/30 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white text-2xl flex items-center">
                    <Book className="w-6 h-6 mr-3 text-purple-400" />
                    Getting Started
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 text-gray-300">
                  <div>
                    <h3 className="text-white text-lg font-semibold mb-3">1. Open the Studio</h3>
                    <p>Click "Open Studio" in the navigation to access the Taxim animation creator.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-white text-lg font-semibold mb-3">2. Describe Your Animation</h3>
                    <p>Type a natural language description of the mathematical concept you want to animate.</p>
                    <div className="bg-slate-800/80 rounded-lg p-4 mt-2 border border-slate-600">
                      <code className="text-green-400 text-sm">
                        "Create an animation showing a circle being transformed into a square"
                      </code>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-white text-lg font-semibold mb-3">3. Generate & Preview</h3>
                    <p>Click "Generate Animation" and watch as Taxim creates your mathematical animation in seconds.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-white text-lg font-semibold mb-3">4. Refine & Download</h3>
                    <p>If needed, provide feedback to improve the animation, then download your video or code.</p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Writing Prompts */}
            <section id="writing-prompts">
              <Card className="bg-slate-900/30 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white text-2xl flex items-center">
                    <Lightbulb className="w-6 h-6 mr-3 text-yellow-400" />
                    Writing Effective Prompts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 text-gray-300">
                  
                  <div>
                    <h3 className="text-white text-lg font-semibold mb-3 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                      Best Practices
                    </h3>
                    <ul className="space-y-2 ml-4">
                      <li>• Be specific about mathematical objects (circle, triangle, parabola)</li>
                      <li>• Describe the desired animation (rotate, scale, transform, move)</li>
                      <li>• Mention colors or visual properties when relevant</li>
                      <li>• Reference specific mathematical concepts or theorems</li>
                      <li>• Keep prompts focused on one main idea</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-white text-lg font-semibold mb-3">Good Examples</h3>
                    <div className="space-y-3">
                      <div className="bg-slate-800/80 rounded-lg p-4 border border-slate-600">
                        <code className="text-green-400 text-sm">
                          "Show the derivative of x² by animating the tangent line sliding along the parabola"
                        </code>
                      </div>
                      <div className="bg-slate-800/80 rounded-lg p-4 border border-slate-600">
                        <code className="text-green-400 text-sm">
                          "Create a visualization of the Pythagorean theorem with a right triangle and animated squares on each side"
                        </code>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-white text-lg font-semibold mb-3 flex items-center">
                      <AlertCircle className="w-5 h-5 mr-2 text-red-400" />
                      What to Avoid
                    </h3>
                    <ul className="space-y-2 ml-4">
                      <li>• Vague descriptions like "show me math"</li>
                      <li>• Multiple complex concepts in one prompt</li>
                      <li>• Requests for specific programming syntax</li>
                      <li>• Non-mathematical content</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Advanced Features */}
            <section id="advanced-features">
              <Card className="bg-slate-900/30 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white text-2xl flex items-center">
                    <Code className="w-6 h-6 mr-3 text-blue-400" />
                    Advanced Features
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 text-gray-300">
                  
                  <div>
                    <h3 className="text-white text-lg font-semibold mb-3">LaTeX Support</h3>
                    <p className="mb-3">Taxim supports complex LaTeX mathematical expressions:</p>
                    <div className="bg-slate-800/80 rounded-lg p-4 border border-slate-600">                      <code className="text-green-400 text-sm">
                        "Animate the equation \\frac{`{d}`}{`{dx}`} x^2 = 2x using LaTeX formatting"
                      </code>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-white text-lg font-semibold mb-3">Session Memory</h3>
                    <p>Taxim remembers your conversation context and can build upon previous animations within the same session.</p>
                  </div>

                  <div>
                    <h3 className="text-white text-lg font-semibold mb-3">Error Recovery</h3>
                    <p>Advanced error handling automatically fixes common issues and provides user-friendly explanations when problems occur.</p>
                  </div>

                  <div>
                    <h3 className="text-white text-lg font-semibold mb-3">Code Export</h3>
                    <p>Download the generated Python/Manim code to further customize your animations or use them in your own projects.</p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Troubleshooting */}
            <section id="troubleshooting">
              <Card className="bg-slate-900/30 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white text-2xl flex items-center">
                    <AlertCircle className="w-6 h-6 mr-3 text-orange-400" />
                    Troubleshooting
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 text-gray-300">
                  
                  <div>
                    <h3 className="text-white text-lg font-semibold mb-3">Animation Won't Generate</h3>
                    <ul className="space-y-2 ml-4">
                      <li>• Try simplifying your prompt</li>
                      <li>• Check if your description is mathematical in nature</li>
                      <li>• Refresh the page and try again</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-white text-lg font-semibold mb-3">LaTeX Errors</h3>
                    <ul className="space-y-2 ml-4">
                      <li>• Taxim will automatically attempt to fix LaTeX syntax errors</li>
                      <li>• If errors persist, try describing the math in plain English</li>
                      <li>• Use simpler mathematical notation when possible</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-white text-lg font-semibold mb-3">Slow Generation</h3>
                    <ul className="space-y-2 ml-4">
                      <li>• Complex animations may take longer to generate</li>
                      <li>• Server load can affect generation times</li>
                      <li>• Try breaking complex requests into simpler parts</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* API Reference */}
            <section id="api-reference">
              <Card className="bg-slate-900/30 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white text-2xl flex items-center">
                    <Code className="w-6 h-6 mr-3 text-purple-400" />
                    API Reference
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 text-gray-300">
                  
                  <div>
                    <h3 className="text-white text-lg font-semibold mb-3">Base URL</h3>
                    <div className="bg-slate-800/80 rounded-lg p-4 border border-slate-600">
                      <code className="text-blue-400 text-sm">
                        http://localhost:3001/api/manim
                      </code>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-white text-lg font-semibold mb-3">Generate Animation</h3>
                    <div className="space-y-3">
                      <div className="bg-slate-800/80 rounded-lg p-4 border border-slate-600">
                        <div className="text-green-400 text-sm mb-2">POST /generate</div>
                        <code className="text-gray-300 text-xs">
                          {JSON.stringify({
                            prompt: "Create a circle animation",
                            sessionId: "optional-session-id"
                          }, null, 2)}
                        </code>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-white text-lg font-semibold mb-3">Health Check</h3>
                    <div className="bg-slate-800/80 rounded-lg p-4 border border-slate-600">
                      <code className="text-green-400 text-sm">
                        GET /health
                      </code>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Creating?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Now that you know how to use Taxim, start creating your own mathematical animations.
          </p>
          <Link href="/manim-studio">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-10 py-5 text-xl group shadow-xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
              Open Studio
              <Sparkles className="ml-3 w-6 h-6" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
