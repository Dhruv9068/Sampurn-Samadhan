import React from 'react';
import { MemoryRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './Layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Complaints } from './pages/Complaints';
import { Analytics } from './pages/Analytics';
import { Departments } from './pages/Departments';
import { Search } from './pages/Search';
import { Settings } from './pages/Settings';
import { Toaster } from 'react-hot-toast';
import { Chat } from './pages/Chat';

type PortalType = 'landing' | 'portal' | 'health' | 'agriculture' | 'grievance' | 'contact';

interface GrievancePortalProps {
  setCurrentPortal?: React.Dispatch<React.SetStateAction<PortalType>>;
}

export const GrievancePortal: React.FC<GrievancePortalProps> = ({ setCurrentPortal }) => {
  return (
    <MemoryRouter initialEntries={['/dashboard']}>
      <Layout setCurrentPortal={setCurrentPortal}> {/* Pass onLogout to Layout */}
        <div className="flex-1 flex flex-col">
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/complaints" element={<Complaints />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/departments" element={<Departments />} />
              <Route path="/search" element={<Search />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/chat" element={<Chat />} />
            </Routes>
          </main>
        </div>
      </Layout>
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#fffdf7',
            color: '#1f2937',
            border: '1px solid #d4af37',
          },
        }}
      />
    </MemoryRouter>
  );
};