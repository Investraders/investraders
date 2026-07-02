import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Lightbulb } from 'lucide-react';

const LINKS = [
  { label: 'Wisdom Economy', href: '#wisdom-economy' },
  { label: 'Excellence', href: '#excellence' },
  { label: 'Investraders', href: '#investraders' },
  { label: 'Circles', href: '#circles' },
  { label: 'Recognition', href: '#recognition' },
];

export default function WisdomNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleScroll = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(6,10,24,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(212,175,55,0.15)' : '1px solid transparent',
      }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #f5d77a, #d4af37)', boxShadow: '0 0 20px rgba(212,175,55,0.4)' }}>
            <Lightbulb className="w-4 h-4 text-[#0d1330]" />
          </div>
          <span className="font-display text-lg font-bold tracking-wide" style={{ color: '#f5f0e6' }}>
            WISDOM<span style={{ color: '#d4af37' }}>NET</span>
          </span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {LINKS.map(l => (
            <button key={l.href} onClick={() => handleScroll(l.href)} className="text-sm font-medium text-slate-300 hover:text-amber-300 transition-colors">
              {l.label}
            </button>
          ))}
        </div>

        <div className="hidden md:block">
          <button
            onClick={() => handleScroll('#join')}
            className="px-5 py-2 rounded-lg text-sm font-semibold text-[#0d1330] transition-transform hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #f5d77a, #d4af37)', boxShadow: '0 4px 20px rgba(212,175,55,0.3)' }}
          >
            Join the Movement
          </button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-amber-300" onClick={() => setOpen(v => !v)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden"
            style={{ background: 'rgba(6,10,24,0.95)', backdropFilter: 'blur(16px)', borderTop: '1px solid rgba(212,175,55,0.15)' }}
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {LINKS.map(l => (
                <button key={l.href} onClick={() => handleScroll(l.href)} className="text-left py-2.5 text-slate-300 hover:text-amber-300 transition-colors">
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => handleScroll('#join')}
                className="mt-2 py-2.5 rounded-lg text-sm font-semibold text-[#0d1330]"
                style={{ background: 'linear-gradient(135deg, #f5d77a, #d4af37)' }}
              >
                Join the Movement
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}