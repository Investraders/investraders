import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Check, Sparkles } from 'lucide-react';

const types = [
  'Chambers of Commerce', 'Stock Exchanges', 'Universities', 'Business Associations',
  'Professional Organizations', 'Government Agencies', 'Economic Development Orgs', 'Industry Federations',
];

const insights = [
  'Which members are growing',
  'Which companies need support',
  'Which sectors are creating opportunities',
  'Which businesses are attracting customers',
  'Which communities are most engaged',
];

const features = [
  'Create unlimited circles',
  'Engage members continuously',
  'Share opportunities and events',
  'Promote innovation and entrepreneurship',
  'Connect stakeholders across borders',
  'Monitor engagement and growth',
  'Strengthen visibility nationally and internationally',
];

export default function InstitutionsSection() {
  return (
    <section id="institutions" className="relative py-24 sm:py-32" style={{ background: '#030712' }}>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent, rgba(6,182,212,0.03), transparent)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-wider mb-6" style={{ borderColor: 'rgba(6,182,212,0.3)', background: 'rgba(6,182,212,0.1)', color: '#22d3ee' }}>
            <Building2 className="w-3.5 h-3.5" /> For Institutions
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Empower Your Ecosystem</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Strengthen Your Community. Build Digital Infrastructure.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="flex flex-wrap justify-center gap-2 mb-16">
          {types.map(t => (
            <span key={t} className="px-4 py-2 rounded-full border border-white/10 text-gray-300 text-sm" style={{ background: 'rgba(255,255,255,0.03)' }}>{t}</span>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="rounded-2xl border border-white/10 p-8" style={{ background: 'rgba(255,255,255,0.03)' }}>
            <h3 className="text-xl font-bold text-white mb-2">The Missing Link</h3>
            <p className="text-gray-400 text-sm mb-6">Most institutions know who their members are. Few truly understand:</p>
            <div className="space-y-3">
              {insights.map(item => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: 'rgba(245,158,11,0.2)' }}>
                    <Sparkles className="w-3 h-3 text-amber-400" />
                  </div>
                  <span className="text-gray-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 font-semibold text-sm" style={{ color: '#22d3ee' }}>Investrade provides the missing link.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="rounded-2xl border p-8" style={{ borderColor: 'rgba(6,182,212,0.2)', background: 'rgba(6,182,212,0.05)' }}>
            <h3 className="text-xl font-bold text-white mb-2">Manage Your Community</h3>
            <p className="text-gray-400 text-sm mb-6">Through a single platform, institutions can:</p>
            <div className="space-y-3">
              {features.map(item => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: 'rgba(6,182,212,0.2)' }}>
                    <Check className="w-3 h-3" style={{ color: '#22d3ee' }} />
                  </div>
                  <span className="text-gray-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}