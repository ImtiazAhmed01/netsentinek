import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Logs from './pages/Logs';
import Alerts from './pages/Alerts';
import Analytics from './pages/Analytics';
import Simulator from './pages/Simulator';
import Settings from './pages/Settings';
import Login from './pages/Login';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    socket.on('connect', () => console.log('Connected to realtime server'));
    return () => socket.disconnect();
  }, []);

  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-white flex flex-col font-sans">
        {isAuthenticated && <Navbar setIsAuthenticated={setIsAuthenticated} />}

        <main className="flex-1 p-6 overflow-y-auto">
          <Routes>
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/" element={<Navigate to="/dashboard" />} />

            <Route path="/dashboard" element={<ProtectedRoute><Dashboard socket={socket} /></ProtectedRoute>} />
            <Route path="/logs" element={<ProtectedRoute><Logs socket={socket} /></ProtectedRoute>} />
            <Route path="/alerts" element={<ProtectedRoute><Alerts socket={socket} /></ProtectedRoute>} />
            <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
            <Route path="/simulator" element={<ProtectedRoute><Simulator /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
