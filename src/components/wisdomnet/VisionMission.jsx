import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Target } from 'lucide-react';

export default function VisionMission() {
  return (
    <section className="relative py-24 sm:py-32" style={{ background: '#ffffff' }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(37,99,235,0.05), transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(212,175,55,0.05), transparent 60%)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl p-8 lg:p-10 border"
            style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.05), rgba(37,99,235,0.02))', borderColor: 'rgba(37,99,235,0.2)', boxShadow: '0 4px 24px rgba(37,99,235,0.06)' }}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ background: 'rgba(37,99,235,0.12)' }}>
              <Eye className="w-6 h-6" style={{ color: '#2563eb' }} />
            </div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: '#2563eb' }}>Our Vision</span>
            <p className="font-display text-xl sm:text-2xl font-semibold mt-4 leading-relaxed" style={{ color: '#0f172a' }}>
              To become a global catalyst for the transition toward a Wisdom Economy where artificial intelligence empowers humanity, institutions operate with transparency and wisdom, and every individual has access to meaningful opportunities regardless of geography or background.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl p-8 lg:p-10 border"
            style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.05), rgba(212,175,55,0.02))', borderColor: 'rgba(212,175,55,0.25)', boxShadow: '0 4px 24px rgba(212,175,55,0.06)' }}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ background: 'rgba(212,175,55,0.14)' }}>
              <Target className="w-6 h-6" style={{ color: '#b8860b' }} />
            </div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: '#b8860b' }}>Our Mission</span>
            <p className="font-display text-xl sm:text-2xl font-semibold mt-4 leading-relaxed" style={{ color: '#0f172a' }}>
              To develop innovative digital ecosystems, strategic frameworks and AI-enabled platforms that empower governments, businesses, educational institutions and communities to build resilient, connected and opportunity-driven societies.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}