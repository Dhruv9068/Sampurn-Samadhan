# 🚀 Deployment Guide for Sampurn Samadhan

## Netlify Deployment

### Prerequisites
- Netlify account
- Git repository connected to Netlify

### Automatic Deployment (Recommended)

1. **Connect Repository to Netlify:**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub/GitLab/Bitbucket repository
   - Select the repository

2. **Build Settings:**
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Node version:** 18

3. **Environment Variables (if needed):**
   - Add any required environment variables in Netlify dashboard

4. **Deploy:**
   - Netlify will automatically build and deploy on every push to main branch

### Manual Deployment

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify:**
   ```bash
   npm run deploy
   ```

### Local Testing

1. **Start development server:**
   ```bash
   npm run dev
   ```

2. **Preview production build:**
   ```bash
   npm run build
   npm run preview
   ```

## File Structure for Deployment

```
project/
├── public/
│   ├── _redirects          # Netlify redirects
│   ├── logo.jpeg           # Company logo
│   ├── rekha 1.png         # Rekha before image
│   └── rekha 2.png         # Rekha after image
├── src/                    # Source code
├── netlify.toml            # Netlify configuration
├── package.json            # Dependencies and scripts
└── vite.config.ts          # Vite configuration
```

## Important Notes

- The `_redirects` file ensures proper routing for SPA
- All images are served from the `public` folder
- The project uses Vite for building and development
- Tailwind CSS is configured for production builds

## Troubleshooting

- If images don't load, check the `public` folder path
- If routing doesn't work, verify `_redirects` file is in `public` folder
- For build errors, check Node.js version (should be 18+)

## 🤖 AI Configuration & Environment Setup

### Required Environment Variables

Create a `.env` file in your project root with the following variables:

```bash
# Gemini AI API Keys (Recommended: Use separate keys for each domain)
VITE_GEMINI_HEALTH_API_KEY=your_health_gemini_api_key_here
VITE_GEMINI_AGRICULTURE_API_KEY=your_agriculture_gemini_api_key_here
VITE_GEMINI_GRIEVANCE_API_KEY=your_grievance_gemini_api_key_here

# Fallback API key (if you prefer to use one key for all domains)
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# Application Configuration
VITE_APP_NAME=Sampurn Samadhan
VITE_APP_VERSION=1.0.0
```

### Getting Gemini API Keys

1. **Visit Google AI Studio**: [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
2. **Sign in** with your Google account
3. **Create API Key**: Click "Create API Key" button
4. **Copy the key** and paste it in your `.env` file
5. **Repeat** for each domain if you want separate keys

### AI Personalities Configuration

Each AI assistant has been fine-tuned with specialized knowledge:

- **Dr. Aisha** (Health): Medical expertise, empathetic responses, safety-first approach
- **Farmer Raj** (Agriculture): Farming knowledge, practical advice, sustainable practices
- **Officer Priya** (Grievance): Government procedures, conflict resolution, policy guidance

### Testing AI Functionality

1. **Health Portal**: Ask health-related questions or upload medical images
2. **Agriculture Portal**: Inquire about farming techniques or crop diseases
3. **Grievance Portal**: Ask about government procedures or complaint processes

### Troubleshooting AI Issues

- **Check API keys** in `.env` file
- **Verify quota** on Google AI Studio dashboard
- **Check browser console** for error messages
- **Ensure proper formatting** of environment variables
- **Test with simple queries** first

### Voice Control Settings

- **Auto-speak is disabled by default** to prevent unwanted audio
- **Users can enable** voice responses via toggle in each AI interface
- **Speech synthesis** works in multiple languages
- **Voice commands** available for hands-free interaction
