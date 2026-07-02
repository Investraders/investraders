import React from 'react';
import { Lightbulb } from 'lucide-react';

export default function WisdomFooter() {
  return (
    <footer className="relative py-12 border-t" style={{ background: '#040713', borderColor: 'rgba(212,175,55,0.12)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #f5d77a, #d4af37)' }}>
              <Lightbulb className="w-4 h-4 text-[#0d1330]" />
            </div>
            <div>
              <span className="font-display text-lg font-bold tracking-wide" style={{ color: '#f5f0e6' }}>
                WISDOM<span style={{ color: '#d4af37' }}>NET</span>
              </span>
              <p className="text-xs" style={{ color: 'rgba(245,240,230,0.4)' }}>Building the Wisdom Economy</p>
            </div>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm" style={{ color: 'rgba(245,240,230,0.5)' }}>
            <a href="#wisdom-economy" className="hover:text-amber-300 transition-colors">Wisdom Economy</a>
            <a href="#excellence" className="hover:text-amber-300 transition-colors">Excellence</a>
            <a href="#investraders" className="hover:text-amber-300 transition-colors">Investraders</a>
            <a href="#circles" className="hover:text-amber-300 transition-colors">Circles</a>
            <a href="#recognition" className="hover:text-amber-300 transition-colors">Recognition</a>
            <a href="#join" className="hover:text-amber-300 transition-colors">Join</a>
          </nav>
        </div>

        <div className="mt-8 pt-8 border-t text-center" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <p className="text-xs" style={{ color: 'rgba(245,240,230,0.35)' }}>
            © {new Date().getFullYear()} Wisdom Net — Transforming Intelligence into Wisdom. Transforming Opportunities into Prosperity.
          </p>
        </div>
      </div>
    </footer>
  );
}