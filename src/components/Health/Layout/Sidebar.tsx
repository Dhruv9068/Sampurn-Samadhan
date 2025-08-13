import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Activity, BarChart3, Bot, LogOut, ArrowLeft } from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: 'dashboard' | 'tracker' | 'analytics' | 'assistant') => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onPageChange, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Health Overview', icon: LayoutDashboard },
    { id: 'tracker', label: 'Health Tracker', icon: Activity },
    { id: 'analytics', label: 'Health Analytics', icon: BarChart3 },
    { id: 'assistant', label: 'AI Assistant', icon: Bot },
  ];

  return (
    <motion.div className="fixed lg:static inset-y-0 left-0 z-50 w-[32vh] 
          bg-gradient-to-b from-blue-50 to-blue-100 shadow-xl border-r border-cyan-200
          lg:translate-x-0 lg:shadow-lg  flex flex-col">
      {/* Header */}
      <div className="px-4 py-8 border-b border-blue-200">
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-blue-900">Sampurn Samadhan</h2>
            <p className="text-blue-600 text-sm">Smart Health Management</p>
          </div>
        </div>
        
        {/* Back to Portal Button */}
        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-3 p-3 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-xl transition-all group"
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
                className={`w-full flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                    : 'text-blue-700 hover:bg-blue-100 hover:text-blue-900'
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-blue-600'}`} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* User Section */}
      <div className="p-6 border-t border-blue-200">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-sm">HU</span>
          </div>
          <div>
            <p className="font-semibold text-blue-900">Health User</p>
            <p className="text-blue-600 text-sm">Patient</p>
          </div>
        </div>
        
        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-3 p-3 text-blue-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    {/** Top Background effects */}
    <div className="absolute inset-0 pointer-events-none z-0">
      <div className="absolute top-10 left-10 w-32 h-32 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-aura-pulse"></div>
      <div className="absolute bottom-20 right-5 w-24 h-24 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-aura-pulse" style={{ animationDelay: '2s' }}></div>
    </div>
    </motion.div>
  );
};

export default Sidebar;