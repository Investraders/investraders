import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Check } from 'lucide-react';

const COMBINES = [
  'ethical governance', 'strategic foresight', 'contextual understanding',
  'trust', 'transparency', 'responsible decision-making',
];

export default function ArtificialWisdom() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden" style={{ background: '#060a18' }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(167,139,250,0.07), transparent 65%)' }} />
      <div className="absolute" style={{ top: '20%', left: '15%', width: 280, height: 280, background: 'radial-gradient(circle, rgba(212,175,55,0.1), transparent 70%)', filter: 'blur(50px)' }} />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.3), transparent 70%)', filter: 'blur(20px)' }} />
            <div className="relative w-20 h-20 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.2), rgba(167,139,250,0.2))', border: '1px solid rgba(212,175,55,0.4)' }}>
              <BrainCircuit className="w-10 h-10" style={{ color: '#f5d77a' }} />
            </div>
          </div>
        </motion.div>

        <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: '#d4af37' }}>
          Beyond Artificial Intelligence
        </motion.span>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-4 mb-6" style={{ color: '#f5f0e6' }}>
          Artificial{' '}
          <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #f5d77a, #a78bfa)' }}>Wisdom</span>
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="text-lg max-w-2xl mx-auto mb-12 leading-relaxed" style={{ color: 'rgba(245,240,230,0.6)' }}>
          At Wisdom Net, we believe that Artificial Intelligence must evolve into <span className="font-semibold" style={{ color: '#f5d77a' }}>Artificial Wisdom</span>. It is the next frontier of digital transformation and a key pillar of our long-term research and innovation agenda.
        </motion.p>

        <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
          {COMBINES.map((c, i) => (
            <motion.div
              key={c}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full border"
              style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(212,175,55,0.2)' }}
            >
              <Check className="w-3.5 h-3.5" style={{ color: '#f5d77a' }} />
              <span className="text-sm capitalize" style={{ color: '#f5f0e6' }}>{c}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}