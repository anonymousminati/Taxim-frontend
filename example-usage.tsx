// Example: Using the API service in a React component
import { useState } from 'react';
import { api, handleApiError, GenerateResponse } from '@/lib/api';

export default function ManimStudio() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GenerateResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Generate animation using your API
      const response = await api.generateAnimation(prompt);
      setResult(response);
      
      // The video URL will be automatically constructed
      const videoUrl = api.getVideoUrl(response.videoFileName);
      console.log('Video URL:', videoUrl);
      
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleHealthCheck = async () => {
    try {
      const health = await api.healthCheck();
      console.log('Backend health:', health);
    } catch (err) {
      console.error('Backend is not running:', handleApiError(err));
    }
  };

  return (
    <div className="p-6">
      <h1>Manim Studio</h1>
      
      {/* Health Check */}
      <button 
        onClick={handleHealthCheck}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Check Backend Status
      </button>
      
      {/* Input */}
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe your animation..."
        className="w-full p-3 border rounded mb-4"
        rows={4}
      />
      
      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={isLoading || !prompt.trim()}
        className="px-6 py-2 bg-green-500 text-white rounded disabled:opacity-50"
      >
        {isLoading ? 'Generating...' : 'Generate Animation'}
      </button>
      
      {/* Error Display */}
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          Error: {error}
        </div>
      )}
      
      {/* Result Display */}
      {result && (
        <div className="mt-6">
          <h3>Generated Animation:</h3>
          <video 
            src={api.getVideoUrl(result.videoFileName)} 
            controls 
            className="w-full max-w-md mt-2"
          >
            Your browser does not support the video tag.
          </video>
          
          <details className="mt-4">
            <summary>Generated Code</summary>
            <pre className="bg-gray-100 p-4 rounded mt-2 overflow-x-auto">
              <code>{result.code}</code>
            </pre>
          </details>
        </div>
      )}
    </div>
  );
}
