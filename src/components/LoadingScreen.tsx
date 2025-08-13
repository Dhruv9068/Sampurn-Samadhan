import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Leaf, MessageSquare } from 'lucide-react';

interface LoadingScreenProps {
  isLoading: boolean;
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading, onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const loadingSteps = [
    { icon: Sparkles, text: 'Initializing Sampurn Samadhan', color: 'from-orange-400 to-orange-600' },
    { icon: Heart, text: 'Loading Health Management System', color: 'from-red-400 to-red-600' },
    { icon: Leaf, text: 'Loading Agriculture System', color: 'from-green-400 to-green-600' },
    { icon: MessageSquare, text: 'Loading Grievance Management', color: 'from-blue-400 to-blue-600' },
    { icon: Sparkles, text: 'AI Systems Ready', color: 'from-purple-400 to-purple-600' }
  ];

  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(prev);
          onLoadingComplete();
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= loadingSteps.length - 1) {
          clearInterval(stepInterval);
          return loadingSteps.length - 1;
        }
        return prev + 1;
      });
    }, 800);

    return () => {
      clearInterval(interval);
      clearInterval(stepInterval);
    };
  }, [isLoading, onLoadingComplete]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-purple-50 via-pink-50 to-orange-50 z-50 flex items-center justify-center">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10 backdrop-blur-sm" />
        
        {/* Floating Elements */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-20 blur-3xl"
            style={{
              width: `${Math.random() * 400 + 200}px`,
              height: `${Math.random() * 400 + 200}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `linear-gradient(${Math.random() * 360}deg, 
                rgba(147, 51, 234, 0.1), 
                rgba(236, 72, 153, 0.08), 
                rgba(251, 146, 60, 0.05))`,
            }}
            animate={{
              x: [0, Math.random() * 150 - 75, 0],
              y: [0, Math.random() * 150 - 75, 0],
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: Math.random() * 10 + 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Loading Content */}
      <div className="relative z-10 text-center max-w-md mx-auto px-8">
        {/* Logo */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center justify-center space-x-3 mb-6">
            <img 
              src="/logo.jpeg" 
              alt="Sampurn Samadhan Logo" 
              className="w-16 h-16 rounded-2xl shadow-2xl"
            />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600 bg-clip-text text-transparent">
              Sampurn Samadhan
            </h1>
          </div>
        </motion.div>

        {/* Current Step */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className={`w-12 h-12 bg-gradient-to-br ${loadingSteps[currentStep].color} rounded-xl flex items-center justify-center shadow-lg`}>
              {React.createElement(loadingSteps[currentStep].icon, { className: "w-6 h-6 text-white" })}
            </div>
            <span className="text-lg font-medium text-gray-700">
              {loadingSteps[currentStep].text}
            </span>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-orange-400 to-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="mt-2 text-sm text-gray-600">
            {Math.round(progress)}% Complete
          </div>
        </div>

        {/* Loading Animation */}
        <motion.div
          className="flex justify-center space-x-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
          <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="mt-8 text-gray-600 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Transforming lives through AI-powered digital solutions
        </motion.p>
      </div>
    </div>
  );
};

export default LoadingScreen;