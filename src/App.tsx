import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import PortalPage from './components/Portal/PortalPage';
import Contact from './components/Contact';
import LoadingScreen from './components/LoadingScreen';

// Portal Components with Full Layouts
import HealthPortal from './components/Health/HealthPortal';
import AgriculturePortal from './components/Agriculture/AgriculturePortal';
import GrievancePortal from './components/Grievance/GrievancePortal';

// Custom Cursor Component
const CustomCursor: React.FC = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    document.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Add hover detection for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => setIsHovering(true));
      el.addEventListener('mouseleave', () => setIsHovering(false));
    });

    return () => {
      document.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      <div
        className={`custom-cursor ${isHovering ? 'hover' : ''} ${isClicking ? 'click' : ''}`}
        style={{
          transform: `translate(${cursorPosition.x - 10}px, ${cursorPosition.y - 10}px)`
        }}
      />
      <div
        className="cursor-trail"
        style={{
          transform: `translate(${cursorPosition.x - 4}px, ${cursorPosition.y - 4}px)`
        }}
      />
    </>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <div className="App">
        <CustomCursor />
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/portal" element={<PortalPage />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Health Portal Routes */}
          <Route path="/health/*" element={<HealthPortal />} />
          
          {/* Agriculture Portal Routes */}
          <Route path="/agriculture/*" element={<AgriculturePortal />} />
          
          {/* Grievance Portal Routes */}
          <Route path="/grievance/*" element={<GrievancePortal />} />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;