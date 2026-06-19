import React from 'react';
import { motion } from 'framer-motion';
import { Users, Star } from 'lucide-react';

const topics = [
  'Technology', 'Sports', 'Education', 'Travel', 'Art', 'Investment',
  'Gaming', 'Health', 'Personal Development', 'Music', 'Food', 'Fashion',
];

const benefits = [
  'Build your audience',
  'Grow your influence',
  'Create value for your community',
  'Transform your passion into income',
];

export default function IndividualsSection() {
  return (
    <section id="individuals" className="relative py-24 sm:py-32" style={{ background: '#030712' }}>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent, rgba(139,92,246,0.03), transparent)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-wider mb-6" style={{ borderColor: 'rgba(139,92,246,0.3)', background: 'rgba(139,92,246,0.1)', color: '#a78bfa' }}>
              <Users className="w-3.5 h-3.5" /> For Individuals
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Where Dreams Become{' '}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #a78bfa, #f472b6)' }}>Communities</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Everyone has a passion, a skill, a talent, a dream. But not everyone has the tools to turn them into opportunities. Investrade gives you those tools.
            </p>

            <div className="space-y-4">
              {benefits.map(b => (
                <div key={b} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899)' }}>
                    <Star className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-200 font-medium">{b}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="grid grid-cols-3 gap-3">
            {topics.map((topic, i) => (
              <motion.div
                key={topic}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="rounded-xl border border-white/10 p-4 text-center cursor-default transition-colors hover:border-white/20"
                style={{ background: 'rgba(255,255,255,0.03)' }}
              >
                <span className="text-gray-300 text-sm font-medium">{topic}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}