import React from 'react';

interface AgricultureHeaderProps {
  currentPage: string;
}

const AgricultureHeader: React.FC<AgricultureHeaderProps> = ({ currentPage }) => {
  const getPageTitle = () => {
    switch (currentPage) {
      case 'dashboard': return 'Farm Overview';
      case 'crop-monitor': return 'Crop Monitor';
      case 'analytics': return 'Farm Analytics';
      case 'assistant': return 'AI Farm Assistant';
      default: return 'Smart Agriculture';
    }
  };

  const getPageDescription = () => {
    switch (currentPage) {
      case 'dashboard': return 'Monitor your crops and farm operations';
      case 'crop-monitor': return 'Track crop health and detect diseases';
      case 'analytics': return 'Analyze farm data and yield predictions';
      case 'assistant': return 'AI-powered farming guidance and support';
      default: return 'Smart Agriculture Management System';
    }
  };

  return (
    <header className="bg-gradient-to-br from-green-50 to-emerald-50 shadow-sm border-b border-green-200 px-8 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-black bg-clip-text text-transparent">
            {getPageTitle()}
          </h1>
          <p className="text-green-600 mt-1">{getPageDescription()}</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm font-medium text-green-800">{new Date().toLocaleDateString('en-US', { 
              weekday: 'long',
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
            <p className="text-xs text-green-500">{new Date().toLocaleTimeString()}</p>
          </div>
          
          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold">SA</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AgricultureHeader;