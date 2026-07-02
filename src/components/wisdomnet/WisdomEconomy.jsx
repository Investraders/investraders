import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Scale, Eye, Globe, Leaf } from 'lucide-react';

const ECONOMIES = [
  { name: 'Industrial', created: 'factories' },
  { name: 'Information', created: 'the Internet' },
  { name: 'Knowledge', created: 'innovation' },
  { name: 'Artificial Intelligence', created: 'unprecedented productivity' },
];

const PILLARS = [
  { icon: Brain, title: 'Wisdom', desc: 'Making better long-term decisions rather than simply faster decisions.', color: '#b8860b' },
  { icon: Scale, title: 'Equitability', desc: 'Ensuring that technological progress creates opportunities for everyone.', color: '#2563eb' },
  { icon: Eye, title: 'Future Thinking', desc: 'Preparing societies for the opportunities and disruptions of tomorrow.', color: '#7c3aed' },
  { icon: Globe, title: 'Global Awareness', desc: 'Connecting people, institutions and economies beyond borders.', color: '#059669' },
  { icon: Leaf, title: 'Sustainable Prosperity', desc: 'Creating lasting value for present and future generations.', color: '#ea580c' },
];

export default function WisdomEconomy() {
  return (
    <section id="wisdom-economy" className="relative py-24 sm:py-32" style={{ background: '#f8fafc' }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.06), transparent 60%)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: '#b8860b' }}>The Next Evolution</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-4 mb-6" style={{ color: '#0f172a' }}>What is the Wisdom Economy?</h2>
        </motion.div>

        <div className="max-w-4xl mx-auto mb-20 space-y-4">
          {ECONOMIES.map((e, i) => (
            <motion.div
              key={e.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4 p-5 rounded-xl border"
              style={{ background: '#ffffff', borderColor: 'rgba(15,23,42,0.08)', boxShadow: '0 2px 12px rgba(15,23,42,0.04)' }}
            >
              <span className="text-sm font-mono" style={{ color: 'rgba(15,23,42,0.35)' }}>0{i + 1}</span>
              <div className="flex-1">
                <span className="font-medium" style={{ color: '#0f172a' }}>The {e.name} Economy</span>
                <span style={{ color: 'rgba(15,23,42,0.5)' }}> created </span>
                <span className="italic" style={{ color: '#b8860b' }}>{e.created}.</span>
              </div>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-4 p-6 rounded-xl"
            style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.12), rgba(212,175,55,0.04))', border: '1px solid rgba(212,175,55,0.35)' }}
          >
            <span className="text-sm font-mono" style={{ color: '#b8860b' }}>05</span>
            <div className="flex-1">
              <span className="font-bold text-lg" style={{ color: '#b8860b' }}>The Wisdom Economy</span>
              <p className="text-sm mt-1" style={{ color: 'rgba(15,23,42,0.65)' }}>
                where technology serves humanity, opportunities are expanded rather than concentrated, and intelligent systems are guided by ethical governance, strategic foresight, and inclusive prosperity.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-12">
          <h3 className="font-display text-2xl sm:text-3xl font-bold" style={{ color: '#0f172a' }}>Founded on Five Pillars</h3>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="rounded-2xl p-6 border transition-colors"
              style={{ background: '#ffffff', borderColor: 'rgba(15,23,42,0.08)', boxShadow: '0 4px 24px rgba(15,23,42,0.05)' }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${p.color}18`, border: `1px solid ${p.color}33` }}>
                <p.icon className="w-6 h-6" style={{ color: p.color }} />
              </div>
              <h4 className="font-semibold text-lg mb-2" style={{ color: '#0f172a' }}>{p.title}</h4>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(15,23,42,0.6)' }}>{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}