import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const isGitHubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = {
  
  // Production optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  
  // GitHub Pages configuration
  ...(isGitHubPages && {
    output: 'export',
    trailingSlash: true,
    skipTrailingSlashRedirect: true,
    distDir: 'out',
    assetPrefix: isProd ? '/taxim/' : '',
    basePath: isProd ? '/taxim' : '',
  }),
  
  // Output configuration for different deployment types
  output: (() => {
    if (process.env.BUILD_STANDALONE === 'true') return 'standalone';
    if (isGitHubPages) return 'export';
    return undefined;
  })(),
  
  // Image optimization (disable for static export)
  images: {
    unoptimized: process.env.BUILD_STATIC === 'true' || isGitHubPages,
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
