import React from 'react';
import { motion } from 'framer-motion';
import { User, Bot, Sparkles, Users, BrainCircuit, Shield } from 'lucide-react';

const PILLARS = [
  { icon: Users, title: 'Collaboration', desc: 'Humans and AI working side by side, each amplifying the other\'s strengths to solve challenges no single mind can solve alone.', color: '#0891b2' },
  { icon: BrainCircuit, title: 'Augmentation', desc: 'Technology that enhances human potential rather than replacing it — extending our reach, our memory, and our foresight.', color: '#7c3aed' },
  { icon: Shield, title: 'Ethical Guardrails', desc: 'Wisdom-guided AI systems built on trust, transparency, accountability, and the dignity of every human life.', color: '#b8860b' },
];

export default function HumanMachineCoexistence() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden" style={{ background: '#ffffff' }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(8,145,178,0.06), transparent 65%)' }} />
      <div className="absolute pointer-events-none" style={{ top: '20%', left: '10%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(167,139,250,0.1), transparent 70%)', filter: 'blur(50px)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: '#0891b2' }}>The Future</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-4 mb-5" style={{ color: '#0f172a' }}>
            Humans & Machines,{' '}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #0891b2, #7c3aed)' }}>Together</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(15,23,42,0.6)' }}>
            The future is not humans versus machines. It is humans and machines — guided by wisdom — co-creating a world of shared prosperity, expanded opportunity, and responsible intelligence.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex items-center justify-center gap-4 sm:gap-8 my-16 flex-wrap"
        >
          <div className="flex flex-col items-center gap-2">
            <motion.div
              className="rounded-2xl flex items-center justify-center"
              style={{ width: 72, height: 72, background: 'linear-gradient(135deg, rgba(8,145,178,0.15), rgba(37,99,235,0.08))', border: '1.5px solid rgba(8,145,178,0.45)', boxShadow: '0 6px 24px rgba(8,145,178,0.2)' }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <User className="w-9 h-9" style={{ color: '#0891b2' }} strokeWidth={1.8} />
            </motion.div>
            <span className="text-xs font-semibold tracking-wider" style={{ color: '#0891b2' }}>HUMAN</span>
          </div>

          <div className="relative flex items-center" style={{ width: 80 }}>
            <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, rgba(8,145,178,0.4), rgba(212,175,55,0.4), rgba(124,58,237,0.4))' }} />
            <motion.div
              className="absolute rounded-full"
              style={{ width: 8, height: 8, background: '#d4af37', boxShadow: '0 0 12px #d4af37', top: -4 }}
              animate={{ x: [0, 72, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          <div className="flex flex-col items-center gap-2">
            <motion.div
              className="rounded-full flex items-center justify-center"
              style={{ width: 64, height: 64, background: 'radial-gradient(circle at 40% 35%, #fff4cf, #f5d77a 45%, #d4af37 75%)', boxShadow: '0 8px 40px rgba(212,175,55,0.4)' }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="w-8 h-8 text-[#0f172a]" />
            </motion.div>
            <span className="text-xs font-semibold tracking-wider" style={{ color: '#b8860b' }}>WISDOM</span>
          </div>

          <div className="relative flex items-center" style={{ width: 80 }}>
            <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, rgba(124,58,237,0.4), rgba(212,175,55,0.4), rgba(124,58,237,0.4))' }} />
            <motion.div
              className="absolute rounded-full"
              style={{ width: 8, height: 8, background: '#7c3aed', boxShadow: '0 0 12px #7c3aed', top: -4 }}
              animate={{ x: [72, 0, 72] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          <div className="flex flex-col items-center gap-2">
            <motion.div
              className="rounded-2xl flex items-center justify-center"
              style={{ width: 72, height: 72, background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(184,134,11,0.08))', border: '1.5px solid rgba(124,58,237,0.45)', boxShadow: '0 6px 24px rgba(124,58,237,0.2)' }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            >
              <Bot className="w-9 h-9" style={{ color: '#7c3aed' }} strokeWidth={1.8} />
            </motion.div>
            <span className="text-xs font-semibold tracking-wider" style={{ color: '#7c3aed' }}>MACHINE</span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="rounded-2xl p-7 border"
              style={{ background: '#ffffff', borderColor: 'rgba(15,23,42,0.08)', boxShadow: '0 4px 24px rgba(15,23,42,0.05)' }}
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ background: `${p.color}18`, border: `1px solid ${p.color}33` }}>
                <p.icon className="w-7 h-7" style={{ color: p.color }} />
              </div>
              <h3 className="font-display text-xl font-bold mb-3" style={{ color: '#0f172a' }}>{p.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(15,23,42,0.6)' }}>{p.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center max-w-3xl mx-auto"
        >
          <p className="font-display text-xl sm:text-2xl font-semibold leading-relaxed" style={{ color: 'rgba(15,23,42,0.75)' }}>
            "Artificial Intelligence must evolve into{' '}
            <span style={{ color: '#b8860b' }}>Artificial Wisdom</span> — where technology serves humanity, and humanity guides technology."
          </p>
        </motion.div>
      </div>
    </section>
  );
}