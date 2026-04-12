import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Bell, User } from 'lucide-react';

export default function Navbar({ setIsAuthenticated }) {
  const location = useLocation();

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Logs', path: '/logs' },
    { name: 'Alerts', path: '/alerts' },
    { name: 'Analytics', path: '/analytics' },
    { name: 'Simulator', path: '/simulator' },
    { name: 'Settings', path: '/settings' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  return (
    <header className="bg-slate-800 border-b border-slate-700 w-full shrink-0 sticky top-0 z-50">
      <div className="px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Shield className="text-primary w-8 h-8 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
          <h1 className="text-xl font-bold tracking-wide text-white">NetSentinel</h1>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex flex-1 justify-center gap-8 h-full">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`relative flex items-center px-1 transition-colors h-full text-sm font-medium ${
                  isActive ? 'text-primary' : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-t-lg shadow-[0_-2px_10px_rgba(59,130,246,0.5)]"></span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Controls */}
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-slate-300 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
            {/* Red Dot (mocked for now) */}
            <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,1)]"></span>
          </button>
          
          <button onClick={handleLogout} className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-700 border border-slate-600 text-sm font-medium text-slate-200">
            GA
          </button>
        </div>
      </div>
    </header>
  );
}
