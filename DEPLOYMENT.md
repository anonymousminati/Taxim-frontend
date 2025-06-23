# Frontend Deployment Guide

## Prerequisites
- Node.js 18+ for building
- Your backend API URL

## Build Configuration

1. **Update API endpoint for production:**
   Create or update `frontend/src/lib/api.ts`:
   ```typescript
   const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
   ```

2. **Create environment file:**
   ```bash
   # .env.local (for local development)
   NEXT_PUBLIC_API_URL=http://localhost:3001
   
   # .env.production (for production)
   NEXT_PUBLIC_API_URL=https://your-backend-domain.com
   ```

## Deployment Options

### Option 1: Vercel (Recommended for Next.js)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Set environment variables in Vercel dashboard:**
   - `NEXT_PUBLIC_API_URL=https://your-backend-url.com`

4. **Automatic deployments:**
   - Connect your GitHub repo to Vercel
   - Auto-deploy on push to main branch

### Option 2: Netlify

1. **Build the project:**
   ```bash
   npm run build
   npm run export  # if using static export
   ```

2. **Deploy to Netlify:**
   - Upload `out/` folder to Netlify
   - Or connect GitHub repo for auto-deployment

3. **Environment variables in Netlify:**
   - Set `NEXT_PUBLIC_API_URL` in Netlify dashboard

### Option 3: Railway

1. **Create railway.json:**
   ```json
   {
     "build": {
       "command": "npm run build"
     },
     "deploy": {
       "command": "npm start"
     }
   }
   ```

2. **Deploy:**
   ```bash
   railway init
   railway add
   railway deploy
   ```

### Option 4: Static Export (for CDN/S3)

1. **Configure for static export in `next.config.ts`:**
   ```typescript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'export',
     trailingSlash: true,
     images: {
       unoptimized: true
     }
   };
   
   export default nextConfig;
   ```

2. **Build and export:**
   ```bash
   npm run build
   ```

3. **Deploy the `out/` folder to:**
   - AWS S3 + CloudFront
   - GitHub Pages
   - Any static hosting service

### Option 5: Docker Deployment

1. **Create Dockerfile:**
   ```dockerfile
   FROM node:18-alpine AS builder
   
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   
   COPY . .
   RUN npm run build
   
   FROM node:18-alpine AS runner
   WORKDIR /app
   
   ENV NODE_ENV production
   
   RUN addgroup --system --gid 1001 nodejs
   RUN adduser --system --uid 1001 nextjs
   
   COPY --from=builder /app/public ./public
   COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
   COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
   
   USER nextjs
   
   EXPOSE 3000
   
   ENV PORT 3000
   
   CMD ["node", "server.js"]
   ```

2. **Build and run:**
   ```bash
   docker build -t manim-frontend .
   docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=https://your-backend.com manim-frontend
   ```

## Environment Variables

Set these in your deployment platform:

```bash
# Required: Backend API URL
NEXT_PUBLIC_API_URL=https://your-backend-domain.com

# Optional: Analytics, monitoring, etc.
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

## Build Optimization

1. **Enable compression:**
   ```javascript
   // next.config.ts
   const nextConfig = {
     compress: true,
     poweredByHeader: false,
     generateEtags: false,
   };
   ```

2. **Bundle analysis:**
   ```bash
   npm install --save-dev @next/bundle-analyzer
   ANALYZE=true npm run build
   ```

## Domain Setup

1. **Configure custom domain** in your hosting platform
2. **Update CORS settings** in backend to allow your domain
3. **SSL certificate** (usually automatic with modern platforms)

## Performance Recommendations

1. **Enable Next.js Image Optimization** (if not using static export)
2. **Use CDN** for static assets
3. **Enable caching headers**
4. **Monitor Core Web Vitals**

## Important Notes

1. **API URL:** Must match your backend deployment URL
2. **CORS:** Backend must allow requests from your frontend domain
3. **HTTPS:** Use HTTPS in production for security
4. **Environment Variables:** Use `NEXT_PUBLIC_` prefix for client-side variables
