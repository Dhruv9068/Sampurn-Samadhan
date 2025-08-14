import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Layout } from './Layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Chat } from './pages/Chat';
import { Settings } from './pages/Settings';
import { Search } from './pages/Search';
import { Departments } from './pages/Departments';
import { Analytics } from './pages/Analytics';
import { Complaints } from './pages/Complaints';

const GrievancePortal: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToPortal = () => {
    navigate('/portal');
  };

  return (
    <Layout setCurrentPortal={() => handleBackToPortal()}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/search" element={<Search />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/complaints" element={<Complaints />} />
      </Routes>
    </Layout>
  );
};

export default GrievancePortal;