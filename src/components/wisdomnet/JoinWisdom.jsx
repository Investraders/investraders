import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Lightbulb, Rocket, BrainCircuit, GraduationCap } from 'lucide-react';

const ARCHITECTURE = [
  { icon: Lightbulb, name: 'Wisdom Net', role: 'The global think tank and innovation company behind the Wisdom Economy.', color: '#b8860b' },
  { icon: Rocket, name: 'Investraders', role: 'The flagship digital platform implementing the Wisdom Economy through AI-powered Circles.', color: '#2563eb' },
  { icon: BrainCircuit, name: 'Artificial Wisdom Initiative', role: 'Research & governance initiative focused on AI Trust, AI Governance, Security, and Responsible AI.', color: '#7c3aed' },
  { icon: GraduationCap, name: 'Wisdom Net Academy', role: 'Executive education & certification arm, including the Certified Investraders Master Trainer (CIMT) program.', color: '#059669' },
];

const ACTIONS = [
  'Explore Investraders', 'Partner with Wisdom Net', 'Build Your Circle', 'Shape the Future',
];

export default function JoinWisdom() {
  return (
    <section id="join" className="relative py-24 sm:py-32 overflow-hidden" style={{ background: '#ffffff' }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.1), transparent 60%)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-20 max-w-3xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: '#b8860b' }}>The Reason</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-4 mb-6" style={{ color: '#0f172a' }}>Why Wisdom Net?</h2>
          <p className="text-lg sm:text-xl leading-relaxed" style={{ color: 'rgba(15,23,42,0.65)' }}>
            Because tomorrow's economy will not be built solely by technology. It will be built by people who know how to use technology wisely. We help governments, institutions, businesses and individuals prepare for that future.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-20">
          <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] mb-10" style={{ color: 'rgba(15,23,42,0.4)' }}>A Unified Architecture</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ARCHITECTURE.map((a, i) => (
              <motion.div
                key={a.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="rounded-2xl p-6 border"
                style={{ background: '#ffffff', borderColor: 'rgba(15,23,42,0.08)', boxShadow: '0 4px 24px rgba(15,23,42,0.05)' }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${a.color}18`, border: `1px solid ${a.color}33` }}>
                  <a.icon className="w-6 h-6" style={{ color: a.color }} />
                </div>
                <h3 className="font-display font-bold text-lg mb-2" style={{ color: '#0f172a' }}>{a.name}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(15,23,42,0.6)' }}>{a.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl p-10 sm:p-14 text-center border relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.1), rgba(37,99,235,0.06))', borderColor: 'rgba(212,175,55,0.3)' }}
        >
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.15), transparent 60%)' }} />
          <div className="relative">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-5" style={{ color: '#0f172a' }}>
              Join the{' '}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #d4af37, #b8860b)' }}>Wisdom Economy</span>
            </h2>
            <p className="text-lg max-w-2xl mx-auto mb-10" style={{ color: 'rgba(15,23,42,0.65)' }}>
              Whether you are building a nation, an institution, a company or a personal dream — the future belongs to those who create opportunities. Join us in shaping a more connected, equitable and prosperous world.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {ACTIONS.map((a, i) => (
                <button
                  key={a}
                  className={i === 0
                    ? 'px-6 py-3 rounded-lg font-semibold text-white transition-transform hover:scale-105 flex items-center gap-2'
                    : 'px-6 py-3 rounded-lg font-semibold border transition-colors hover:bg-amber-50'}
                  style={i === 0
                    ? { background: 'linear-gradient(135deg, #f5d77a, #d4af37)', boxShadow: '0 6px 30px rgba(212,175,55,0.35)' }
                    : { borderColor: 'rgba(212,175,55,0.4)', color: '#b8860b' }}
                >
                  {a} {i === 0 && <ArrowRight className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}