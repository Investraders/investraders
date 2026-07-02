import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, Sparkles } from 'lucide-react';

const INSTITUTION_TYPES = [
  'Chambers of Commerce', 'Stock Exchanges', 'Universities', 'Government Agencies',
  'Business Associations', 'Export Promotion Agencies', 'Technology Parks', 'Free Zones', 'Innovation Hubs',
];

export default function WisdomEcosystems() {
  return (
    <section className="relative py-24 sm:py-32" style={{ background: '#040713' }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.05), transparent 60%)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Institutions */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-[0.2em] mb-6" style={{ borderColor: 'rgba(59,130,246,0.3)', background: 'rgba(59,130,246,0.08)', color: '#60a5fa' }}>
              <Building2 className="w-3.5 h-3.5" /> For Institutions
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-5" style={{ color: '#f5f0e6' }}>Empowering Business Ecosystems</h2>
            <p className="text-lg leading-relaxed mb-6" style={{ color: 'rgba(245,240,230,0.6)' }}>
              Wisdom Net believes institutions are the <span className="font-medium" style={{ color: '#60a5fa' }}>architects of prosperous societies</span>. Through Investraders, institutions can create intelligent digital ecosystems that improve stakeholder engagement and strategic visibility — gaining real-time insight into their communities while enabling collaboration, investment, trade and innovation.
            </p>
            <div className="flex flex-wrap gap-2">
              {INSTITUTION_TYPES.map(t => (
                <span key={t} className="px-3.5 py-1.5 rounded-full border text-xs" style={{ background: 'rgba(59,130,246,0.06)', borderColor: 'rgba(59,130,246,0.2)', color: 'rgba(191,219,254,0.9)' }}>{t}</span>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="grid grid-cols-2 gap-4">
            {[
              { label: 'Stakeholder Engagement', val: 'Real-time' },
              { label: 'Strategic Visibility', val: 'End-to-end' },
              { label: 'Collaboration', val: 'Cross-border' },
              { label: 'Investment & Trade', val: 'Enabled' },
            ].map((s, i) => (
              <div key={s.label} className="rounded-2xl p-6 border" style={{ background: 'rgba(59,130,246,0.04)', borderColor: 'rgba(59,130,246,0.15)' }}>
                <div className="font-display text-xl font-bold" style={{ color: '#60a5fa' }}>{s.val}</div>
                <div className="text-sm mt-1" style={{ color: 'rgba(245,240,230,0.55)' }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Individuals */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="order-2 lg:order-1">
            <div className="rounded-3xl p-8 border" style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.08), rgba(212,175,55,0.02))', borderColor: 'rgba(212,175,55,0.25)' }}>
              <p className="leading-relaxed mb-4" style={{ color: 'rgba(245,240,230,0.6)' }}>
                Every person possesses knowledge. Every person possesses talent. Every person possesses relationships. <span className="font-medium" style={{ color: '#f5d77a' }}>These are valuable assets.</span>
              </p>
              <p className="leading-relaxed" style={{ color: 'rgba(245,240,230,0.6)' }}>
                Investraders enables individuals to transform these assets into thriving communities that create opportunities, partnerships and sustainable income.
              </p>
              <div className="mt-6 flex items-center gap-3 pt-6 border-t" style={{ borderColor: 'rgba(212,175,55,0.15)' }}>
                <Sparkles className="w-5 h-5" style={{ color: '#f5d77a' }} />
                <span className="font-display text-lg font-bold" style={{ color: '#f5d77a' }}>We call this philosophy: Make Money Meanwhile (3M)</span>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-[0.2em] mb-6" style={{ borderColor: 'rgba(212,175,55,0.3)', background: 'rgba(212,175,55,0.08)', color: '#f5d77a' }}>
              <Users className="w-3.5 h-3.5" /> For Individuals
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-5" style={{ color: '#f5f0e6' }}>Where Dreams Become Opportunities</h2>
            <p className="text-lg leading-relaxed" style={{ color: 'rgba(245,240,230,0.6)' }}>
              Instead of spending time only consuming content, people can <span className="font-medium" style={{ color: '#f5d77a' }}>create value while interacting with their communities</span> — transforming passion, skill and relationships into thriving opportunity ecosystems.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}