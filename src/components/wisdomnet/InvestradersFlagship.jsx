import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Rocket } from 'lucide-react';

const MINDSET_ROLES = [
  'an entrepreneur', 'a student', 'a university', 'a chamber of commerce',
  'a corporation', 'a government agency', 'an investor', 'or simply someone with a passion',
];

export default function InvestradersFlagship() {
  return (
    <section id="investraders" className="relative py-24 sm:py-32" style={{ background: '#ffffff' }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(212,175,55,0.07), transparent 65%)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-[0.2em] mb-6" style={{ borderColor: 'rgba(212,175,55,0.3)', background: 'rgba(212,175,55,0.08)', color: '#b8860b' }}>
            <Sparkles className="w-3.5 h-3.5" /> The Flagship Platform
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-5" style={{ color: '#0f172a' }}>
            Introducing{' '}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #d4af37, #b8860b)' }}>Investraders</span>
          </h2>
          <p className="text-xl mb-6" style={{ color: 'rgba(15,23,42,0.65)' }}>The practical embodiment of the Wisdom Economy.</p>
          <p className="text-base max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(15,23,42,0.55)' }}>
            It is not simply another social platform. It is an <span className="font-medium" style={{ color: '#b8860b' }}>Opportunity Ecosystem</span> where individuals, companies and institutions transform relationships into opportunities, communities into value, and engagement into sustainable income.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto rounded-3xl p-8 sm:p-10 mb-20 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.12), rgba(212,175,55,0.03))', border: '1px solid rgba(212,175,55,0.35)' }}
        >
          <div className="absolute" style={{ top: '-40px', right: '-40px', width: 200, height: 200, background: 'radial-gradient(circle, rgba(212,175,55,0.2), transparent 70%)', filter: 'blur(40px)' }} />
          <div className="relative flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #f5d77a, #d4af37)', boxShadow: '0 8px 30px rgba(212,175,55,0.35)' }}>
                <Rocket className="w-10 h-10 text-white" />
              </div>
            </div>
            <div className="text-center sm:text-left flex-1">
              <h3 className="font-display text-2xl sm:text-3xl font-bold" style={{ color: '#b8860b' }}>Make Money Meanwhile (3M)</h3>
              <p className="mt-2" style={{ color: 'rgba(15,23,42,0.65)' }}>Instead of spending time only consuming content, people can create value while interacting with their communities.</p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: '#b8860b' }}>The Mindset</span>
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mt-3 mb-6" style={{ color: '#0f172a' }}>A New Mindset for the AI Age</h3>
            <p className="leading-relaxed mb-4" style={{ color: 'rgba(15,23,42,0.65)' }}>
              Artificial Intelligence will eliminate many repetitive tasks. But it will also create unprecedented opportunities for people capable of building communities, trust, knowledge and meaningful relationships.
            </p>
            <p className="leading-relaxed" style={{ color: 'rgba(15,23,42,0.65)' }}>
              The future belongs to those who <span className="font-semibold" style={{ color: '#b8860b' }}>create value for others</span>. Investraders enables everyone to do exactly that.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            <p className="text-sm mb-4" style={{ color: 'rgba(15,23,42,0.55)' }}>Whether you are:</p>
            <div className="flex flex-col gap-2">
              {MINDSET_ROLES.map((role, i) => (
                <motion.div
                  key={role}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-3 px-5 py-3 rounded-xl border"
                  style={{ background: '#ffffff', borderColor: 'rgba(212,175,55,0.2)', boxShadow: '0 2px 10px rgba(15,23,42,0.03)' }}
                >
                  <ArrowRight className="w-4 h-4 flex-shrink-0" style={{ color: '#b8860b' }} />
                  <span className="text-sm capitalize" style={{ color: '#0f172a' }}>{role}</span>
                </motion.div>
              ))}
            </div>
            <p className="mt-4 text-center font-medium" style={{ color: '#b8860b' }}>— You can build your own opportunity ecosystem.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}