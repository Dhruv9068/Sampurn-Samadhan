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
