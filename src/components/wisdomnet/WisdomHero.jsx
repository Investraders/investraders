import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, User, Bot, Sparkles, Cpu } from 'lucide-react';

function CoexistenceVisual() {
  const paths = [
    'M 70 140 C 140 90, 240 190, 310 140',
    'M 70 140 C 140 190, 240 90, 310 140',
    'M 70 140 C 150 140, 230 140, 310 140',
    'M 70 140 C 130 110, 250 170, 310 140',
  ];
  const orbitColors = ['#22d3ee', '#a78bfa', '#f5d77a'];

  return (
    <div className="relative" style={{ width: 380, height: 280 }}>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 380 280" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="neuralGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0891b2" />
            <stop offset="50%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#b8860b" />
          </linearGradient>
        </defs>
        {paths.map((d, i) => (
          <path key={i} d={d} stroke="url(#neuralGrad)" strokeWidth="1.5" fill="none" strokeDasharray="3 8" opacity="0.7">
            <animate attributeName="stroke-dashoffset" from="0" to="-22" dur={`${1.2 + i * 0.3}s`} repeatCount="indefinite" />
          </path>
        ))}
      </svg>

      <motion.div
        className="absolute flex flex-col items-center gap-2"
        style={{ left: 6, top: '50%', transform: 'translateY(-50%)' }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <motion.div
          className="rounded-2xl flex items-center justify-center"
          style={{ width: 64, height: 64, background: 'linear-gradient(135deg, rgba(8,145,178,0.15), rgba(37,99,235,0.08))', border: '1.5px solid rgba(8,145,178,0.45)', boxShadow: '0 6px 24px rgba(8,145,178,0.2)' }}
          animate={{ boxShadow: ['0 6px 24px rgba(8,145,178,0.2)', '0 6px 34px rgba(8,145,178,0.35)', '0 6px 24px rgba(8,145,178,0.2)'] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <User className="w-8 h-8" style={{ color: '#0891b2' }} strokeWidth={1.8} />
        </motion.div>
        <span className="text-xs font-semibold tracking-[0.2em]" style={{ color: '#0891b2' }}>HUMANITY</span>
      </motion.div>

      <motion.div
        className="absolute flex flex-col items-center gap-2"
        style={{ right: 6, top: '50%', transform: 'translateY(-50%)' }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <motion.div
          className="rounded-2xl flex items-center justify-center"
          style={{ width: 64, height: 64, background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(184,134,11,0.08))', border: '1.5px solid rgba(124,58,237,0.45)', boxShadow: '0 6px 24px rgba(124,58,237,0.2)' }}
          animate={{ boxShadow: ['0 6px 24px rgba(124,58,237,0.2)', '0 6px 34px rgba(124,58,237,0.35)', '0 6px 24px rgba(124,58,237,0.2)'] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
        >
          <Bot className="w-8 h-8" style={{ color: '#7c3aed' }} strokeWidth={1.8} />
        </motion.div>
        <span className="text-xs font-semibold tracking-[0.2em]" style={{ color: '#7c3aed' }}>MACHINE</span>
      </motion.div>

      <motion.div
        className="absolute"
        style={{ left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        <motion.div
          className="rounded-full flex items-center justify-center"
          style={{ width: 56, height: 56, background: 'radial-gradient(circle at 40% 35%, #fff4cf, #f5d77a 45%, #d4af37 75%)', boxShadow: '0 8px 40px rgba(212,175,55,0.45)' }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Sparkles className="w-7 h-7 text-[#0f172a]" />
        </motion.div>
      </motion.div>

      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i * 60 * Math.PI) / 180;
        const r = 100;
        const x = 190 + Math.cos(angle) * r;
        const y = 140 + Math.sin(angle) * r;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{ width: 6, height: 6, left: x - 3, top: y - 3, background: orbitColors[i % 3] }}
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.3, 0.8] }}
            transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
          />
        );
      })}

      <div className="absolute rounded-full border border-dashed" style={{ left: '50%', top: '50%', width: 200, height: 200, transform: 'translate(-50%,-50%)', borderColor: 'rgba(15,23,42,0.1)' }} />
    </div>
  );
}

function Particle({ delay, duration, x, y, size, color }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{ width: size, height: size, left: `${x}%`, top: `${y}%`, background: color, boxShadow: `0 0 ${size * 3}px ${color}` }}
      animate={{ y: [0, -40, 0], opacity: [0, 0.8, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

export default function WisdomHero() {
  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" style={{ background: '#ffffff' }}>
      <div className="absolute bottom-0 inset-x-0 h-1/2 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(8,145,178,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(8,145,178,0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
        transform: 'perspective(400px) rotateX(60deg)',
        transformOrigin: 'bottom',
        maskImage: 'linear-gradient(to top, black, transparent)',
        WebkitMaskImage: 'linear-gradient(to top, black, transparent)',
      }} />

      <div className="absolute pointer-events-none" style={{ top: '8%', left: '5%', width: 360, height: 360, background: 'radial-gradient(circle, rgba(34,211,238,0.14), transparent 70%)', filter: 'blur(50px)' }} />
      <div className="absolute pointer-events-none" style={{ bottom: '5%', right: '5%', width: 420, height: 420, background: 'radial-gradient(circle, rgba(167,139,250,0.14), transparent 70%)', filter: 'blur(60px)' }} />
      <div className="absolute pointer-events-none" style={{ top: '35%', left: '42%', width: 320, height: 320, background: 'radial-gradient(circle, rgba(212,175,55,0.12), transparent 70%)', filter: 'blur(50px)' }} />

      {Array.from({ length: 24 }).map((_, i) => (
        <Particle key={i} delay={i * 0.3} duration={3 + (i % 5)} x={(i * 37) % 100} y={(i * 53) % 100} size={2 + (i % 3)} color={['#0891b2', '#7c3aed', '#d4af37'][i % 3]} />
      ))}

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center z-10">
        <CoexistenceVisual />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-[0.25em] mt-10 mb-6"
          style={{ borderColor: 'rgba(8,145,178,0.3)', background: 'rgba(8,145,178,0.06)', color: '#0891b2' }}
        >
          <Cpu className="w-3.5 h-3.5" /> The Future of Intelligence
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          style={{ color: '#0f172a' }}
        >
          Building the{' '}
          <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #0891b2, #7c3aed, #d4af37)' }}>Wisdom Economy</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.15 }}
          className="text-lg sm:text-xl md:text-2xl font-light mb-10 max-w-3xl"
          style={{ color: 'rgba(15,23,42,0.65)' }}
        >
          Where humans and machines coexist — guided by wisdom, powered by AI, building prosperity for all. Transforming Intelligence into{' '}
          <span className="font-medium" style={{ color: '#b8860b' }}>Wisdom</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={() => scrollTo('#wisdom-economy')}
            className="px-7 py-3.5 rounded-lg font-semibold text-white transition-transform hover:scale-105 flex items-center justify-center gap-2"
            style={{ background: 'linear-gradient(135deg, #0891b2, #2563eb)', boxShadow: '0 6px 30px rgba(8,145,178,0.35)' }}
          >
            Explore Our Vision <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => scrollTo('#join')}
            className="px-7 py-3.5 rounded-lg font-semibold border transition-colors"
            style={{ borderColor: 'rgba(184,134,11,0.4)', color: '#b8860b', background: 'rgba(212,175,55,0.06)' }}
          >
            Join the Movement
          </button>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-xs uppercase tracking-widest" style={{ color: 'rgba(15,23,42,0.4)' }}>Scroll</span>
        <div className="w-px h-10" style={{ background: 'linear-gradient(to bottom, rgba(8,145,178,0.6), transparent)' }} />
      </motion.div>
    </section>
  );
}