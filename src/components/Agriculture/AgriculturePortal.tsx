import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import AgricultureHeader from './pages/AgricultureHeader';
import AgricultureSidebar from './pages/AgricultureSidebar';
import AgricultureDashboard from './pages/AgricultureDashboard';
import AgricultureAIAssistant from './pages/AgricultureAIAssistant';
import CropMonitor from './pages/CropMonitor';
import AgricultureAnalytics from './pages/AgricultureAnalytics';

const AgriculturePortal: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'crop-monitor' | 'analytics' | 'assistant'>('dashboard');

  // Sync currentPage with URL
  useEffect(() => {
    const path = location.pathname;
    if (path === '/agriculture' || path === '/agriculture/') {
      setCurrentPage('dashboard');
    } else if (path === '/agriculture/crop-monitor') {
      setCurrentPage('crop-monitor');
    } else if (path === '/agriculture/analytics') {
      setCurrentPage('analytics');
    } else if (path === '/agriculture/ai-assistant') {
      setCurrentPage('assistant');
    }
  }, [location.pathname]);

  const handlePageChange = (page: 'dashboard' | 'crop-monitor' | 'analytics' | 'assistant') => {
    setCurrentPage(page);
    switch (page) {
      case 'dashboard':
        navigate('/agriculture');
        break;
      case 'crop-monitor':
        navigate('/agriculture/crop-monitor');
        break;
      case 'analytics':
        navigate('/agriculture/analytics');
        break;
      case 'assistant':
        navigate('/agriculture/ai-assistant');
        break;
    }
  };

  const handleLogout = () => {
    navigate('/portal');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <AgricultureSidebar 
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onLogout={handleLogout}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <AgricultureHeader currentPage={currentPage} />
        
        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <Routes>
            <Route path="/" element={<AgricultureDashboard />} />
            <Route path="/ai-assistant" element={<AgricultureAIAssistant />} />
            <Route path="/crop-monitor" element={<CropMonitor />} />
            <Route path="/analytics" element={<AgricultureAnalytics />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AgriculturePortal;
