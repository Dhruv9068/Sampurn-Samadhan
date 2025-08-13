import React, { useState, useEffect } from 'react';
import { Heart, Leaf, MessageSquare, ArrowRight, Sparkles } from 'lucide-react';

// Import Loading Screen
import LoadingScreen from './components/LoadingScreen';

// Import Health components
import Dashboard from './components/Health/Pages/Dashboard';
import HealthTracker from './components/Health/Pages/HealthTracker';
import Analytics from './components/Health/Pages/Analytics';
import AIAssistant from './components/Health/Pages/AIAssistant';
import Header from './components/Health/Layout/Header';
import Sidebar from './components/Health/Layout/Sidebar';

// Import Agriculture components
import AgricultureDashboard from './components/Agriculture/pages/AgricultureDashboard';
import CropMonitor from './components/Agriculture/pages/CropMonitor';
import AgricultureAnalytics from './components/Agriculture/pages/AgricultureAnalytics';
import AgricultureAIAssistant from './components/Agriculture/pages/AgricultureAIAssistant';
import AgricultureHeader from './components/Agriculture/pages/AgricultureHeader';
import AgricultureSidebar from './components/Agriculture/pages/AgricultureSidebar';

// Import Grievance components
import { GrievancePortal } from './components/Grievance/GrievancePortal';

// Import Landing Page and Contact
import LandingPage from './components/LandingPage';
import Contact from './components/Contact';

type PortalType = 'landing' | 'portal' | 'health' | 'agriculture' | 'grievance' | 'contact';
type HealthPage = 'dashboard' | 'tracker' | 'analytics' | 'assistant';
type AgriculturePage = 'dashboard' | 'crop-monitor' | 'analytics' | 'assistant';

