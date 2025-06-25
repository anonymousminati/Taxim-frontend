# Taxim Manim Studio - Frontend

> **AI-Powered Mathematical Animation Creator**

Create stunning mathematical animations using natural language prompts! Taxim Manim Studio provides an intuitive web interface for generating [Manim](https://www.manim.community/) animations through AI assistance.

## 🌟 Features

### Core Functionality
- **Natural Language Animation Generation**: Describe your animation in plain English
- **Real-time Code Editor**: Edit and customize generated Manim code
- **Live Preview**: Instant video rendering and playback
- **Chat Interface**: Conversational AI assistant for guidance
- **Session Management**: Persistent sessions for improved context

### User Experience
- **Modern UI**: Clean, responsive design with dark theme
- **Mobile Warning**: Optimized for desktop development workflow
- **Real-time Feedback**: Loading states and error handling
- **Auto-switching**: Seamlessly switch between code and preview tabs

### Technical Features
- **Backend Integration**: Robust API communication with error handling
- **Session Tracking**: Unique session IDs for concurrent users
- **Code Validation**: Automatic syntax checking and fixes
- **Video Management**: Efficient video URL generation and caching

## 🚀 Tech Stack

### Framework & Runtime
- **[Next.js 15.3.4](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library with latest features
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe development

### UI & Styling
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[class-variance-authority](https://cva.style/)** - Component variants
- **[clsx](https://github.com/lukeed/clsx) & [tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Conditional styling

### Development Tools
- **[ESLint 9](https://eslint.org/)** - Code linting and quality
- **[PostCSS](https://postcss.org/)** - CSS processing
- **[Turbopack](https://turbo.build/)** - Fast development builds

## 📦 Installation

### Prerequisites
- **Node.js** (v18+ recommended)
- **npm**, **yarn**, **pnpm**, or **bun**
- **Backend server** running on port 3001

### Please Note- Clone backend from [Taxim-Backend repo](https://github.com/anonymousminati/Taxim-backend)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd taxim/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Configure environment** (optional)
   ```bash
   # Create .env.local file
   echo "NEXT_PUBLIC_API_URL=http://localhost:3001" > .env.local
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open application**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

### Development Scripts
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint code analysis

### Deployment Scripts
- `npm run build:github` - Build optimized for GitHub Pages
- `npm run export` - Generate static export for hosting

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── favicon.ico         # App icon
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Home page
│   ├── components/             # React components
│   │   └── ui/                 # UI components
│   │       ├── button.tsx      # Button component
│   │       ├── card.tsx        # Card component
│   │       ├── manim-studio.tsx # Main studio component
│   │       ├── tabs.tsx        # Tabs component
│   │       └── textarea.tsx    # Textarea component
│   └── lib/                    # Utility libraries
│       ├── api.ts              # API service layer
│       └── utils.ts            # Helper utilities
├── public/                     # Static assets
│   ├── file.svg               # Icon assets
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── components.json             # shadcn/ui config
├── eslint.config.mjs          # ESLint configuration
├── next.config.ts             # Next.js configuration
├── next-env.d.ts              # Next.js TypeScript declarations
├── package.json               # Dependencies and scripts
├── postcss.config.mjs         # PostCSS configuration
├── README.md                  # This file
└── tsconfig.json              # TypeScript configuration
```

## 🔗 API Integration

### Backend Endpoints
The frontend communicates with the backend server through a robust API layer:

```typescript
// Main API endpoints
GET  /health              - Health check
GET  /api/status          - System requirements status
POST /api/manim/generate  - Generate animation from prompt
POST /api/manim/render    - Render Manim code
GET  /api/sessions/:id    - Get session info
POST /api/sessions        - Create/manage sessions
```

### Error Handling
- **Network errors**: Automatic retry with exponential backoff
- **API errors**: User-friendly error messages
- **Validation errors**: Real-time code validation feedback
- **Session errors**: Automatic session recovery

### Loading States
- **Generation**: AI processing and code generation
- **Rendering**: Video compilation and processing
- **Real-time feedback**: Progress indicators and status updates

## 🎯 Usage Guide

### Basic Workflow

1. **Start a session**: Application automatically creates a unique session
2. **Describe animation**: Type your animation idea in natural language
3. **Review generated code**: AI generates Manim code automatically
4. **Preview animation**: Video renders and displays in preview tab
5. **Iterate**: Modify code or provide new prompts to refine

### Example Prompts
```
"Create a circle that transforms into a square"
"Show the Pythagorean theorem with animated triangles"
"Animate a sine wave with changing frequency"
"Create a bouncing ball with physics"
```

### Code Editing
- **Syntax highlighting**: Full Python/Manim syntax support
- **Auto-completion**: Intelligent code suggestions
- **Error detection**: Real-time syntax validation
- **Quick fixes**: Automatic error resolution

## ⚙️ Configuration

### Environment Variables
```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001  # Backend server URL

# Deployment Configuration (set automatically)
GITHUB_PAGES=true                         # Enable GitHub Pages mode
NODE_ENV=production                       # Environment mode (auto-set)
BUILD_STATIC=true                         # Enable static export mode

# Optional: Development settings
NODE_ENV=development                      # Environment mode
```

### Next.js Configuration
Key configurations in `next.config.ts`:
- **GitHub Pages Support**: Automatic static export with proper base path
- **Turbopack**: Enabled for faster development builds
- **TypeScript**: Strict type checking enabled
- **ESLint**: Integrated linting during builds
- **Image Optimization**: Disabled for static export compatibility
- **Asset Prefix**: Configurable for different hosting environments

### Tailwind Configuration
Custom styling in `tailwind.config.js`:
- **Dark theme**: Default dark mode enabled
- **Custom colors**: Manim-specific color palette
- **Responsive breakpoints**: Mobile-first design
- **Animation utilities**: Custom animation classes

## 🚀 Deployment

### Production Build
```bash
# Build for production
npm run build

# Start production server
npm start
```

### Environment Setup
1. **Build assets**
   ```bash
   npm run build
   ```

2. **Configure environment**
   ```bash
   export NEXT_PUBLIC_API_URL=https://your-backend-domain.com
   ```

3. **Start production server**
   ```bash
   npm start
   ```

### Platform Deployment

#### GitHub Pages (Recommended for Demo)
The project is pre-configured for GitHub Pages deployment with automated CI/CD:

1. **Automatic Deployment**
   - Push changes to the `main` branch
   - GitHub Actions automatically builds and deploys to GitHub Pages
   - Site will be available at `https://yourusername.github.io/taxim/`

2. **GitHub Actions Workflow**
   - Located at `.github/workflows/deploy.yml`
   - Triggers on push to `main` branch
   - Builds static site and deploys to `gh-pages` branch
   - Includes proper permissions and artifact handling

3. **Manual Deployment**
   ```bash
   # Build for GitHub Pages
   npm run build:github
   
   # Or using the export script
   npm run export
   ```

4. **Configuration**
   - The project uses static export with `output: 'export'`
   - Base path configured as `/taxim` for GitHub Pages
   - Assets optimized for static hosting
   - `.nojekyll` file included for proper routing

5. **Environment Variables**
   ```bash
   # Set in GitHub repository secrets or variables
   NEXT_PUBLIC_API_URL=https://your-backend-domain.com
   ```

6. **Setup Steps**
   - Go to repository Settings → Pages
   - Set source to "Deploy from a branch"
   - Select `gh-pages` branch
   - The workflow will automatically deploy on next push

#### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Configure environment variables in Vercel dashboard
# NEXT_PUBLIC_API_URL = https://your-backend-domain.com
```

#### Netlify
```bash
# Install Netlify CLI
npm install netlify-cli -g

# Build and deploy
netlify deploy --prod --dir=out

# Configure environment variables in Netlify dashboard
```

#### Docker
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

#### Static Hosting (CDN)
For AWS S3, Azure Storage, or other static hosts:
```bash
# Build static files
npm run export

# Upload 'out' directory to your static host
# Configure custom domain and SSL if needed
```

## 📱 Browser Support

### Supported Browsers
- **Chrome/Chromium** 88+ ✅
- **Firefox** 85+ ✅
- **Safari** 14+ ✅
- **Edge** 88+ ✅

### Mobile Support
- **Mobile Warning**: Desktop-optimized workflow recommended
- **Responsive Design**: Basic mobile layout available
- **Touch Support**: Limited touch interaction for code editing

## 🐛 Troubleshooting

### Common Issues

#### Backend Connection Failed
```
❌ Unable to connect to backend server
```
**Solutions:**
- Ensure backend server is running on port 3001
- Check `NEXT_PUBLIC_API_URL` environment variable
- Verify network connectivity and firewall settings

#### Code Generation Timeout
```
⏱️ Request timeout while generating animation
```
**Solutions:**
- Simplify your prompt
- Check backend server resources
- Restart backend server if needed

#### Video Not Loading
```
🎬 Animation rendered but video not displaying
```
**Solutions:**
- Check browser console for CORS errors
- Verify video file permissions on backend
- Clear browser cache and reload

#### Session Errors
```
🔒 Session expired or invalid
```
**Solutions:**
- Refresh the page to create new session
- Clear browser localStorage
- Check backend session management

### Development Issues

#### Hot Reload Not Working
```bash
# Clear Next.js cache
rm -rf .next

# Restart dev server
npm run dev
```

#### TypeScript Errors
```bash
# Check TypeScript compilation
npx tsc --noEmit

# Update type definitions
npm update @types/react @types/react-dom @types/node
```

#### Styling Issues
```bash
# Rebuild Tailwind CSS
npx tailwindcss build

# Clear PostCSS cache
rm -rf .next/cache
```

### Performance Optimization

#### Slow Loading
- **Enable compression**: Gzip/Brotli on server
- **Optimize images**: Use Next.js Image component
- **Code splitting**: Lazy load heavy components
- **Bundle analysis**: Use `@next/bundle-analyzer`

#### Memory Issues
- **Session cleanup**: Implement session timeout
- **Video caching**: Optimize video file management
- **Component memoization**: Use React.memo for expensive renders

## 🤝 Contributing

### Development Setup
1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Install dependencies**: `npm install`
4. **Start development**: `npm run dev`
5. **Make changes** with proper TypeScript types
6. **Test thoroughly** across different browsers
7. **Commit changes**: `git commit -m 'Add amazing feature'`
8. **Push to branch**: `git push origin feature/amazing-feature`
9. **Open Pull Request**

### Code Standards
- **TypeScript**: All code must be properly typed
- **ESLint**: Follow established linting rules
- **Prettier**: Consistent code formatting
- **Testing**: Add tests for new features
- **Documentation**: Update README and code comments

### Component Guidelines
- **Accessibility**: Follow WCAG guidelines
- **Performance**: Optimize re-renders and bundle size
- **Reusability**: Create modular, reusable components
- **Error boundaries**: Handle errors gracefully


## 🔗 Related Projects

- **[Taxim Backend](https://github.com/anonymousminati/Taxim-backend)** - Node.js/Express API server
- **[Manim Community](https://www.manim.community/)** - Mathematical animation library
- **[Next.js](https://nextjs.org/)** - React framework

---

**Built with ❤️ for mathematical education and visualization**
