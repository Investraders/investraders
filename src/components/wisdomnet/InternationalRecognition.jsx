import React from 'react';
import { motion } from 'framer-motion';
import { Award, Globe2 } from 'lucide-react';
import PartnerLogos from '@/components/wisdomnet/PartnerLogos';

export default function InternationalRecognition() {
  return (
    <section id="recognition" className="relative py-24 sm:py-32" style={{ background: '#ffffff' }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(34,197,94,0.06), transparent 65%)' }} />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl p-8 sm:p-12 border relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.05), rgba(212,175,55,0.03))', borderColor: 'rgba(34,197,94,0.2)' }}
        >
          <div className="absolute" style={{ top: '-60px', right: '-60px', width: 240, height: 240, background: 'radial-gradient(circle, rgba(34,197,94,0.12), transparent 70%)', filter: 'blur(50px)' }} />

          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.25)' }}>
                <Award className="w-6 h-6" style={{ color: '#16a34a' }} />
              </div>
              <span className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: '#16a34a' }}>International Recognition</span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-6 leading-tight" style={{ color: '#0f172a' }}>
              Driving Responsible AI for Sustainable Development
            </h2>

            <p className="text-base sm:text-lg leading-relaxed mb-6" style={{ color: 'rgba(15,23,42,0.65)' }}>
              Wisdom Net is proud to be among the selected innovators participating in the{' '}
              <span className="font-semibold" style={{ color: '#16a34a' }}>AI Hub for Sustainable Development</span>, a global initiative supported by the Government of Italy and implemented by the{' '}
              <span className="font-semibold" style={{ color: '#16a34a' }}>United Nations Development Programme (UNDP)</span>. The initiative brings together innovators with international technical partners including Microsoft, AWS, CINECA and other leading organizations to strengthen trusted and sustainable AI ecosystems.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-6 border-t" style={{ borderColor: 'rgba(15,23,42,0.08)' }}>
              <Globe2 className="w-5 h-5" style={{ color: '#16a34a' }} />
              <span className="text-sm font-medium" style={{ color: 'rgba(15,23,42,0.7)' }}>Advancing AI Trust, responsible AI governance, and inclusive economic growth.</span>
            </div>

            <PartnerLogos />
          </div>
        </motion.div>
      </div>
    </section>
  );
}