import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Compass } from 'lucide-react';

function WisdomOrb() {
  // Orbiting constellation nodes around a central lamp of wisdom
  const nodes = Array.from({ length: 8 }).map((_, i) => i * 45);
  return (
    <div className="relative" style={{ width: 340, height: 340, maxWidth: '90vw' }}>
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.18), transparent 65%)' }} />
      {/* Radiating rings */}
      {[140, 110, 80].map((r, i) => (
        <div key={r} className="absolute rounded-full border border-amber-300/10" style={{ width: r * 2, height: r * 2, left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }} />
      ))}
      {/* Orbiting nodes */}
      {nodes.map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const r = 140;
        const x = Math.cos(rad) * r;
        const y = Math.sin(rad) * r;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{ width: 8, height: 8, left: '50%', top: '50%', marginLeft: -4, marginTop: -4, background: '#f5d77a', boxShadow: '0 0 12px rgba(212,175,55,0.8)' }}
            animate={{ x, y, opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 3, delay: i * 0.3, repeat: Infinity }}
          />
        );
      })}
      {/* Central orb (lamp of wisdom) */}
      <motion.div
        className="absolute rounded-full flex items-center justify-center"
        style={{ width: 90, height: 90, left: '50%', top: '50%', transform: 'translate(-50%,-50%)', background: 'radial-gradient(circle at 38% 30%, #fff4cf, #f5d77a 45%, #d4af37 75%, #a8842a)', boxShadow: '0 0 60px rgba(212,175,55,0.6), inset 0 -8px 20px rgba(0,0,0,0.3)' }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Compass className="w-9 h-9 text-[#0d1330]" strokeWidth={2.2} />
      </motion.div>
    </div>
  );
}

export default function WisdomHero() {
  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" style={{ background: '#060a18' }}>
      {/* Background glows */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(212,175,55,0.10), transparent 60%)' }} />
      <div className="absolute" style={{ top: '15%', left: '10%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(59,130,246,0.12), transparent 70%)', filter: 'blur(40px)' }} />
      <div className="absolute" style={{ bottom: '10%', right: '8%', width: 320, height: 320, background: 'radial-gradient(circle, rgba(212,175,55,0.12), transparent 70%)', filter: 'blur(50px)' }} />
      {/* Constellation dots */}
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.25) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <WisdomOrb />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-[0.2em] mt-10 mb-6"
          style={{ borderColor: 'rgba(212,175,55,0.3)', background: 'rgba(212,175,55,0.08)', color: '#f5d77a' }}
        >
          Wisdom Net
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          style={{ color: '#f5f0e6' }}
        >
          Building the{' '}
          <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #f5d77a, #d4af37)' }}>Wisdom Economy</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="text-lg sm:text-xl md:text-2xl font-light mb-10 max-w-3xl"
          style={{ color: 'rgba(245,240,230,0.7)' }}
        >
          Transforming Intelligence into Wisdom.{' '}
          <span className="font-medium" style={{ color: '#f5d77a' }}>Transforming Opportunities into Prosperity.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={() => scrollTo('#wisdom-economy')}
            className="px-7 py-3.5 rounded-lg font-semibold text-[#0d1330] transition-transform hover:scale-105 flex items-center justify-center gap-2"
            style={{ background: 'linear-gradient(135deg, #f5d77a, #d4af37)', boxShadow: '0 6px 30px rgba(212,175,55,0.35)' }}
          >
            Explore Our Vision <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => scrollTo('#join')}
            className="px-7 py-3.5 rounded-lg font-semibold border transition-colors"
            style={{ borderColor: 'rgba(212,175,55,0.4)', color: '#f5d77a', background: 'rgba(212,175,55,0.05)' }}
          >
            Join the Movement
          </button>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest" style={{ color: 'rgba(245,240,230,0.4)' }}>Scroll</span>
        <div className="w-px h-10" style={{ background: 'linear-gradient(to bottom, rgba(212,175,55,0.6), transparent)' }} />
      </motion.div>
    </section>
  );
}