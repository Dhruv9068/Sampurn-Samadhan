import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, Leaf, MessageSquare, ArrowRight, Sparkles, Users, Shield, Zap, Globe, 
  CheckCircle, Star, Award, TrendingUp, Play, Phone, Mail, MapPin,
  Facebook, Twitter, Instagram, Linkedin, ChevronDown, Clock, Target, Lightbulb,
  LogOut, User, Settings, Bell, Search, Menu, X
} from 'lucide-react';

const PortalPage: React.FC = () => {
  const navigate = useNavigate();
  const [activePortal, setActivePortal] = useState<string | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

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
      route: '/health',
      pages: [
        { name: 'Dashboard', route: '/health' },
        { name: 'AI Assistant', route: '/health/ai-assistant' },
        { name: 'Health Tracker', route: '/health/tracker' },
        { name: 'Analytics', route: '/health/analytics' }
      ]
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
      route: '/agriculture',
      pages: [
        { name: 'Dashboard', route: '/agriculture' },
        { name: 'AI Assistant', route: '/agriculture/ai-assistant' },
        { name: 'Crop Monitor', route: '/agriculture/crop-monitor' },
        { name: 'Analytics', route: '/agriculture/analytics' }
      ]
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
      route: '/grievance',
      pages: [
        { name: 'Dashboard', route: '/grievance' },
        { name: 'Chat', route: '/grievance/chat' },
        { name: 'Search', route: '/grievance/search' },
        { name: 'Departments', route: '/grievance/departments' },
        { name: 'Analytics', route: '/grievance/analytics' },
        { name: 'Settings', route: '/grievance/settings' }
      ]
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

  return (
    <div className="min-h-screen relative overflow-hidden bg-white">
      {/* Soft Glow Background */}
      <div 
        className="fixed inset-0 transition-all duration-1000 ease-out"
        style={{ 
          background: `linear-gradient(
            to bottom,
            rgba(255, 154, 72, 0.10), /* Soft Orange */
            rgba(203, 141, 255, 0.05) /* Soft Purple */
          )`
        }}
      />
      
      {/* Navigation Header */}
      <nav className="bg-white/80 backdrop-blur-2xl border-b border-orange-200/30 sticky top-0 z-50">
        <div className="container mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img 
                src="/logo.jpeg" 
                alt="Sampurn Samadhan Logo" 
                className="w-10 h-10 rounded-full shadow-lg"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                Sampurn Samadhan
              </span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-orange-500 transition-colors">Features</a>
              <a href="#solutions" className="text-gray-700 hover:text-orange-500 transition-colors">Solutions</a>
              <a href="#about" className="text-gray-700 hover:text-orange-500 transition-colors">About</a>
              <button onClick={() => navigate('/contact')} className="text-gray-700 hover:text-orange-500 transition-colors">Contact</button>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-600 hover:text-orange-500 transition-colors"
              >
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full"></span>
              </button>
              
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-orange-50 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">Demo User</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-orange-200/30 py-2"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-orange-50 transition-colors">
                        <Settings className="w-4 h-4 inline mr-2" />
                        Settings
                      </button>
                      <button 
                        onClick={() => navigate('/')}
                        className="w-full px-4 py-2 text-left text-gray-700 hover:bg-orange-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4 inline mr-2" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 text-center relative z-10">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">
              Welcome to Your Digital Hub
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Access all three smart solutions from one centralized platform. 
              Experience the power of AI-driven insights across healthcare, agriculture, and governance.
            </p>
          </motion.div>

          {/* Portal Selection Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
            {portals.map((portal, index) => {
              const Icon = portal.icon;
              return (
                <motion.div
                  key={portal.id}
                  className="group cursor-pointer"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ y: -10 }}
                  onClick={() => navigate(portal.route)}
                >
                  <div className={`bg-gradient-to-br ${portal.bgGradient} rounded-3xl p-8 shadow-xl border border-orange-200/30 group-hover:shadow-2xl transition-all duration-500 relative overflow-hidden`}>
                    {/* Background Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${portal.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    
                    <div className="relative z-10">
                      <div className={`w-20 h-20 bg-gradient-to-br ${portal.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-12 h-12 text-white" />
                      </div>

                      <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 group-hover:text-orange-600 transition-colors">
                        {portal.title}
                      </h3>

                      <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                        {portal.description}
                      </p>

                      {/* Features */}
                      <div className="space-y-2 mb-6">
                        {portal.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-gray-700">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-800">{portal.stats.users}</div>
                          <div className="text-xs text-gray-600">Users</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-800">{portal.stats.accuracy}</div>
                          <div className="text-xs text-gray-600">Accuracy</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-800">{portal.stats.response}</div>
                          <div className="text-xs text-gray-600">Response</div>
                        </div>
                      </div>

                                             {/* Navigation Links */}
                       <div className="mt-6 pt-6 border-t border-orange-200/30">
                         <h4 className="text-sm font-semibold text-gray-600 mb-3">Available Pages:</h4>
                         <div className="grid grid-cols-2 gap-2">
                           {portal.pages.map((page, pageIndex) => (
                             <motion.button
                               key={pageIndex}
                               onClick={() => navigate(page.route)}
                               className="text-xs text-orange-600 hover:text-orange-700 hover:bg-orange-50 px-3 py-2 rounded-lg transition-all text-left"
                               whileHover={{ scale: 1.02 }}
                               whileTap={{ scale: 0.98 }}
                             >
                               {page.name}
                             </motion.button>
                           ))}
                         </div>
                       </div>
                       
                       <div className="flex items-center space-x-3 text-lg font-medium text-orange-500 group-hover:translate-x-2 transition-transform duration-300 mt-4">
                         <span>Access Portal</span>
                         <ArrowRight className="w-5 h-5" />
                       </div>
                     </div>
                   </div>
                 </motion.div>
               );
             })}
           </div>
         </div>
       </section>

      {/* How It Works Section */}
      <section id="features" className="py-20 bg-gradient-to-br from-orange-50 to-purple-50 relative z-10">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple steps to access our comprehensive solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  <div className="relative w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center mx-auto shadow-2xl group-hover:shadow-3xl transition-all duration-300 mb-6">
                    <Icon className="w-12 h-12 text-white" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-sm font-bold text-orange-600">{index + 1}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Notifications Panel */}
      <AnimatePresence>
        {showNotifications && (
          <motion.div
            className="fixed top-20 right-8 w-80 bg-white rounded-2xl shadow-2xl border border-orange-200/30 z-50"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">Notifications</h3>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        notification.type === 'success' ? 'bg-green-500' :
                        notification.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm text-gray-800 font-medium">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PortalPage;