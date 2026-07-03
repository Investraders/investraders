import React from 'react';
import { motion } from 'framer-motion';
import { Users, BrainCircuit, Shield } from 'lucide-react';

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
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative my-16 mx-auto max-w-3xl"
        >
          <div className="absolute pointer-events-none" style={{ inset: '-20px', background: 'radial-gradient(ellipse at 50% 50%, rgba(8,145,178,0.18), rgba(124,58,237,0.12), transparent 70%)', filter: 'blur(30px)' }} />
          <div className="relative rounded-3xl overflow-hidden border" style={{ borderColor: 'rgba(15,23,42,0.1)', boxShadow: '0 20px 60px rgba(15,23,42,0.18)' }}>
            <img
              src="https://media.base44.com/images/public/6a24647fa35a48a782a639ea/fa31a32f1_generated_image.png"
              alt="A human and a robot smiling warmly and shaking hands — the future of human-machine coexistence"
              className="w-full h-auto block"
              loading="lazy"
            />
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