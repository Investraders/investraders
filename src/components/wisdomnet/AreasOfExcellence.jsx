import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Telescope, TrendingUp, Building2, Database, Network } from 'lucide-react';

const AREAS = [
  { icon: Shield, title: 'AI Governance & Trust', desc: 'Designing responsible AI governance frameworks that promote trust, transparency, accountability and security.', color: '#2563eb' },
  { icon: Telescope, title: 'Strategic Foresight', desc: 'Helping organizations anticipate change rather than react to it.', color: '#7c3aed' },
  { icon: TrendingUp, title: 'Future Economies', desc: 'Supporting countries and institutions in preparing for AI-driven economic transformation.', color: '#b8860b' },
  { icon: Building2, title: 'Organizational Governance', desc: 'Building modern governance systems for governments, corporations, chambers of commerce, universities and non-profits.', color: '#059669' },
  { icon: Database, title: 'Enterprise Intelligence', desc: 'Transforming fragmented organizational data into actionable intelligence for better decision-making.', color: '#ea580c' },
  { icon: Network, title: 'Opportunity Ecosystems', desc: 'Creating digital environments where people and organizations connect, collaborate and create value together.', color: '#0891b2' },
];

export default function AreasOfExcellence() {
  return (
    <section id="excellence" className="relative py-24 sm:py-32" style={{ background: '#f8fafc' }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.05), transparent 70%)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: '#b8860b' }}>What We Do</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-4 mb-5" style={{ color: '#0f172a' }}>Our Areas of Excellence</h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(15,23,42,0.6)' }}>Six domains where we help organizations build wisdom into their foundations.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {AREAS.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="group rounded-2xl p-7 border transition-colors"
              style={{ background: '#ffffff', borderColor: 'rgba(15,23,42,0.08)', boxShadow: '0 4px 24px rgba(15,23,42,0.05)' }}
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110" style={{ background: `${a.color}18`, border: `1px solid ${a.color}33` }}>
                <a.icon className="w-7 h-7" style={{ color: a.color }} />
              </div>
              <span className="text-xs font-mono" style={{ color: 'rgba(15,23,42,0.35)' }}>0{i + 1}</span>
              <h3 className="font-display text-xl font-bold mt-1 mb-3" style={{ color: '#0f172a' }}>{a.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(15,23,42,0.6)' }}>{a.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}