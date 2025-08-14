import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from './Layout/Header';
import Sidebar from './Layout/Sidebar';
import Dashboard from './Pages/Dashboard';
import AIAssistant from './Pages/AIAssistant';
import HealthTracker from './Pages/HealthTracker';
import Analytics from './Pages/Analytics';

const HealthPortal: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'tracker' | 'analytics' | 'assistant'>('dashboard');

  // Sync currentPage with URL
  useEffect(() => {
    const path = location.pathname;
    if (path === '/health' || path === '/health/') {
      setCurrentPage('dashboard');
    } else if (path === '/health/tracker') {
      setCurrentPage('tracker');
    } else if (path === '/health/analytics') {
      setCurrentPage('analytics');
    } else if (path === '/health/ai-assistant') {
      setCurrentPage('assistant');
    }
  }, [location.pathname]);

  const handlePageChange = (page: 'dashboard' | 'tracker' | 'analytics' | 'assistant') => {
    setCurrentPage(page);
    switch (page) {
      case 'dashboard':
        navigate('/health');
        break;
      case 'tracker':
        navigate('/health/tracker');
        break;
      case 'analytics':
        navigate('/health/analytics');
        break;
      case 'assistant':
        navigate('/health/ai-assistant');
        break;
    }
  };

  const handleLogout = () => {
    navigate('/portal');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onLogout={handleLogout}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header currentPage={currentPage} />
        
        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ai-assistant" element={<AIAssistant />} />
            <Route path="/tracker" element={<HealthTracker />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default HealthPortal;
