import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Target, Eye, ArrowRight } from 'lucide-react';

export default function MissionCTASection() {
  return (
    <>
      {/* Mission & Vision */}
      <section className="relative py-24 sm:py-32" style={{ background: '#030712' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">What Drives Us</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="rounded-2xl border p-8" style={{ borderColor: 'rgba(6,182,212,0.2)', background: 'rgba(6,182,212,0.05)' }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(6,182,212,0.15)' }}>
                <Target className="w-6 h-6" style={{ color: '#22d3ee' }} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-gray-300 leading-relaxed">
                To empower institutions, companies, entrepreneurs, and individuals worldwide to build thriving communities that create opportunities, foster collaboration, and generate sustainable economic growth.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="rounded-2xl border p-8" style={{ borderColor: 'rgba(59,130,246,0.2)', background: 'rgba(59,130,246,0.05)' }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(59,130,246,0.15)' }}>
                <Eye className="w-6 h-6" style={{ color: '#60a5fa' }} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-gray-300 leading-relaxed">
                To become the world's leading platform for Business Circles and Community Intelligence, connecting millions of organizations and individuals through trusted ecosystems that transform relationships into opportunities.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-24 sm:py-32 overflow-hidden" style={{ background: '#030712' }}>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(6,182,212,0.06) 0%, transparent 70%)' }} />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
              Your Community{' '}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #22d3ee, #60a5fa)' }}>Starts Here</span>
            </h2>

            <div className="space-y-2 text-gray-300 text-lg mb-10">
              <p>Create Your Circle.</p>
              <p>Grow Your Community.</p>
              <p>Expand Your Visibility.</p>
              <p>Connect With The World.</p>
            </div>

            <Link to="/register" className="inline-flex items-center gap-2 text-white font-semibold px-10 py-4 rounded-full text-lg shadow-lg" style={{ background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', boxShadow: '0 8px 32px rgba(6,182,212,0.25)' }}>
              Get Started <ArrowRight className="w-5 h-5" />
            </Link>

            <p className="mt-8 font-bold text-sm uppercase tracking-wider" style={{ color: '#fbbf24' }}>
              Make Money Meanwhile — 3M
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8" style={{ background: '#030712' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center gap-2.5 mb-4">
            <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: 'radial-gradient(circle, #67e8f9, #0ea5e9)' }}>
              <span className="text-white font-bold text-xs italic">i</span>
            </div>
            <span className="text-white font-bold text-base">Investrade Circles</span>
          </div>
          <p className="text-gray-500 text-sm">Where Communities Create Opportunities.</p>
          <p className="text-gray-600 text-xs mt-4">© {new Date().getFullYear()} Investrade. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}