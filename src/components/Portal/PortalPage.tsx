import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { 
  Heart, Leaf, MessageSquare, ArrowRight, Sparkles, Users, Shield, Zap, 
  LogOut, User, Settings, Bell, Search, Menu, X, ChevronRight,
  Activity, TrendingUp, Clock, CheckCircle, AlertTriangle, Info
} from 'lucide-react';

interface PortalPageProps {
  user: any;
  onLogout: () => void;
}

const PortalPage: React.FC<PortalPageProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [activePortal, setActivePortal] = useState<string | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const portalRef = useRef<HTMLDivElement>(null);

  const portals = [
    {
      id: 'health',
      title: 'Smart Health Management',
      description: 'Comprehensive health tracking with AI-powered insights, vital monitoring, and personalized wellness guidance for better healthcare outcomes.',
      icon: Heart,
      gradient: 'from-orange-400 to-orange-500',
      bgGradient: 'from-orange-50 to-orange-100',
      features: ['Health Tracking', 'AI Assistant', 'Analytics', 'Voice Support'],
      stats: { users: '10K+', accuracy: '98%', response: '<2min' },
      route: '/health'
    },
    {
      id: 'agriculture',
      title: 'Smart Agriculture Management',
      description: 'Advanced crop monitoring, disease detection, and agricultural optimization powered by cutting-edge AI technology for maximum yield.',
      icon: Leaf,
      gradient: 'from-amber-400 to-orange-500',
      bgGradient: 'from-amber-50 to-orange-100',
      features: ['Crop Analysis', 'Disease Detection', 'Weather Insights', 'Yield Prediction'],
      stats: { users: '5K+', accuracy: '95%', response: '<5min' },
      route: '/agriculture'
    },
    {
      id: 'grievance',
      title: 'Smart Grievance Management',
      description: 'Efficient complaint handling and resolution system with automated workflows, real-time tracking, and transparent communication.',
      icon: MessageSquare,
      gradient: 'from-cream-400 to-orange-500',
      bgGradient: 'from-cream-50 to-orange-100',
      features: ['Complaint Tracking', 'Auto-Assignment', 'Real-time Updates', 'Analytics'],
      stats: { users: '15K+', accuracy: '99%', response: '<1hr' },
      route: '/grievance'
    }
  ];

  const steps = [
    {
      title: "Welcome to Your Dashboard",
      description: "This is your central hub for accessing all three smart solutions. Each portal is designed to provide specialized services.",
      icon: Sparkles
    },
    {
      title: "Choose Your Service",
      description: "Select from Health Management, Agriculture Solutions, or Grievance System based on your current needs.",
      icon: ArrowRight
    },
    {
      title: "AI-Powered Analysis",
      description: "Our advanced AI will analyze your requirements and provide personalized recommendations and insights.",
      icon: Zap
    },
    {
      title: "Get Real-time Results",
      description: "Receive instant feedback, track progress, and access comprehensive analytics for informed decision-making.",
      icon: TrendingUp
    }
  ];

  const notifications = [
    { id: 1, type: 'success', message: 'Health report generated successfully', time: '2 min ago' },
    { id: 2, type: 'info', message: 'New agriculture insights available', time: '1 hour ago' },
    { id: 3, type: 'warning', message: 'Pending grievance requires attention', time: '3 hours ago' }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Portal cards animation
      gsap.fromTo('.portal-card', 
        { y: 100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.2,
          ease: 'power3.out'
        }
      );

      // Welcome animation
      gsap.fromTo('.welcome-text', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.3 }
      );

      // Stats animation
      gsap.fromTo('.stat-item', 
        { scale: 0, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 0.6, 
          stagger: 0.1,
          delay: 0.8,
          ease: 'back.out(1.7)'
        }
      );

    }, portalRef);

    return () => ctx.revert();
  }, []);

  const handlePortalClick = (portal: any) => {
    setActivePortal(portal.id);
    setTimeout(() => {
      navigate(portal.route);
    }, 500);
  };

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-orange-50 to-orange-100 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Liquid Background Blobs */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-orange-200/15 to-orange-300/10 blur-3xl"
            style={{
              width: `${Math.random() * 400 + 200}px`,
              height: `${Math.random() * 400 + 200}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 60 - 30, 0],
              y: [0, Math.random() * 60 - 30, 0],
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 8 + 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Navigation Header */}
      <nav className="bg-cream-50/60 backdrop-blur-2xl border-b border-orange-200/30 sticky top-0 z-50">
        <div className="container mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-4"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg border-2 border-orange-300/50"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Sampurn Samadhan</h1>
                <p className="text-sm text-gray-600">Smart Solutions Portal</p>
              </div>
            </motion.div>

            {/* Search Bar */}
            <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search services..."
                  className="w-full pl-12 pr-4 py-3 bg-white/40 backdrop-blur-sm border border-orange-200/50 rounded-2xl focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <motion.button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-3 bg-white/40 backdrop-blur-sm rounded-2xl hover:bg-white/60 transition-all relative"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Bell className="w-5 h-5 text-gray-600" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                </motion.button>

                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <div className="p-4 border-b border-stone-200">
                        <h3 className="font-semibold text-stone-800">Notifications</h3>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {notifications.map((notification) => (
                          <div key={notification.id} className="p-4 border-b border-stone-100 hover:bg-stone-50 transition-colors">
                            <div className="flex items-start space-x-3">
                              <div className={`w-2 h-2 rounded-full mt-2 ${
                                notification.type === 'success' ? 'bg-green-500' :
                                notification.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                              }`}></div>
                              <div className="flex-1">
                                <p className="text-sm text-stone-800">{notification.message}</p>
                                <p className="text-xs text-stone-500 mt-1">{notification.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* User Menu */}
              <div className="relative">
                <motion.button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 p-2 bg-white/40 backdrop-blur-sm rounded-2xl hover:bg-white/60 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src={user?.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="hidden md:block text-gray-700 font-medium">{user?.name}</span>
                </motion.button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <div className="p-4 border-b border-stone-200">
                        <p className="font-semibold text-stone-800">{user?.name}</p>
                        <p className="text-sm text-stone-600">{user?.email}</p>
                      </div>
                      <div className="py-2">
                        <button className="w-full px-4 py-2 text-left hover:bg-stone-50 transition-colors flex items-center space-x-3">
                          <User className="w-4 h-4 text-stone-500" />
                          <span className="text-stone-700">Profile</span>
                        </button>
                        <button className="w-full px-4 py-2 text-left hover:bg-stone-50 transition-colors flex items-center space-x-3">
                          <Settings className="w-4 h-4 text-stone-500" />
                          <span className="text-stone-700">Settings</span>
                        </button>
                        <button 
                          onClick={handleLogout}
                          className="w-full px-4 py-2 text-left hover:bg-red-50 transition-colors flex items-center space-x-3 text-red-600"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div ref={portalRef} className="relative z-10 container mx-auto px-8 py-12">
        {/* Welcome Section */}
        <div className="welcome-text text-center mb-16">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 via-orange-700 to-red-600 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Welcome back, {user?.name?.split(' ')[0]}!
          </motion.h1>
          <motion.p 
            className="text-xl text-stone-700 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Your comprehensive dashboard for accessing AI-powered solutions in healthcare, agriculture, and governance
          </motion.p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { label: 'Active Services', value: '3', icon: Activity, color: 'from-blue-500 to-blue-600' },
            { label: 'Total Users', value: '70K+', icon: Users, color: 'from-green-500 to-green-600' },
            { label: 'Success Rate', value: '97%', icon: TrendingUp, color: 'from-purple-500 to-purple-600' },
            { label: 'Avg Response', value: '<2min', icon: Clock, color: 'from-orange-500 to-orange-600' }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                className="stat-item bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-stone-200/50 text-center"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-stone-800 mb-1">{stat.value}</div>
                <div className="text-sm text-stone-600">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Getting Started Guide */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-stone-200/50 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-stone-800 mb-4">Getting Started Guide</h2>
            <p className="text-stone-600">Follow these steps to make the most of your dashboard</p>
          </div>

          <div className="flex items-center justify-between mb-8">
            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index <= currentStep ? 'bg-orange-500' : 'bg-stone-300'
                  }`}
                />
              ))}
            </div>
            <div className="text-sm text-stone-600">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              className="text-center"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                {React.createElement(steps[currentStep].icon, { className: "w-8 h-8 text-white" })}
              </div>
              <h3 className="text-2xl font-bold text-stone-800 mb-4">{steps[currentStep].title}</h3>
              <p className="text-stone-600 max-w-2xl mx-auto mb-8">{steps[currentStep].description}</p>
              
              <div className="flex items-center justify-center space-x-4">
                {currentStep > 0 && (
                  <motion.button
                    onClick={prevStep}
                    className="px-6 py-3 border border-stone-300 text-stone-700 rounded-xl hover:bg-stone-50 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Previous
                  </motion.button>
                )}
                {currentStep < steps.length - 1 && (
                  <motion.button
                    onClick={nextStep}
                    className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Next
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Portal Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {portals.map((portal, index) => {
            const Icon = portal.icon;
            const isActive = activePortal === portal.id;
            
            return (
              <motion.div
                key={portal.id}
                className={`portal-card relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer border border-stone-200/50 group ${
                  isActive ? 'ring-4 ring-orange-500/50 scale-105' : ''
                }`}
                whileHover={{ scale: isActive ? 1.05 : 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handlePortalClick(portal)}
              >
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${portal.bgGradient} opacity-0 group-hover:opacity-30 rounded-3xl transition-opacity duration-500`} />
                
                {/* Loading Overlay */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-3xl flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <p className="text-stone-700 font-medium">Loading {portal.title}...</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
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
                    {portal.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <div className={`w-2 h-2 bg-gradient-to-r ${portal.gradient} rounded-full`} />
                        <span className="text-sm text-stone-600 group-hover:text-stone-700 transition-colors duration-300">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-6">
                    <span>{portal.stats.users} Users</span>
                    <span>{portal.stats.accuracy} Accuracy</span>
                    <span>{portal.stats.response} Response</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-stone-500 group-hover:text-stone-600 transition-colors duration-300">
                        Active
                      </span>
                    </div>
                    <div className={`flex items-center space-x-2 text-sm font-medium bg-gradient-to-r ${portal.gradient} bg-clip-text text-transparent group-hover:translate-x-2 transition-transform duration-300`}>
                      <span>Access Portal</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${portal.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10 blur-xl`} />
              </motion.div>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center space-x-6 text-sm text-stone-600">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span>AI Powered</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span>Secure & Private</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
              <span>24/7 Available</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortalPage;