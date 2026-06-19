import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Globe } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: '#030712' }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(6,182,212,0.08) 0%, transparent 70%)' }} />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl" style={{ background: 'rgba(59,130,246,0.06)' }} />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full blur-3xl" style={{ background: 'rgba(6,182,212,0.06)' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-24 pb-16">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-wider mb-8" style={{ borderColor: 'rgba(6,182,212,0.3)', background: 'rgba(6,182,212,0.1)', color: '#22d3ee' }}>
            <Globe className="w-3.5 h-3.5" /> Global Platform
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6">
            <span className="block">The Global Business</span>
            <span className="block bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #22d3ee, #60a5fa)' }}>
              Circles & Community
            </span>
            <span className="block">Intelligence Platform</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-4 leading-relaxed">
            Streamlined Companies for Better National and International Visibility & Connectivity
          </p>

          <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto mb-8">
            Whether you are a Chamber of Commerce, a Stock Exchange, a University, a Company, or simply someone with a dream — Investrade gives you the tools to build communities, create opportunities, and generate income.
          </p>

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold mb-10" style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', color: '#fbbf24' }}>
            Make Money Meanwhile — 3M
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="inline-flex items-center gap-2 text-white font-semibold px-8 py-3.5 rounded-full text-base shadow-lg" style={{ background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', boxShadow: '0 8px 32px rgba(6,182,212,0.25)' }}>
              Create Your Circle <ArrowRight className="w-4 h-4" />
            </Link>
            <button onClick={() => document.querySelector('#institutions')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex items-center gap-2 text-gray-400 hover:text-white border border-white/20 hover:border-white/40 px-8 py-3.5 rounded-full transition-all text-base">
              Learn More
            </button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
        </motion.div>
      </div>
    </section>
  );
}