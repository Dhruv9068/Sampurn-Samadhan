import React from 'react';

interface HeaderProps {
  currentPage: string;
}

const Header: React.FC<HeaderProps> = ({ currentPage }) => {
  const getPageTitle = () => {
    switch (currentPage) {
      case 'dashboard': 
      case 'tracker':
      case 'analytics':
      case 'assistant':
        return 'Health Overview';
      default: return 'Sampurn Samadhan';
    }
  };

  const getPageDescription = () => {
    switch (currentPage) {
      case 'dashboard':
      case 'tracker':
      case 'analytics':
      case 'assistant':
        return 'Monitor your wellness journey';
      default: return 'Smart Health Management System';
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 px-8 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            {getPageTitle()}
          </h1>
          <p className="text-slate-600 mt-1">{getPageDescription()}</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm font-medium text-slate-800">{new Date().toLocaleDateString('en-US', { 
              weekday: 'long',
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
            <p className="text-xs text-slate-500">{new Date().toLocaleTimeString()}</p>
          </div>
          
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold">SS</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;