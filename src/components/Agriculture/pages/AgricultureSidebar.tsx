import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Leaf, BarChart3, Bot, LogOut, ArrowLeft } from 'lucide-react';

interface AgricultureSidebarProps {
  currentPage: string;
  onPageChange: (page: 'dashboard' | 'crop-monitor' | 'analytics' | 'assistant') => void;
  onLogout: () => void;
}

const AgricultureSidebar: React.FC<AgricultureSidebarProps> = ({ currentPage, onPageChange, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Farm Overview', icon: LayoutDashboard },
    { id: 'crop-monitor', label: 'Crop Monitor', icon: Leaf },
    { id: 'analytics', label: 'Farm Analytics', icon: BarChart3 },
    { id: 'assistant', label: 'AI Assistant', icon: Bot },
  ];

  return (
    <motion.div className="w-64 bg-gradient-to-b from-green-50 to-green-100 shadow-xl border-r-2 border-r-green-200 flex flex-col">
      {/* Header */}
      <div className="py-8 px-4">
        <div className="flex items-center space-x-3 mb-6">
          <div className="mt-1 w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center shadow-lg">
            <Leaf className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-green-900">Sampurn Samadhan</h2>
            <p className="text-green-600 text-sm">Smart Agriculture System</p>
          </div>
        </div>
        
        {/* Back to Portal Button */}
        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-3 p-3 text-green-600 hover:text-green-800 hover:bg-green-100 rounded-xl transition-all group"
          title="Back to Portal"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Portal</span>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6">
        <div className="space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id as any)}
                className={`w-full flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 focus:outline-none ${
                  isActive
                    ? 'bg-gradient-to-r from-green-600 to-green-700 text-white'
                    : 'text-green-700 hover:bg-green-100 hover:text-green-900'
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-green-600'}`} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* User Section */}
      <div className="p-6 border-t border-green-200">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-sm">AU</span>
          </div>
          <div>
            <p className="font-semibold text-green-900">Agriculture User</p>
            <p className="text-green-600 text-sm">Farm Manager</p>
          </div>
        </div>
        
        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-3 p-3 text-green-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
      {/** Sidebar Background effects */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-aura-pulse"></div>
        <div className="absolute bottom-20 right-5 w-24 h-24 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-aura-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
    </motion.div>
  );
};

export default AgricultureSidebar;