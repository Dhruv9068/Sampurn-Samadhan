import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Phone, Mail, MapPin, Send, Clock, MessageSquare, 
  Facebook, Twitter, Instagram, Linkedin, ArrowLeft
} from 'lucide-react';

const Contact: React.FC = () => {
  const navigate = useNavigate();
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setContactForm({ name: '', email: '', subject: '', message: '' });
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

  const contactInfo = [
    { icon: Phone, title: "Phone", info: "+91 98765 43210", subInfo: "Mon-Fri 9AM-6PM" },
    { icon: Mail, title: "Email", info: "hello@sampurnsamadhan.com", subInfo: "24/7 Support" },
    { icon: MapPin, title: "Address", info: "123 Tech Park, Innovation City", subInfo: "India" },
    { icon: Clock, title: "Business Hours", info: "Monday - Friday", subInfo: "9:00 AM - 6:00 PM" }
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-white">
      {/* Soft Glow Background */}
      <div 
        className="fixed inset-0 transition-all duration-1000 ease-out"
        style={{ 
          background: `linear-gradient(
            to bottom,
            rgba(255, 154, 72, 0.12), /* Soft Orange */
            rgba(203, 141, 255, 0.06) /* Soft Purple */
          )`
        }}
      />
      
      {/* Subtle Glassmorphism Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10" />
      
      {/* Doodle-style Drawings Overlay */}
      <div className="absolute inset-0 opacity-10">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <defs>
            <pattern id="contactDoodlePattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M10,20 Q30,10 50,20 T90,20" stroke="rgba(0,0,0,0.1)" strokeWidth="2" fill="none" />
              <circle cx="20" cy="40" r="3" fill="rgba(0,0,0,0.1)" />
              <path d="M70,60 Q80,50 90,60" stroke="rgba(0,0,0,0.1)" strokeWidth="2" fill="none" />
              <path d="M15,80 Q25,70 35,80 T55,80" stroke="rgba(0,0,0,0.1)" strokeWidth="2" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contactDoodlePattern)" />
        </svg>
      </div>

      {/* Header */}
      <header className="relative z-10 pt-8 pb-16">
        <div className="container mx-auto px-8">
          <motion.button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 transition-colors mb-8"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </motion.button>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-orange-500 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              Get In Touch
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Have questions about our services? We'd love to hear from you. 
              Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 pb-32">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
            {/* Contact Information */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-orange-200/30">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">Contact Information</h2>
                <div className="space-y-6">
                  {contactInfo.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={index}
                        className="flex items-start space-x-4 group"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h3>
                          <p className="text-gray-700 font-medium">{item.info}</p>
                          <p className="text-gray-500 text-sm">{item.subInfo}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-gradient-to-r from-orange-50 to-purple-50 rounded-3xl p-8 shadow-xl border border-orange-200/30">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Follow Us</h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={index}
                        href={social.href}
                        className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-orange-400 hover:to-purple-500 hover:text-white transition-all duration-300 shadow-lg"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={social.label}
                      >
                        <Icon className="w-6 h-6" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>

              {/* Office Hours */}
              <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-orange-200/30">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Office Hours</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-700">Monday - Friday</span>
                    <span className="font-semibold text-gray-900">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-700">Saturday</span>
                    <span className="font-semibold text-gray-900">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700">Sunday</span>
                    <span className="font-semibold text-gray-900">Closed</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-orange-200/30">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-purple-500 rounded-xl flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800">Send Message</h2>
                    <p className="text-gray-600">We'll get back to you within 24 hours</p>
                  </div>
                </div>

                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={contactForm.name}
                        onChange={handleInputChange}
                        required
                        className="w-full p-4 border border-orange-200/50 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={contactForm.email}
                        onChange={handleInputChange}
                        required
                        className="w-full p-4 border border-orange-200/50 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      value={contactForm.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 border border-orange-200/50 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                      placeholder="What is this about?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={contactForm.message}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 border border-orange-200/50 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all resize-none bg-white/50 backdrop-blur-sm"
                      placeholder="Tell us more about your inquiry..."
                    ></textarea>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-orange-400 to-purple-500 text-white py-4 rounded-xl hover:from-orange-500 hover:to-purple-600 transition-all shadow-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
                    whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    <Send className="w-5 h-5" />
                    <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;