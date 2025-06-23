import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Production optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  
  // Output configuration for different deployment types
  output: process.env.BUILD_STANDALONE === 'true' ? 'standalone' : undefined,
  
  // Image optimization (disable for static export)
  images: {
    unoptimized: process.env.BUILD_STATIC === 'true',
  },
  
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-tabs'],
  },
  
  // Environment variables validation
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

export default nextConfig;
