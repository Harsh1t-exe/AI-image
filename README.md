# AI Image Generator

## Overview
An AI-powered image generator that uses OpenAI to improve prompts and Unsplash to find high-quality images based on user queries.

## Features
- AI-powered prompt enhancement with OpenAI GPT-3.5
- High-quality image search via Unsplash API
- Production-ready configuration for Render deployment
- Responsive React interface

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm
- OpenAI API key
- Unsplash API key

### Installation
1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-image-generator.git
cd ai-image-generator
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Add your API keys to `.env`:
```
OPENAI_KEY=your_openai_api_key
UNSPLASH_KEY=your_unsplash_access_key
```

5. Start development:
```bash
npm start
```

## API Endpoints
- `GET /api/health` - Health check
- `POST /api/improve` - Improve prompt with OpenAI
- `POST /api/search` - Search images on Unsplash

## Deployment

### GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/ai-image-generator.git
git push -u origin main
```

### Render
1. Go to [render.com](https://render.com)
2. Create new Web Service
3. Connect GitHub repository
4. Set environment variables:
   - `OPENAI_KEY`
   - `UNSPLASH_KEY`
5. Deploy!

## Environment Variables
| Variable | Description |
|----------|-------------|
| `OPENAI_KEY` | OpenAI API key |
| `UNSPLASH_KEY` | Unsplash access key |
| `NODE_ENV` | Set to 'production' for deployment |

## Deployment Checklist
1. ✅ GitHub repository created
2. ✅ Environment variables configured
3. ✅ Render deployment configured
4. ✅ Production-ready setup complete
