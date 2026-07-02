import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

/* AI Hub pinwheel — 12 colored segments around a white center */
const SEGMENT_COLORS = [
  '#FF0000', '#FF8C00', '#FFD700', '#9ACD32', '#32CD32', '#228B22',
  '#008080', '#00BFFF', '#1E90FF', '#4B0082', '#FF00FF', '#FF1493',
];

function AIHubPinwheel({ size = 38 }) {
  const cx = 15, cy = 15, r = 9;
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" style={{ overflow: 'visible' }}>
      <g>
        {SEGMENT_COLORS.map((color, i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180);
          const x = cx + Math.cos(angle) * r;
          const y = cy + Math.sin(angle) * r;
          return (
            <motion.rect
              key={i}
              x={-1.1} y={-4} width={2.2} height={4} rx={1}
              fill={color}
              style={{ transformOrigin: `${x}px ${y}px` }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
          );
        })}
      </g>
      <circle cx="15" cy="15" r="3.4" fill="#0f172a" />
    </svg>
  );
}

function AIHubLogo() {
  return (
    <div className="flex items-center gap-3">
      <AIHubPinwheel size={40} />
      <div className="flex flex-col leading-tight">
        <span className="font-bold text-base" style={{ color: '#0f172a', fontFamily: 'Montserrat, Inter, sans-serif' }}>AI Hub</span>
        <span className="text-[10px] font-medium" style={{ color: 'rgba(15,23,42,0.5)', fontFamily: 'Montserrat, Inter, sans-serif' }}>for Sustainable Development</span>
      </div>
    </div>
  );
}

function MicrosoftLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <svg width="26" height="26" viewBox="0 0 26 26">
        <rect x="1" y="1" width="11" height="11" fill="#F25022" />
        <rect x="14" y="1" width="11" height="11" fill="#7FBA00" />
        <rect x="1" y="14" width="11" height="11" fill="#00A4EF" />
        <rect x="14" y="14" width="11" height="11" fill="#FFB900" />
      </svg>
      <span className="font-semibold text-lg tracking-tight" style={{ color: '#0f172a', fontFamily: 'Segoe UI, Inter, sans-serif' }}>Microsoft</span>
    </div>
  );
}

function AWSLogo() {
  return (
    <div className="flex flex-col items-start">
      <span className="font-bold text-xl" style={{ color: '#0f172a', fontFamily: 'Amazon Ember, Inter, sans-serif', letterSpacing: '-0.02em' }}>aws</span>
      <svg width="60" height="18" viewBox="0 0 60 18" className="-mt-0.5">
        <motion.path
          d="M2 8 C 15 16, 30 16, 44 6"
          stroke="#FF9900" strokeWidth="2.5" fill="none" strokeLinecap="round"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }}
        />
        <motion.path
          d="M40 4 L 46 7 L 42 12"
          stroke="#FF9900" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.9 }}
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

const PARTNERS = [
  { Comp: AIHubLogo, label: 'UNDP Initiative', url: 'https://www.undp.org/romecentre/ai-hub-sustainable-development', accent: '#16a34a' },
  { Comp: MicrosoftLogo, label: 'Technical Partner', url: 'https://www.microsoft.com', accent: '#00A4EF' },
  { Comp: AWSLogo, label: 'Technical Partner', url: 'https://aws.amazon.com', accent: '#FF9900' },
  { Comp: CinecaLogo, label: 'Technical Partner', url: 'https://www.cineca.it', accent: '#0093DD' },
];

function FlipLogoCard({ Comp, label, url, accent, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative block cursor-pointer"
      style={{ perspective: 1000, minHeight: 130 }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d', minHeight: 130 }}
        animate={{ rotateY: hovered ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Front face — the logo */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl px-8 py-7 border"
          style={{ background: '#ffffff', borderColor: 'rgba(15,23,42,0.1)', boxShadow: '0 4px 24px rgba(15,23,42,0.06)', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          <div className="relative">
            <Comp />
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: 'rgba(15,23,42,0.4)' }}>{label}</span>
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{ background: `radial-gradient(circle at 50% 50%, ${accent}1a, transparent 70%)` }}
            animate={{ opacity: hovered ? 1 : 0 }}
          />
        </div>

        {/* Back face — visit website */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-2xl px-8 py-7 border"
          style={{
            background: `linear-gradient(135deg, ${accent}22, ${accent}08)`,
            borderColor: `${accent}66`,
            boxShadow: '0 4px 24px rgba(15,23,42,0.06)',
            backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <ExternalLink className="w-6 h-6" style={{ color: accent }} />
          <span className="text-sm font-semibold" style={{ color: accent }}>Visit Website</span>
          <span className="text-[10px] truncate max-w-full" style={{ color: 'rgba(15,23,42,0.5)' }}>
            {url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
          </span>
        </div>
      </motion.div>
    </motion.a>
  );
}

export default function PartnerLogos() {
  const marqueePartners = [...PARTNERS, ...PARTNERS];

  return (
    <div className="mt-12">
      <motion.p
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
        className="text-center text-sm font-semibold uppercase tracking-[0.25em] mb-8"
        style={{ color: 'rgba(15,23,42,0.45)' }}
      >
        In Partnership With
      </motion.p>

      {/* Desktop: flip cards grid */}
      <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-5">
        {PARTNERS.map((p, i) => (
          <FlipLogoCard key={i} Comp={p.Comp} label={p.label} url={p.url} accent={p.accent} index={i} />
        ))}
      </div>

      {/* Mobile: marquee scroll */}
      <div className="sm:hidden overflow-hidden">
        <motion.div
          className="flex gap-4"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        >
          {marqueePartners.map((p, i) => (
            <div key={i} className="flex-shrink-0 w-[200px]">
              <FlipLogoCard Comp={p.Comp} label={p.label} url={p.url} accent={p.accent} index={0} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Animated connection beam */}
      <div className="relative mt-10 h-px max-w-2xl mx-auto">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, transparent, rgba(22,163,74,0.3), rgba(34,211,238,0.3), transparent)' }} />
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
          style={{ background: '#16a34a', boxShadow: '0 0 12px #16a34a' }}
          animate={{ left: ['0%', '100%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <motion.p
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
        className="text-center text-xs mt-4"
        style={{ color: 'rgba(15,23,42,0.4)' }}
      >
        Hover to flip · Click to visit the official website
      </motion.p>
    </div>
  );
}