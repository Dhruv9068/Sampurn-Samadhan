import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Leaf, MessageSquare, Zap, Globe, Shield, Users } from 'lucide-react';

// Inspirational quotes related to Sampurn Samadhan
const quotes = [
  {
    text: "Transforming lives through technology, one solution at a time.",
    author: "Sampurn Samadhan",
    icon: Sparkles
  },
  {
    text: "Empowering communities with AI-driven solutions for a better tomorrow.",
    author: "Sampurn Samadhan",
    icon: Heart
  },
  {
    text: "Where innovation meets compassion, creating lasting impact.",
    author: "Sampurn Samadhan",
    icon: Leaf
  },
  {
    text: "Building bridges between technology and human welfare.",
    author: "Sampurn Samadhan",
    icon: MessageSquare
  },
  {
    text: "Accelerating progress through intelligent digital solutions.",
    author: "Sampurn Samadhan",
    icon: Zap
  },
  {
    text: "Connecting the world through smart governance and healthcare.",
    author: "Sampurn Samadhan",
    icon: Globe
  },
  {
    text: "Securing futures with trusted, reliable digital platforms.",
    author: "Sampurn Samadhan",
    icon: Shield
  },
  {
    text: "Uniting technology and humanity for collective growth.",
    author: "Sampurn Samadhan",
    icon: Users
  }
];

const LoadingScreen: React.FC = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Rotate quotes every 3 seconds
    const quoteInterval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 3000);

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => {
      clearInterval(quoteInterval);
      clearInterval(progressInterval);
    };
  }, []);

  const currentQuote = quotes[currentQuoteIndex];
  const IconComponent = currentQuote.icon;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-white">
      {/* Soft Glow Background */}
      <div 
        className="absolute inset-0 transition-all duration-1000 ease-out"
        style={{ 
          background: `linear-gradient(
            to bottom,
            rgba(255, 154, 72, 0.15), /* Soft Orange */
            rgba(203, 141, 255, 0.08) /* Soft Purple */
          )`
        }}
      />
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-orange-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
        
        {/* Animated waves */}
        <div className="absolute bottom-0 left-0 right-0 h-32 opacity-15">
          <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path
              d="M0,0 C300,60 600,30 1200,60 L1200,120 L0,120 Z"
              fill="url(#waveGradient)"
              className="animate-pulse"
            />
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff9a48" stopOpacity="0.3"/>
                <stop offset="50%" stopColor="#cb8dff" stopOpacity="0.2"/>
                <stop offset="100%" stopColor="#ff9a48" stopOpacity="0.3"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-2xl">
            <img 
              src="/logo.jpeg" 
              alt="Sampurn Samadhan Logo" 
              className="w-16 h-16 rounded-full object-cover"
            />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 drop-shadow-sm"
        >
          <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 bg-clip-text text-transparent">
            Sampurn Samadhan
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-xl md:text-2xl text-gray-700 mb-12 font-medium drop-shadow-sm"
        >
          Complete Digital Solutions Platform
        </motion.p>

        {/* Quote Section */}
        <motion.div
          key={currentQuoteIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="bg-white/90 rounded-2xl p-8 shadow-xl border border-orange-200/30">
            <div className="flex items-center justify-center mb-4">
              <IconComponent className="w-8 h-8 text-orange-500" />
            </div>
            <blockquote className="text-lg md:text-xl text-gray-700 italic mb-4 leading-relaxed">
              "{currentQuote.text}"
            </blockquote>
            <cite className="text-orange-600 font-semibold">
              — {currentQuote.author}
            </cite>
          </div>
        </motion.div>

        {/* Loading Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-8"
        >
          <div className="w-full max-w-md mx-auto">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Loading...</span>
              <span>{Math.round(loadingProgress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${loadingProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-gray-600 text-sm font-medium drop-shadow-sm"
        >
          Preparing your digital experience...
        </motion.p>
      </div>

      {/* Corner Accents */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute top-8 right-8 w-16 h-16 bg-gradient-to-br from-orange-400/20 to-orange-600/20 rounded-full"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-8 w-12 h-12 bg-gradient-to-br from-purple-400/20 to-purple-600/20 rounded-full"
      />
    </div>
  );
};

export default LoadingScreen;