import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Heart, Leaf, MessageSquare, ArrowRight, Sparkles, Users, Shield, Zap, Globe, 
  Menu, X, Star, Award, TrendingUp, CheckCircle, Play, Phone, Mail, MapPin,
  Facebook, Twitter, Instagram, Linkedin, ChevronDown, Clock, Target, Lightbulb
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface LandingPageProps {
  onNavigate: (portal: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLNavElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    // GSAP Animations
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo('.hero-title', 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }
      );

      gsap.fromTo('.hero-subtitle', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: 'power3.out' }
      );

      // Scroll-triggered animations
      gsap.utils.toArray('.animate-on-scroll').forEach((element: any) => {
        gsap.fromTo(element, 
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Floating elements
      gsap.to('.floating-element', {
        y: -20,
        duration: 2,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.5
      });

    }, heroRef);

    return () => {
      ctx.revert();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const features = [
    {
      icon: Heart,
      title: "Smart Health Management",
      description: "AI-powered health tracking with personalized insights and real-time monitoring",
      color: "from-orange-300 to-orange-400",
      bgColor: "from-orange-50/50 to-cream-100/50",
      bgGradient: "from-orange-50/50 to-cream-100/50"
    },
    {
      icon: Leaf,
      title: "Smart Agriculture",
      description: "Advanced crop monitoring, disease detection, and yield optimization",
      color: "from-orange-400 to-orange-500",
      bgColor: "from-cream-50/50 to-orange-100/50",
      bgGradient: "from-cream-50/50 to-orange-100/50"
    },
    {
      icon: MessageSquare,
      title: "Grievance Management",
      description: "Comprehensive complaint handling with automated workflows and tracking",
      color: "from-orange-300 to-orange-500",
      bgColor: "from-cream-50/50 to-orange-50/50",
      bgGradient: "from-cream-50/50 to-orange-50/50"
    }
  ];

  const stats = [
    { label: "Active Users", value: "50K+", icon: Users },
    { label: "Resolved Cases", value: "25K+", icon: Shield },
    { label: "AI Accuracy", value: "98%", icon: Zap },
    { label: "Response Time", value: "<2hrs", icon: Globe }
  ];

  const testimonials = [
    {
      name: "Dr. Priya Sharma",
      role: "Healthcare Professional",
      content: "The health management system has revolutionized how we track patient data and provide care.",
      rating: 5,
      avatar: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      name: "Rajesh Kumar",
      role: "Farmer",
      content: "Smart agriculture features helped me increase my crop yield by 40% this season.",
      rating: 5,
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      name: "Anita Desai",
      role: "Government Official",
      content: "The grievance management system has made our complaint resolution process incredibly efficient.",
      rating: 5,
      avatar: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    }
  ];

  const handleExplore = () => {
    onNavigate('portal');
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setContactForm({ name: '', email: '', message: '' });
      alert('Thank you for your message! We will get back to you soon.');
    } catch (error) {
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 via-pink-50 to-orange-50 relative overflow-hidden">
      {/* Glassmorphism Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10 backdrop-blur-sm" />
      
      {/* Doodle-style Drawings Overlay */}
      <div className="absolute inset-0 opacity-10">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <defs>
            <pattern id="doodlePattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M10,20 Q30,10 50,20 T90,20" stroke="rgba(0,0,0,0.1)" strokeWidth="2" fill="none" />
              <circle cx="20" cy="40" r="3" fill="rgba(0,0,0,0.1)" />
              <path d="M70,60 Q80,50 90,60" stroke="rgba(0,0,0,0.1)" strokeWidth="2" fill="none" />
              <path d="M15,80 Q25,70 35,80 T55,80" stroke="rgba(0,0,0,0.1)" strokeWidth="2" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#doodlePattern)" />
        </svg>
      </div>

      {/* Liquid Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Liquid Blobs */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="floating-element absolute rounded-full opacity-15 blur-3xl"
            style={{
              width: `${Math.random() * 500 + 300}px`,
              height: `${Math.random() * 500 + 300}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `linear-gradient(${Math.random() * 360}deg, 
                rgba(147, 51, 234, 0.1), 
                rgba(236, 72, 153, 0.08), 
                rgba(251, 146, 60, 0.05))`,
            }}
            animate={{
              x: [0, Math.random() * 200 - 100, 0],
              y: [0, Math.random() * 200 - 100, 0],
              scale: [1, 1.4, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
        
        {/* Animated SVG Waves */}
        <div className="absolute inset-0 opacity-20">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
            <defs>
              <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fed7aa" stopOpacity="0.1"/>
                <stop offset="50%" stopColor="#fdba74" stopOpacity="0.08"/>
                <stop offset="100%" stopColor="#fb923c" stopOpacity="0.05"/>
              </linearGradient>
              <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f97316" stopOpacity="0.08"/>
                <stop offset="50%" stopColor="#ea580c" stopOpacity="0.05"/>
                <stop offset="100%" stopColor="#c2410c" stopOpacity="0.03"/>
              </linearGradient>
            </defs>
            <motion.path
              d="M0,400 C300,200 600,600 1200,300 L1200,800 L0,800 Z"
              fill="url(#waveGradient1)"
              animate={{
                d: [
                  "M0,400 C300,200 600,600 1200,300 L1200,800 L0,800 Z",
                  "M0,300 C300,500 600,100 1200,400 L1200,800 L0,800 Z",
                  "M0,400 C300,200 600,600 1200,300 L1200,800 L0,800 Z"
                ]
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.path
              d="M0,500 C400,300 800,700 1200,400 L1200,800 L0,800 Z"
              fill="url(#waveGradient2)"
              animate={{
                d: [
                  "M0,500 C400,300 800,700 1200,400 L1200,800 L0,800 Z",
                  "M0,600 C400,400 800,200 1200,500 L1200,800 L0,800 Z",
                  "M0,500 C400,300 800,700 1200,400 L1200,800 L0,800 Z"
                ]
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
          </svg>
        </div>
      </div>

      {/* 3D Curved Navbar */}
      <nav 
        ref={navRef}
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-6xl px-4"
      >
        <motion.div
          className={`relative bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-orange-200/30 transition-all duration-700 ${
            scrollY > 50 ? 'bg-white/95 shadow-3xl' : ''
          }`}
          style={{
            clipPath: 'polygon(0 15%, 100% 15%, 100% 85%, 0 85%)',
            borderRadius: '2.5rem',
          }}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="px-10 py-6">
            <div className="flex items-center justify-between">
              {/* Left Navigation */}
              <div className="hidden md:flex items-center space-x-10 flex-1">
                {['Home', 'Features', 'About'].map((item) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-700 hover:text-orange-500 font-medium transition-all duration-300 relative group"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item}
                    <motion.div
                      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-orange-500 group-hover:w-full transition-all duration-300"
                    />
                  </motion.a>
                ))}
              </div>

              {/* Center - Sampurn Samadhan Logo */}
              <motion.div 
                className="flex-1 text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center justify-center space-x-3">
                  {/* Logo Icon */}
                  <img 
                    src="/logo.jpeg" 
                    alt="Sampurn Samadhan Logo" 
                    className="w-12 h-12 rounded-full shadow-lg"
                  />
                  {/* Company Name */}
                  <motion.h1
                    className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600 bg-clip-text text-transparent"
                    animate={{ 
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    style={{ backgroundSize: '200% 200%' }}
                  >
                    Sampurn Samadhan
                  </motion.h1>
                </div>
              </motion.div>

              {/* Right Navigation */}
              <div className="hidden md:flex items-center space-x-10 flex-1 justify-end">
                {['Testimonials'].map((item) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-700 hover:text-orange-500 font-medium transition-all duration-300 relative group"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item}
                    <motion.div
                      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-orange-500 group-hover:w-full transition-all duration-300"
                    />
                  </motion.a>
                ))}
                <motion.button
                  onClick={() => onNavigate('contact')}
                  className="text-gray-700 hover:text-orange-500 font-medium transition-all duration-300 relative group"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact
                  <motion.div
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-orange-500 group-hover:w-full transition-all duration-300"
                  />
                </motion.button>
                <motion.button
                  onClick={handleExplore}
                  className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-8 py-3 rounded-full hover:from-orange-500 hover:to-orange-600 transition-all shadow-lg font-medium"
                  whileHover={{ scale: 1.05, y: -2, boxShadow: "0 15px 30px rgba(251, 146, 60, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore
                </motion.button>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-700 hover:text-orange-500 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>

          {/* 3D Shadow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 to-orange-500/10 rounded-3xl transform translate-y-1 -z-10 blur-sm" />
        </motion.div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-menu"
              className="md:hidden mt-4 bg-white/90 backdrop-blur-2xl rounded-2xl shadow-xl border border-orange-200/30 p-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col space-y-4">
                {['Home', 'Features', 'About', 'Testimonials'].map((item) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-700 hover:text-orange-500 transition-colors text-lg font-medium"
                    whileHover={{ x: 5 }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </motion.a>
                ))}
                <motion.button
                  onClick={() => {
                    onNavigate('contact');
                    setIsMenuOpen(false);
                  }}
                  className="text-gray-700 hover:text-orange-500 transition-colors text-lg font-medium text-left"
                  whileHover={{ x: 5 }}
                >
                  Contact
                </motion.button>
                <motion.button
                  onClick={handleExplore}
                  className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-6 py-3 rounded-full hover:from-orange-500 hover:to-orange-600 transition-all shadow-lg font-medium w-fit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Solutions
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-32">
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-orange-300/60 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: '-10px',
              }}
              animate={{
                y: [-10, -window.innerHeight - 100],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: Math.random() * 12 + 8,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear"
              }}
            />
          ))}
          
          {/* Geometric Liquid Shapes */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`geo-${i}`}
              className="absolute border border-orange-200/10 backdrop-blur-sm"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 60 + 30}px`,
                height: `${Math.random() * 60 + 30}px`,
                borderRadius: Math.random() > 0.5 ? '50%' : '20%',
                background: `linear-gradient(${Math.random() * 360}deg, rgba(251, 146, 60, 0.05), rgba(254, 215, 170, 0.05))`,
              }}
              animate={{
                rotate: 360,
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.6, 0.2],
                x: [0, Math.random() * 50 - 25, 0],
                y: [0, Math.random() * 50 - 25, 0],
              }}
              transition={{
                duration: Math.random() * 25 + 15,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-8 text-center relative z-20">
          <motion.div
            className="hero-title mb-8"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <h1 className="text-7xl md:text-9xl font-bold mb-6 tracking-tight relative">
              <motion.span 
                className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-600 to-purple-600 animate-gradient-fill"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 1 }}
              >
                Sampurn Samadhan
              </motion.span>
              <motion.span 
                className="text-gray-800 block"
                style={{ WebkitTextStroke: '2px rgba(0,0,0,0.1)' }}
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 0.3 }}
                transition={{ duration: 2, delay: 1 }}
              >
                Sampurn Samadhan
              </motion.span>
            </h1>
          </motion.div>

          <motion.p
            className="hero-subtitle text-2xl md:text-4xl text-gray-700 max-w-6xl mx-auto leading-relaxed mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Comprehensive digital solutions powered by artificial intelligence to transform
            <span className="font-semibold text-orange-600"> healthcare</span>,
            <span className="font-semibold text-orange-600"> agriculture</span>, and
            <span className="font-semibold text-orange-600"> governance</span>
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button
              onClick={handleExplore}
              className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-12 py-6 rounded-3xl hover:from-orange-500 hover:to-orange-600 transition-all shadow-2xl flex items-center space-x-4 text-xl font-semibold backdrop-blur-sm border border-orange-300/30"
              whileHover={{ 
                scale: 1.05, 
                y: -2,
                boxShadow: "0 25px 50px rgba(251, 146, 60, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Get Started</span>
              <ArrowRight className="w-6 h-6" />
            </motion.button>
            <motion.button
              onClick={() => window.open('https://studio.youtube.com/playlist?list=PLRPWk8KNIaIMvZ3K3C0nA2GXG7H9dOrOa', '_blank')}
              className="border-2 border-orange-300/50 text-orange-600 px-12 py-6 rounded-3xl hover:bg-orange-50/30 transition-all flex items-center space-x-4 text-xl font-semibold backdrop-blur-sm bg-white/20"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-6 h-6" />
              <span>Watch Demo</span>
            </motion.button>
          </motion.div>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-8 text-lg text-orange-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="flex items-center space-x-3">
              <motion.div
                className="w-2 h-2 bg-orange-400 rounded-full"
                animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span>AI Powered</span>
            </div>
            <div className="flex items-center space-x-3">
              <motion.div
                className="w-2 h-2 bg-orange-400 rounded-full"
                animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
              <span>Secure & Private</span>
            </div>
            <div className="flex items-center space-x-3">
              <motion.div
                className="w-2 h-2 bg-orange-400 rounded-full"
                animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              />
              <span>24/7 Available</span>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-orange-400" />
        </motion.div>
      </section>

      {/* Story Section - Rekha's Journey */}
      <section className="py-32 relative">
        <div className="container mx-auto px-8">
          <div className="animate-on-scroll text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">
              Rekha's Digital Transformation
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto">
              From struggle to empowerment through Sampurn Samadhan's AI-powered solutions
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            {/* Story Content */}
            <div className="animate-on-scroll space-y-8">
              <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-orange-200/30">
                <h3 className="text-3xl font-bold text-gray-800 mb-6">
                  The Challenge - Before Sampurn Samadhan
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Rekha, a 32-year-old educated Indian village woman from rural Maharashtra, faced daily struggles 
                  accessing essential government services. Living 45 kilometers away from the nearest government office, 
                  she felt isolated and depressed, unable to fulfill her family's basic needs.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 text-red-600">
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                    <span className="font-medium">45km travel to nearest government office</span>
                  </div>
                  <div className="flex items-center space-x-4 text-red-600">
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                    <span className="font-medium">Lost 2 days of work for simple document verification</span>
                  </div>
                  <div className="flex items-center space-x-4 text-red-600">
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                    <span className="font-medium">No access to healthcare services for her elderly parents</span>
                  </div>
                  <div className="flex items-center space-x-4 text-red-600">
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                    <span className="font-medium">Agricultural subsidies delayed by 6 months</span>
                  </div>
                  <div className="flex items-center space-x-4 text-red-600">
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                    <span className="font-medium">Frustration with bureaucratic processes and corruption</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-purple-50 rounded-3xl p-8 shadow-xl border border-orange-200/30">
                <h3 className="text-3xl font-bold text-gray-800 mb-6">
                  The Solution - Sampurn Samadhan Platform
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  When Rekha discovered Sampurn Samadhan through a local digital literacy program, everything changed. 
                  Our AI-powered platform brought government services directly to her smartphone, breaking down barriers 
                  of distance, time, and complexity.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">24/7 Access from Home</span>
                  </div>
                  <div className="flex items-center space-x-3 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">AI-Powered Document Processing</span>
                  </div>
                  <div className="flex items-center space-x-3 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Real-time Application Tracking</span>
                  </div>
                  <div className="flex items-center space-x-3 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Secure Digital Payments</span>
                  </div>
                  <div className="flex items-center space-x-3 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Multi-language Support</span>
                  </div>
                  <div className="flex items-center space-x-3 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Instant Grievance Redressal</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-orange-200/30">
                <h3 className="text-3xl font-bold text-gray-800 mb-6">
                  The Transformation - After Sampurn Samadhan
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Today, Rekha is empowered and confident. She manages her family's healthcare, agricultural needs, 
                  and grievance redressal from the comfort of her home. Her story inspires others in her village 
                  to embrace digital solutions.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 text-green-600">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="font-medium">Healthcare access improved by 90% - parents get regular checkups</span>
                  </div>
                  <div className="flex items-center space-x-4 text-green-600">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="font-medium">Agricultural subsidies received within 2 weeks instead of 6 months</span>
                  </div>
                  <div className="flex items-center space-x-4 text-green-600">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="font-medium">Saved 15+ hours monthly on government service visits</span>
                  </div>
                  <div className="flex items-center space-x-4 text-green-600">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="font-medium">Became village digital literacy champion, helping 25+ families</span>
                  </div>
                  <div className="flex items-center space-x-4 text-green-600">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="font-medium">Income increased by 30% due to better service access</span>
                  </div>
                </div>
                <div className="mt-6 flex items-center space-x-4 text-purple-600">
                  <Sparkles className="w-6 h-6" />
                  <span className="font-semibold text-lg">Empowered • Confident • Independent • Digital Leader</span>
                </div>
              </div>
            </div>

            {/* Visual Story */}
            <div className="animate-on-scroll space-y-8">
              {/* Before Image */}
              <div className="relative">
                <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-6 shadow-xl border border-red-200/30">
                  <h4 className="text-xl font-bold text-gray-800 mb-4 text-center">Before: The Struggle</h4>
                  <div className="relative rounded-2xl overflow-hidden">
                    <img
                      src="/rekha 1.png"
                      alt="Rekha struggling with limited access to government services"
                      className="w-full h-96 object-contain rounded-2xl bg-gray-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-red-900/20 to-transparent rounded-2xl pointer-events-none"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="text-sm font-medium mb-2">Rekha's daily struggles:</p>
                      <ul className="text-xs space-y-1">
                        <li>• 45km travel to offices</li>
                        <li>• Lost work days</li>
                        <li>• Delayed services</li>
                        <li>• No healthcare access</li>
                        <li>• Agricultural delays</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* After Image */}
              <div className="relative">
                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-6 shadow-xl border border-green-200/30">
                  <h4 className="text-xl font-bold text-gray-800 mb-4 text-center">After: The Empowerment</h4>
                  <div className="relative rounded-2xl overflow-hidden">
                    <img
                      src="/rekha 2.png"
                      alt="Rekha empowered with digital access through Sampurn Samadhan"
                      className="w-full h-96 object-contain rounded-2xl bg-gray-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent rounded-2xl pointer-events-none"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="text-sm font-medium mb-2">Rekha's new capabilities:</p>
                      <ul className="text-xs space-y-1">
                        <li>• 24/7 service access</li>
                        <li>• AI-powered assistance</li>
                        <li>• Real-time tracking</li>
                        <li>• Healthcare at home</li>
                        <li>• Village digital leader</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transformation Arrow */}
              <div className="flex justify-center">
                <motion.div
                  className="w-16 h-16 bg-gradient-to-r from-orange-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ArrowRight className="w-8 h-8 text-white" />
                </motion.div>
              </div>

              {/* Impact Metrics */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-6 shadow-xl border border-purple-200/30">
                <h4 className="text-xl font-bold text-gray-800 mb-4 text-center">Impact Metrics</h4>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-white/60 rounded-2xl p-4">
                    <div className="text-2xl font-bold text-purple-600">90%</div>
                    <div className="text-sm text-gray-600">Healthcare Access</div>
                  </div>
                  <div className="bg-white/60 rounded-2xl p-4">
                    <div className="text-2xl font-bold text-green-600">15+ hrs</div>
                    <div className="text-sm text-gray-600">Time Saved/Month</div>
                  </div>
                  <div className="bg-white/60 rounded-2xl p-4">
                    <div className="text-2xl font-bold text-orange-600">30%</div>
                    <div className="text-sm text-gray-600">Income Increase</div>
                  </div>
                  <div className="bg-white/60 rounded-2xl p-4">
                    <div className="text-2xl font-bold text-blue-600">25+</div>
                    <div className="text-sm text-gray-600">Families Helped</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 relative">
        <div className="container mx-auto px-8">
          <div className="animate-on-scroll text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">Our Smart Solutions</h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto">
              Discover how AI is revolutionizing healthcare, agriculture, and governance
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  className="animate-on-scroll bg-white/40 backdrop-blur-xl rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer border border-orange-100/50 group relative overflow-hidden"
                  whileHover={{ scale: 1.02, y: -5 }}
                  onClick={handleExplore}
                >
                  {/* Glassmorphism Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent backdrop-blur-sm rounded-3xl" />
                  
                  <div className="relative z-10">
                    <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-12 h-12 text-white" />
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 group-hover:text-orange-600 transition-colors">
                      {feature.title}
                    </h3>

                    <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                      {feature.description}
                    </p>

                    <div className="flex items-center space-x-3 text-lg font-medium text-orange-500 group-hover:translate-x-2 transition-transform duration-300">
                      <span>Learn More</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 bg-white/20 backdrop-blur-sm">
        <div className="container mx-auto px-8">
          <div className="animate-on-scroll bg-white/40 backdrop-blur-xl rounded-3xl p-12 md:p-16 shadow-xl border border-orange-100/50">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">Impact Numbers</h2>
              <p className="text-xl md:text-2xl text-gray-600">Transforming lives through technology</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    className="text-center group"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 group-hover:text-orange-500 transition-colors duration-300">
                      {stat.value}
                    </div>
                    <div className="text-lg md:text-xl text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-on-scroll">
              <h2 className="text-5xl font-bold text-gray-900 mb-8">About Sampurn Samadhan</h2>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                We are pioneering the future of digital governance through AI-powered solutions that make essential services more accessible, efficient, and user-friendly.
              </p>
              <div className="space-y-6">
                {[
                  { icon: Target, title: "Our Mission", desc: "To democratize access to essential services through technology" },
                  { icon: Lightbulb, title: "Our Vision", desc: "A world where AI enhances human potential and well-being" },
                  { icon: Award, title: "Our Values", desc: "Innovation, accessibility, security, and user-centricity" }
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-gray-700">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="animate-on-scroll">
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Team collaboration and innovation in digital technology"
                  className="rounded-3xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-400/20 to-transparent rounded-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white/30 backdrop-blur-sm">
        <div className="container mx-auto px-8">
          <div className="animate-on-scroll text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">What Our Users Say</h2>
            <p className="text-2xl text-gray-700 max-w-4xl mx-auto">
              Real stories from people whose lives have been transformed by our solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="animate-on-scroll bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-orange-200/30"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{testimonial.name}</h3>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24">
        <div className="container mx-auto px-8">
          <div className="animate-on-scroll text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">How It Works</h2>
            <p className="text-2xl text-gray-700 max-w-4xl mx-auto">
              Simple steps to access our comprehensive solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { step: "01", title: "Sign Up", desc: "Create your account in minutes", icon: Users },
              { step: "02", title: "Choose Service", desc: "Select from our three main portals", icon: Target },
              { step: "03", title: "AI Analysis", desc: "Our AI processes your requirements", icon: Zap },
              { step: "04", title: "Get Results", desc: "Receive personalized solutions", icon: CheckCircle }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  className="animate-on-scroll text-center group"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="relative w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center mx-auto shadow-2xl group-hover:shadow-3xl transition-all duration-300">
                    <Icon className="w-12 h-12 text-white" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-sm font-bold text-orange-600">{item.step}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white/30 backdrop-blur-sm">
        <div className="container mx-auto px-8">
          <div className="animate-on-scroll text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <p className="text-2xl text-gray-700 max-w-4xl mx-auto">
              Everything you need to know about our platform
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                q: "How secure is my data on your platform?",
                a: "We use enterprise-grade encryption and follow strict data protection protocols to ensure your information is completely secure."
              },
              {
                q: "Can I access all three services with one account?",
                a: "Yes! One account gives you access to all our health, agriculture, and grievance management solutions."
              },
              {
                q: "Is there a mobile app available?",
                a: "Our platform is fully responsive and works seamlessly on all devices. A dedicated mobile app is coming soon."
              },
              {
                q: "How accurate is the AI analysis?",
                a: "Our AI models achieve 98% accuracy and are continuously improved with new data and user feedback."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="animate-on-scroll bg-white/60 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-orange-200/30"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">{faq.q}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-8">
          <motion.div
            className="animate-on-scroll bg-gradient-to-r from-orange-400 to-orange-500 rounded-3xl p-16 text-white text-center relative overflow-hidden"
            whileHover={{ scale: 1.01 }}
          >
            {/* Liquid Background Effect */}
            <div className="absolute inset-0 opacity-30">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-white/20"
                  style={{
                    width: `${Math.random() * 200 + 100}px`,
                    height: `${Math.random() * 200 + 100}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    x: [0, Math.random() * 50 - 25, 0],
                    y: [0, Math.random() * 50 - 25, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: Math.random() * 6 + 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
            
            <div className="relative z-10">
              <h2 className="text-5xl font-bold mb-6">Ready to Transform Your Experience?</h2>
              <p className="text-2xl mb-10 opacity-90">
                Join thousands of users who are already benefiting from our smart solutions
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-6">
                <motion.button
                  onClick={handleExplore}
                  className="bg-white text-orange-600 px-12 py-6 rounded-2xl hover:bg-orange-50 transition-all shadow-2xl flex items-center space-x-4 text-xl font-semibold"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Get Started Now</span>
                  <ArrowRight className="w-6 h-6" />
                </motion.button>
                <motion.a
                  onClick={() => onNavigate('contact')}
                  className="border-2 border-white/30 text-white px-12 py-6 rounded-2xl hover:bg-white/10 transition-all flex items-center space-x-4 text-xl font-semibold cursor-pointer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Contact Us</span>
                  <ArrowRight className="w-6 h-6" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">Sampurn Samadhan</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Transforming lives through AI-powered digital solutions for healthcare, agriculture, and governance.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Solutions</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Health Management</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Smart Agriculture</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Grievance System</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Connect</h3>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors text-left">Contact Us</button></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
              <div className="flex space-x-4 mt-4">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-orange-500 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Sampurn Samadhan. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;