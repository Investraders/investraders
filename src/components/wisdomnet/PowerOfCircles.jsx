import React from 'react';
import { motion } from 'framer-motion';
import { Circle, Check } from 'lucide-react';

const CIRCLE_TYPES = [
  'A Chamber of Commerce', 'A Stock Exchange', 'A University', 'A Company',
  'A Municipality', 'A Professional Association', 'A Startup Community', 'A Family Business',
  'A Local Community', 'A Research Group', 'A Personal Brand',
];

export default function PowerOfCircles() {
  return (
    <section id="circles" className="relative py-24 sm:py-32 overflow-hidden" style={{ background: '#f8fafc' }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(37,99,235,0.06), transparent 60%)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="flex justify-center order-2 lg:order-1">
            <div className="relative" style={{ width: 360, height: 360, maxWidth: '90vw' }}>
              <div className="absolute rounded-full flex items-center justify-center" style={{ left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 120, height: 120, background: 'radial-gradient(circle at 38% 30%, #7ec0f0, #2563eb 50%, #1e3a8a)', boxShadow: '0 8px 40px rgba(37,99,235,0.4)', border: '1px solid rgba(147,197,253,0.4)' }}>
                <Circle className="w-12 h-12 text-white" strokeWidth={1.5} />
              </div>
              {Array.from({ length: 7 }).map((_, i) => {
                const deg = (i * 360) / 7;
                const rad = (deg * Math.PI) / 180;
                const r = 150;
                const x = Math.cos(rad) * r;
                const y = Math.sin(rad) * r;
                return (
                  <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{ width: 44, height: 44, left: '50%', top: '50%', marginLeft: -22, marginTop: -22, background: 'linear-gradient(135deg, #f5d77a, #d4af37)', border: '2px solid rgba(255,255,255,0.5)', boxShadow: '0 4px 16px rgba(212,175,55,0.35)' }}
                    animate={{ x: [x, Math.cos(rad + 0.8) * r, x], y: [y, Math.sin(rad + 0.8) * r, y] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  />
                );
              })}
              <div className="absolute rounded-full border border-dashed" style={{ left: '50%', top: '50%', width: 300, height: 300, transform: 'translate(-50%,-50%)', borderColor: 'rgba(15,23,42,0.1)' }} />
            </div>
          </motion.div>

          <div className="order-1 lg:order-2">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <span className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: '#b8860b' }}>The Power of Circles</span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-4 mb-5" style={{ color: '#0f172a' }}>Communities That Create Value</h2>
              <p className="text-lg leading-relaxed mb-8" style={{ color: 'rgba(15,23,42,0.65)' }}>
                Unlike traditional social media that focuses on content consumption, Circles are <span className="font-medium" style={{ color: '#b8860b' }}>intelligent communities</span> built around shared interests, businesses, institutions, professions, or local ecosystems. Each becomes an interactive ecosystem where members collaborate, share opportunities, build trust and generate measurable economic value.
              </p>
            </motion.div>

            <p className="text-sm font-semibold mb-4" style={{ color: 'rgba(15,23,42,0.55)' }}>A Circle can represent:</p>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {CIRCLE_TYPES.map((c, i) => (
                <motion.div
                  key={c}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-2.5"
                >
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(212,175,55,0.18)' }}>
                    <Check className="w-3 h-3" style={{ color: '#b8860b' }} />
                  </div>
                  <span className="text-sm" style={{ color: 'rgba(15,23,42,0.75)' }}>{c}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}