import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, Eye, EyeOff, Mail, Lock, User, Phone, 
  ArrowLeft, CheckCircle, AlertCircle, Loader
} from 'lucide-react';

interface LoginPageProps {
  onLogin: (user: any) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      if (loginForm.email && loginForm.password) {
        const userData = {
          id: '1',
          name: 'John Doe',
          email: loginForm.email,
          avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
        };
        onLogin(userData);
        setSuccess('Login successful! Redirecting...');
        setTimeout(() => navigate('/portal'), 1000);
      } else {
        setError('Please fill in all fields');
      }
      setLoading(false);
    }, 1500);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    if (signupForm.password !== signupForm.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      if (signupForm.name && signupForm.email && signupForm.password) {
        const userData = {
          id: '1',
          name: signupForm.name,
          email: signupForm.email,
          avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
        };
        onLogin(userData);
        setSuccess('Account created successfully! Redirecting...');
        setTimeout(() => navigate('/portal'), 1000);
      } else {
        setError('Please fill in all fields');
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Liquid Background Blobs */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-orange-200/20 to-orange-300/10 blur-3xl"
            style={{
              width: `${Math.random() * 300 + 200}px`,
              height: `${Math.random() * 300 + 200}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 50 - 25, 0],
              y: [0, Math.random() * 50 - 25, 0],
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Back Button */}
      <motion.button
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 z-10 flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Home</span>
      </motion.button>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-orange-200/50 w-full max-w-md overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-8 text-white text-center">
            <motion.div
              className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-10 h-10" />
            </motion.div>
            <h1 className="text-2xl font-bold mb-2">Sampurn Samadhan</h1>
            <p className="opacity-90">
              {isLogin ? 'Welcome back!' : 'Join us today!'}
            </p>
          </div>

          {/* Form Container */}
          <div className="p-8">
            {/* Toggle Buttons */}
            <div className="flex bg-gray-100 rounded-2xl p-1 mb-8">
              <motion.button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                  isLogin 
                    ? 'bg-white text-orange-600 shadow-md' 
                    : 'text-gray-600 hover:text-orange-600'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Login
              </motion.button>
              <motion.button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                  !isLogin 
                    ? 'bg-white text-orange-600 shadow-md' 
                    : 'text-gray-600 hover:text-orange-600'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Sign Up
              </motion.button>
            </div>

            {/* Error/Success Messages */}
            <AnimatePresence>
              {error && (
                <motion.div
                  className="flex items-center space-x-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <AlertCircle className="w-5 h-5" />
                  <span>{error}</span>
                </motion.div>
              )}
              {success && (
                <motion.div
                  className="flex items-center space-x-2 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-6"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>{success}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Forms */}
            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.form
                  key="login"
                  onSubmit={handleLogin}
                  className="space-y-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                        className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        placeholder="Enter your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                      <span className="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                    <a href="#" className="text-sm text-orange-600 hover:text-orange-700">
                      Forgot password?
                    </a>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                  >
                    {loading ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        <span>Signing in...</span>
                      </>
                    ) : (
                      <span>Sign In</span>
                    )}
                  </motion.button>
                </motion.form>
              ) : (
                <motion.form
                  key="signup"
                  onSubmit={handleSignup}
                  className="space-y-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={signupForm.name}
                        onChange={(e) => setSignupForm({...signupForm, name: e.target.value})}
                        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={signupForm.email}
                        onChange={(e) => setSignupForm({...signupForm, email: e.target.value})}
                        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        value={signupForm.phone}
                        onChange={(e) => setSignupForm({...signupForm, phone: e.target.value})}
                        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={signupForm.password}
                        onChange={(e) => setSignupForm({...signupForm, password: e.target.value})}
                        className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        placeholder="Create a password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={signupForm.confirmPassword}
                        onChange={(e) => setSignupForm({...signupForm, confirmPassword: e.target.value})}
                        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        placeholder="Confirm your password"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-start">
                    <input type="checkbox" className="rounded border-gray-300 text-orange-600 focus:ring-orange-500 mt-1" required />
                    <span className="ml-2 text-sm text-gray-600">
                      I agree to the <a href="#" className="text-orange-600 hover:text-orange-700">Terms of Service</a> and <a href="#" className="text-orange-600 hover:text-orange-700">Privacy Policy</a>
                    </span>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                  >
                    {loading ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        <span>Creating account...</span>
                      </>
                    ) : (
                      <span>Create Account</span>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Demo Credentials */}
            <div className="mt-8 p-4 bg-orange-50 border border-orange-200 rounded-xl">
              <h3 className="text-sm font-semibold text-orange-800 mb-2">Demo Credentials:</h3>
              <p className="text-sm text-orange-700">
                Email: demo@example.com<br />
                Password: demo123
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;