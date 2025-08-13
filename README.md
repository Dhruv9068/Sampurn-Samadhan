# Sampurn Samadhan - Comprehensive Digital Solutions Platform

A comprehensive digital solutions platform powered by artificial intelligence to transform healthcare, agriculture, and governance. This project combines multiple management systems into a unified platform with a beautiful landing page and integrated dashboards.

## Features

### Landing Page
- Professional industry-level design with animations
- Responsive navigation with mobile menu
- Login functionality (frontend demo)
- Feature showcase with interactive cards
- Statistics and testimonials sections
- Call-to-action sections

### Smart Health Management
- Health tracking dashboard
- Vital signs monitoring
- AI-powered health insights
- Voice-enabled AI assistant
- Analytics and reporting

### Smart Agriculture Management
- Crop monitoring dashboard
- Disease detection system
- Weather insights and predictions
- Yield prediction analytics
- AI-powered agricultural assistant

### Smart Grievance Management
- Comprehensive complaint tracking
- Status management (pending, in-progress, resolved, closed)
- Priority-based categorization
- Search and filter functionality
- Assignment and workflow management
- Real-time updates and notifications

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Chart.js with React Chart.js 2
- **AI Integration**: Google Gemini AI
- **Build Tool**: Vite
- **Development**: Hot Module Replacement (HMR)

## Project Structure

```
src/
├── components/
│   ├── LandingPage.tsx              # Main landing page
│   ├── Agriculture/                  # Agriculture management
│   │   ├── pages/
│   │   │   ├── AgricultureDashboard.tsx
│   │   │   ├── CropMonitor.tsx
│   │   │   ├── AgricultureAnalytics.tsx
│   │   │   └── AgricultureAIAssistant.tsx
│   │   ├── AgricultureHeader.tsx
│   │   └── AgricultureSidebar.tsx
│   ├── Grievance/                   # Grievance management
│   │   ├── GrievancePage.tsx
│   │   └── GrievanceDashboard.tsx
│   ├── Layout/                      # Common layout components
│   │   ├── Header.tsx
│   │   └── Sidebar.tsx
│   └── Pages/                       # Health management
│       ├── Dashboard.tsx
│       ├── HealthTracker.tsx
│       ├── Analytics.tsx
│       └── AIAssistant.tsx
├── services/                        # API and service integrations
│   ├── geminiService.ts
│   ├── healthService.ts
│   └── speechService.ts
├── types/                          # TypeScript type definitions
│   └── health.ts
├── App.tsx                         # Main application component
├── main.tsx                        # Application entry point
└── index.css                       # Global styles
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd project
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

### Landing Page
- The application starts with a beautiful landing page
- Navigate using the top navigation bar
- Click "Login" to see the login modal (frontend demo)
- Click "Explore Solutions" to access the portal

### Portal Navigation
- **Health Management**: Access health tracking, analytics, and AI assistant
- **Agriculture Management**: Access crop monitoring, analytics, and AI assistant
- **Grievance Management**: Access complaint tracking and management system

### Grievance Management Features
- View all complaints with status and priority indicators
- Search complaints by title, description, or submitter
- Filter by status (pending, in-progress, resolved, closed)
- Add new complaints (frontend demo)
- View detailed complaint information
- Edit and manage complaint status

### Health Management Features
- Dashboard with health metrics and trends
- Health tracker for recording vital signs
- Analytics with charts and insights
- AI assistant for health guidance

### Agriculture Management Features
- Dashboard with farm overview and weather
- Crop monitoring with disease detection
- Analytics for yield prediction
- AI assistant for farming advice

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding New Features

1. Create new components in the appropriate directory
2. Update routing in `App.tsx` if needed
3. Add TypeScript types in `types/` directory
4. Update services in `services/` directory for API calls

### Styling Guidelines

- Use Tailwind CSS classes for styling
- Follow the established color scheme:
  - Primary: Amber/Orange gradients
  - Health: Rose/Pink gradients
  - Agriculture: Emerald/Green gradients
  - Grievance: Amber/Orange gradients
- Use consistent spacing and typography
- Implement responsive design for all components

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`

### Deploy to Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request



## Support

For support and questions, please open an issue in the repository.

---

**Sampurn Samadhan** - Transforming digital governance through AI-powered solutions.
