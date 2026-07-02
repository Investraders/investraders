import React from 'react';
import { motion } from 'framer-motion';

/* Stylized brand logos built as SVG/markup — reliable, no broken image links */

function MicrosoftLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <svg width="26" height="26" viewBox="0 0 26 26">
        <rect x="1" y="1" width="11" height="11" fill="#F25022" />
        <rect x="14" y="1" width="11" height="11" fill="#7FBA00" />
        <rect x="1" y="14" width="11" height="11" fill="#00A4EF" />
        <rect x="14" y="14" width="11" height="11" fill="#FFB900" />
      </svg>
      <span className="font-semibold text-lg tracking-tight" style={{ color: '#f5f0e6', fontFamily: 'Segoe UI, Inter, sans-serif' }}>Microsoft</span>
    </div>
  );
}

function AWSLogo() {
  return (
    <div className="flex flex-col items-start">
      <span className="font-bold text-xl" style={{ color: '#f5f0e6', fontFamily: 'Amazon Ember, Inter, sans-serif', letterSpacing: '-0.02em' }}>
        aws
      </span>
      <svg width="60" height="18" viewBox="0 0 60 18" className="-mt-0.5">
        <motion.path
          d="M2 8 C 15 16, 30 16, 44 6"
          stroke="#FF9900"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        />
        <motion.path
          d="M40 4 L 46 7 L 42 12"
          stroke="#FF9900"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9 }}
        />
      </svg>
    </div>
  );
}

function CinecaLogo() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0093DD, #005baa)' }}>
        <span className="text-white font-bold text-sm">C</span>
      </div>
      <span className="font-bold text-lg tracking-tight" style={{ color: '#0093DD', fontFamily: 'Inter, sans-serif' }}>CINECA</span>
    </div>
  );
}

function AIHubLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative">
        <svg width="30" height="30" viewBox="0 0 30 30">
          <circle cx="15" cy="15" r="12" fill="none" stroke="#4ade80" strokeWidth="2" />
          {Array.from({ length: 6 }).map((_, i) => {
            const a = (i * 60 * Math.PI) / 180;
            const x = 15 + Math.cos(a) * 8;
            const y = 15 + Math.sin(a) * 8;
            return <circle key={i} cx={x} cy={y} r="1.6" fill="#4ade80" />;
          })}
          <circle cx="15" cy="15" r="3" fill="#4ade80" />
        </svg>
      </div>
      <div className="flex flex-col leading-tight">
        <span className="font-bold text-sm" style={{ color: '#4ade80', fontFamily: 'Inter, sans-serif' }}>AI Hub</span>
        <span className="text-[10px] font-medium" style={{ color: 'rgba(245,240,230,0.5)' }}>for Sustainable Development</span>
      </div>
    </div>
  );
}

const LOGOS = [
  { Comp: AIHubLogo, label: 'UNDP Initiative' },
  { Comp: MicrosoftLogo, label: 'Technical Partner' },
  { Comp: AWSLogo, label: 'Technical Partner' },
  { Comp: CinecaLogo, label: 'Technical Partner' },
];

function LogoCard({ Comp, label, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12 }}
      whileHover={{ y: -8, scale: 1.05 }}
      className="relative flex flex-col items-center justify-center gap-3 rounded-2xl px-8 py-7 border min-w-[200px]"
      style={{ background: 'rgba(255,255,255,0.025)', borderColor: 'rgba(255,255,255,0.08)' }}
    >
      {/* Hover glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 50%, rgba(74,222,128,0.12), transparent 70%)' }}
        whileHover={{ opacity: 1 }}
      />
      <div className="relative">
        <Comp />
      </div>
      <span className="relative text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: 'rgba(245,240,230,0.4)' }}>{label}</span>
    </motion.div>
  );
}

export default function PartnerLogos() {
  // Duplicate for seamless marquee on small screens
  const marqueeLogos = [...LOGOS, ...LOGOS];

  return (
    <div className="mt-12">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center text-sm font-semibold uppercase tracking-[0.25em] mb-8"
        style={{ color: 'rgba(245,240,230,0.45)' }}
      >
        In Partnership With
      </motion.p>

      {/* Desktop: grid with connection lines */}
      <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-5">
        {LOGOS.map((l, i) => (
          <LogoCard key={i} Comp={l.Comp} label={l.label} index={i} />
        ))}
      </div>

      {/* Mobile: marquee scroll */}
      <div className="sm:hidden overflow-hidden">
        <motion.div
          className="flex gap-4"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
        >
          {marqueeLogos.map((l, i) => (
            <div key={i} className="flex-shrink-0">
              <LogoCard Comp={l.Comp} label={l.label} index={0} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Animated connection beam */}
      <div className="relative mt-10 h-px max-w-2xl mx-auto">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, transparent, rgba(74,222,128,0.3), rgba(34,211,238,0.3), transparent)' }} />
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
          style={{ background: '#4ade80', boxShadow: '0 0 12px #4ade80' }}
          animate={{ left: ['0%', '100%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
}