const App: React.FC = () => {
  const [currentPortal, setCurrentPortal] = useState<PortalType>('landing');
  const [currentHealthPage, setCurrentHealthPage] = useState<HealthPage>('dashboard');
  const [currentAgriculturePage, setCurrentAgriculturePage] = useState<AgriculturePage>('dashboard');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = (portal: string) => {
    setCurrentPortal(portal as PortalType);
  };

  const handleBackToPortal = () => {
    setCurrentPortal('portal');
  };

  const handleBackToLanding = () => {
    setCurrentPortal('landing');
  };

  const handleHealthPageChange = (page: HealthPage) => {
    setCurrentHealthPage(page);
  };

  const handleAgriculturePageChange = (page: AgriculturePage) => {
    setCurrentAgriculturePage(page);
  };

  const renderHealthPortal = () => {
    const renderPage = () => {
      switch (currentHealthPage) {
        case 'dashboard':
          return <Dashboard />;
        case 'tracker':
          return <HealthTracker />;
        case 'analytics':
          return <Analytics />;
        case 'assistant':
          return <AIAssistant />;
        default:
          return <Dashboard />;
      }
    };

    return (
      <div className="flex h-screen bg-gradient-to-br from-slate-50 to-gray-100">
        <Sidebar
          currentPage={currentHealthPage}
          onPageChange={handleHealthPageChange}
          onLogout={handleBackToPortal}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header currentPage={currentHealthPage} />
          <div className="flex-1 overflow-auto">
            {renderPage()}
          </div>
        </div>
      </div>
    );
  };

  const renderAgriculturePortal = () => {
    const renderPage = () => {
      switch (currentAgriculturePage) {
        case 'dashboard':
          return <AgricultureDashboard />;
        case 'crop-monitor':
          return <CropMonitor />;
        case 'analytics':
          return <AgricultureAnalytics />;
        case 'assistant':
          return <AgricultureAIAssistant />;
        default:
          return <AgricultureDashboard />;
      }
    };

    return (
      <div className="flex h-screen bg-gradient-to-br from-emerald-50 to-green-100">
        <AgricultureSidebar
          currentPage={currentAgriculturePage}
          onPageChange={handleAgriculturePageChange}
          onLogout={handleBackToPortal}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AgricultureHeader currentPage={currentAgriculturePage} />
          <div className="flex-1 overflow-auto">
            {renderPage()}
          </div>
        </div>
      </div>
    );
  };

  const renderGrievancePortal = () => {
    return (
      <>
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className='flex-1 overflow-auto'>
          <GrievancePortal setCurrentPortal={setCurrentPortal}/>
        </div>
      </div>
      </>
    );
  };

  const renderPortalPage = () => {
    const portals = [
      {
        id: 'health',
        title: 'Smart Health Management',
        description: 'Comprehensive health tracking with AI-powered insights, vital monitoring, and personalized wellness guidance.',
        icon: Heart,
        gradient: 'from-rose-400 to-pink-500',
        bgGradient: 'from-rose-50 to-pink-50',
        features: ['Health Tracking', 'AI Assistant', 'Analytics', 'Voice Support'],
        stats: '10K+ Users'
      },
      {
        id: 'agriculture',
        title: 'Smart Agriculture Management',
        description: 'Advanced crop monitoring, disease detection, and agricultural optimization powered by AI technology.',
        icon: Leaf,
        gradient: 'from-emerald-400 to-green-500',
        bgGradient: 'from-emerald-50 to-green-50',
        features: ['Crop Analysis', 'Disease Detection', 'Weather Insights', 'Yield Prediction'],
        stats: '5K+ Farmers'
      },
      {
        id: 'grievance',
        title: 'Smart Grievance Management',
        description: 'Efficient complaint handling and resolution system with automated workflows and real-time tracking.',
        icon: MessageSquare,
        gradient: 'from-amber-400 to-orange-500',
        bgGradient: 'from-amber-50 to-orange-50',
        features: ['Complaint Tracking', 'Auto-Assignment', 'Real-time Updates', 'Analytics'],
        stats: '15K+ Resolved'
      }
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 via-neutral-50 to-stone-100 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-stone-300/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-stone-400/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-8 py-16">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-3 mb-8">
              <img 
                src="/logo.jpeg" 
                alt="Sampurn Samadhan Logo" 
                className="w-16 h-16 rounded-2xl shadow-2xl"
              />
              <div className="text-left">
                <h1 className="text-6xl font-bold bg-gradient-to-r from-amber-800 via-orange-700 to-red-700 bg-clip-text text-transparent mb-2 tracking-tight">
                  Sampurn Samadhan
                </h1>
              </div>
            </div>
            <p className="text-xl text-stone-700 max-w-3xl mx-auto leading-relaxed">
              Comprehensive digital solutions powered by artificial intelligence to transform healthcare, agriculture, and governance
            </p>
          </div>

          {/* Portal Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {portals.map((portal) => {
              const Icon = portal.icon;
              return (
                <div
                  key={portal.id}
                  className={`relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer group border border-stone-200/50 hover:border-stone-300/50 ${
                    hoveredCard === portal.id ? 'transform scale-105' : ''
                  }`}
                  onMouseEnter={() => setHoveredCard(portal.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => handleNavigate(portal.id)}
                >
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${portal.bgGradient} opacity-0 group-hover:opacity-30 rounded-3xl transition-opacity duration-500`} />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`w-20 h-20 bg-gradient-to-br ${portal.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-stone-800 mb-4 group-hover:text-stone-700 transition-all duration-300">
                      {portal.title}
                    </h3>

                    {/* Description */}
                    <p className="text-stone-600 mb-6 leading-relaxed group-hover:text-stone-700 transition-colors duration-300">
                      {portal.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      {portal.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className={`w-2 h-2 bg-gradient-to-r ${portal.gradient} rounded-full`} />
                          <span className="text-sm text-amber-600 group-hover:text-amber-700 transition-colors duration-300">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-stone-500 group-hover:text-stone-600 transition-colors duration-300">
                        {portal.stats}
                      </span>
                      <div className={`flex items-center space-x-2 text-sm font-medium bg-gradient-to-r ${portal.gradient} bg-clip-text text-transparent group-hover:translate-x-2 transition-transform duration-300`}>
                        <span>Explore</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${portal.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10 blur-xl`} />
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="text-center mt-20">
            <div className="inline-flex items-center space-x-6 text-sm text-amber-600">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span>AI Powered</span>
                <div className="w-2 h-2 bg-stone-600 rounded-full animate-pulse" />
                <span>Secure & Private</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-stone-400 rounded-full animate-pulse" />
                <span>24/7 Available</span>
              </div>
            </div>
            <button
              onClick={handleBackToLanding}
              className="mt-6 text-amber-600 hover:text-amber-700 font-medium transition-colors"
            >
              ← Back to Landing Page
            </button>
          </div>
        </div>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
          
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
        `}</style>
      </div>
    );
  };

  // Render based on current portal
  switch (currentPortal) {
    case 'landing':
      return <LandingPage onNavigate={handleNavigate} />;
    case 'contact':
      return <Contact onNavigate={handleNavigate} />;
    case 'health':
      return renderHealthPortal();
    case 'agriculture':
      return renderAgriculturePortal();
    case 'grievance':
      return renderGrievancePortal();
    default:
      return renderPortalPage();
  }
};

export default App;