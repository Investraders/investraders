import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Check } from 'lucide-react';

const items = [
  'Build a personal brand',
  'Offer products and services',
  'Promote events',
  'Share expertise',
  'Create educational content',
  'Connect opportunities',
  'Generate business leads',
  'Monetize your influence',
];

export default function MonetizeSection() {
  return (
    <section id="monetize" className="relative py-24 sm:py-32 overflow-hidden" style={{ background: '#030712' }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(245,158,11,0.06) 0%, transparent 70%)' }} />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border text-sm font-bold uppercase tracking-wider mb-8" style={{ borderColor: 'rgba(245,158,11,0.3)', background: 'rgba(245,158,11,0.1)', color: '#fbbf24' }}>
            <DollarSign className="w-4 h-4" /> Make Money Meanwhile — 3M
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Your Time Is Your{' '}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #fbbf24, #f97316)' }}>Most Valuable Asset</span>
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
            Most people spend hours every day online creating value for platforms. At Investrade, we believe you should be rewarded for the value you create.
          </p>

          <div className="grid sm:grid-cols-2 gap-3 max-w-2xl mx-auto mb-12 text-left">
            {items.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl border"
                style={{ background: 'rgba(245,158,11,0.05)', borderColor: 'rgba(245,158,11,0.12)' }}
              >
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-gray-200 text-sm">{item}</span>
              </motion.div>
            ))}
          </div>

          <div className="rounded-2xl border p-8 max-w-xl mx-auto" style={{ borderColor: 'rgba(245,158,11,0.2)', background: 'rgba(245,158,11,0.05)' }}>
            <p className="text-lg font-medium italic leading-relaxed" style={{ color: '#fde68a' }}>
              "Serve your community better than anyone else. The more value you create, the more opportunities you attract."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}