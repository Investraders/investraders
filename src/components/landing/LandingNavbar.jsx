import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Institutions', href: '#institutions' },
  { label: 'Businesses', href: '#businesses' },
  { label: 'Individuals', href: '#individuals' },
  { label: '3M', href: '#monetize' },
];

export default function LandingNavbar() {
  const [open, setOpen] = useState(false);

  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5" style={{ background: 'rgba(3,7,18,0.85)', backdropFilter: 'blur(16px)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'radial-gradient(circle, #67e8f9, #0ea5e9)' }}>
              <span className="text-white font-bold text-base italic">i</span>
            </div>
            <span className="text-white font-bold text-lg tracking-tight">investrade</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="text-gray-400 hover:text-white text-sm font-medium transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/login" className="text-gray-300 hover:text-white text-sm font-medium px-4 py-2 transition-colors">
              Sign In
            </Link>
            <Link to="/register" className="text-white text-sm font-semibold px-5 py-2 rounded-full transition-all" style={{ background: 'linear-gradient(135deg, #06b6d4, #3b82f6)' }}>
              Get Started
            </Link>
          </div>

          <button className="md:hidden text-white p-1" onClick={() => setOpen(!open)}>
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/5 px-4 py-4 space-y-2" style={{ background: 'rgba(3,7,18,0.95)' }}>
          {navLinks.map(link => (
            <button key={link.label} onClick={() => scrollTo(link.href)} className="block w-full text-left text-gray-300 hover:text-white text-sm font-medium py-2.5">
              {link.label}
            </button>
          ))}
          <div className="flex gap-3 pt-3 border-t border-white/10">
            <Link to="/login" className="flex-1 text-center text-gray-300 border border-white/20 rounded-full py-2.5 text-sm" onClick={() => setOpen(false)}>Sign In</Link>
            <Link to="/register" className="flex-1 text-center text-white rounded-full py-2.5 text-sm font-semibold" style={{ background: 'linear-gradient(135deg, #06b6d4, #3b82f6)' }} onClick={() => setOpen(false)}>Get Started</Link>
          </div>
        </div>
      )}
    </nav>
  );
}