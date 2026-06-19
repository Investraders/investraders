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
];

function InstitutionPhone() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', paddingTop: 8 }}>
      {/* Status bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 20px 0', flexShrink: 0 }}>
        <span style={{ color: 'white', fontSize: 11, fontWeight: 700 }}>9:41</span>
        <div style={{ width: 90 }} />
        <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 10 }}>◼◼◼ ▌</span>
      </div>

      {/* Circle header */}
      <div style={{ background: 'linear-gradient(135deg, #0c4a6e, #0369a1)', padding: '14px 16px 12px', flexShrink: 0, marginTop: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🏛</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ color: 'white', fontSize: 13, fontWeight: 700 }}>Cairo Chamber</span>
              <span style={{ background: '#22d3ee', color: '#051e2e', fontSize: 8, fontWeight: 900, padding: '1px 5px', borderRadius: 3 }}>✓</span>
            </div>
            <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: 10 }}>247 members · Institution</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 18 }}>
          {[['24', 'Posts'], ['12', 'Events'], ['8', 'Markets']].map(([n, l]) => (
            <div key={l}>
              <div style={{ color: 'white', fontSize: 14, fontWeight: 800 }}>{n}</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 9 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Ticker */}
      <div style={{ background: '#0f172a', padding: '5px 14px', display: 'flex', gap: 14, flexShrink: 0, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        {[['S&P 500', '+0.74%', true], ['BTC', '+2.1%', true], ['Gold', '-0.3%', false]].map(([s, c, up]) => (
          <span key={s} style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)' }}>{s} <span style={{ color: up ? '#22c55e' : '#ef4444', fontWeight: 700 }}>{c}</span></span>
        ))}
      </div>

      {/* Tab bar */}
      <div style={{ display: 'flex', padding: '8px 14px 0', gap: 14, flexShrink: 0 }}>
        {['Feed', 'Events', 'Members'].map((tab, i) => (
          <span key={tab} style={{ fontSize: 10, fontWeight: i === 0 ? 700 : 500, color: i === 0 ? '#22d3ee' : 'rgba(255,255,255,0.4)', borderBottom: i === 0 ? '1.5px solid #22d3ee' : 'none', paddingBottom: 4 }}>{tab}</span>
        ))}
      </div>

      {/* Feed */}
      <div style={{ flex: 1, padding: '10px', display: 'flex', flexDirection: 'column', gap: 8, overflow: 'hidden' }}>
        <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
            <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', flexShrink: 0 }} />
            <div>
              <div style={{ color: 'white', fontSize: 10, fontWeight: 600 }}>Dr. Ahmed Hassan</div>
              <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 9 }}>2h ago</div>
            </div>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 10, lineHeight: 1.5, margin: 0 }}>New investment opportunities available for Q3 Chamber members — register now!</p>
          <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 9 }}>👍 24</span>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 9 }}>💬 8</span>
          </div>
        </div>

        <div style={{ borderRadius: 10, padding: '10px 12px', background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.2)' }}>
          <div style={{ color: '#22d3ee', fontSize: 9, fontWeight: 800, marginBottom: 4 }}>📅 UPCOMING EVENT</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
            <div>
              <div style={{ color: 'white', fontSize: 11, fontWeight: 600 }}>Business Networking</div>
              <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 9, marginTop: 2 }}>Jun 25 · 10:00 AM</div>
            </div>
            <div style={{ background: '#22d3ee', color: '#051e2e', fontSize: 9, fontWeight: 800, padding: '5px 10px', borderRadius: 8, flexShrink: 0 }}>Join</div>
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 10, padding: '8px 10px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}>
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg,#f59e0b,#ef4444)', flexShrink: 0 }} />
            <div style={{ color: 'white', fontSize: 10, fontWeight: 600 }}>Sarah Al-Malik</div>
            <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 8, marginLeft: 'auto' }}>5h ago</div>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 9, lineHeight: 1.4, margin: 0 }}>📊 Q2 Economic Report: SME sector grew 18% this quarter...</p>
        </div>
      </div>

      {/* Bottom nav */}
      <div style={{ height: 48, background: '#0d1526', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexShrink: 0 }}>
        {[['🏠', 'Home'], ['🔍', 'Explore'], ['🔔', 'Alerts'], ['👤', 'Profile']].map(([icon, label]) => (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <span style={{ fontSize: 15 }}>{icon}</span>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 8 }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PhoneFrame({ children, glowColor }) {
  return (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ position: 'absolute', inset: '-30%', background: `radial-gradient(ellipse at center, ${glowColor}, transparent 70%)`, filter: 'blur(40px)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', width: 260, background: 'linear-gradient(145deg, #1c1c2e, #12121e)', borderRadius: 46, padding: 12, boxShadow: '0 30px 60px rgba(0,0,0,0.7), inset 0 0 0 1.5px rgba(255,255,255,0.12)' }}>
        <div style={{ borderRadius: 34, overflow: 'hidden', height: 520, background: '#0a0f1e', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', width: 80, height: 22, background: '#0a0f1e', borderRadius: 20, zIndex: 10, border: '1.5px solid rgba(255,255,255,0.08)' }} />
          {children}
        </div>
        <div style={{ height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 80, height: 4, background: 'rgba(255,255,255,0.25)', borderRadius: 2 }} />
        </div>
      </div>
    </div>
  );
}

export default function InstitutionsSection() {
  return (
    <section id="institutions" className="relative py-24 sm:py-32" style={{ background: '#030712' }}>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent, rgba(6,182,212,0.03), transparent)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-wider mb-6" style={{ borderColor: 'rgba(6,182,212,0.3)', background: 'rgba(6,182,212,0.1)', color: '#22d3ee' }}>
            <Building2 className="w-3.5 h-3.5" /> For Institutions
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Empower Your Ecosystem</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Strengthen Your Community. Build Digital Infrastructure.</p>
        </motion.div>

        {/* Tag pills */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="flex flex-wrap justify-center gap-2 mb-16">
          {types.map(t => (
            <span key={t} className="px-4 py-2 rounded-full border border-white/10 text-gray-300 text-sm" style={{ background: 'rgba(255,255,255,0.03)' }}>{t}</span>
          ))}
        </motion.div>

        {/* Main: cards left, phone right */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: stacked cards */}
          <div className="flex flex-col gap-6">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="rounded-2xl border border-white/10 p-7" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <h3 className="text-xl font-bold text-white mb-2">The Missing Link</h3>
              <p className="text-gray-400 text-sm mb-5">Most institutions know who their members are. Few truly understand:</p>
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
              <p className="mt-5 font-semibold text-sm" style={{ color: '#22d3ee' }}>Investrade provides the missing link.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }} className="rounded-2xl border p-7" style={{ borderColor: 'rgba(6,182,212,0.2)', background: 'rgba(6,182,212,0.05)' }}>
              <h3 className="text-xl font-bold text-white mb-2">Manage Your Community</h3>
              <p className="text-gray-400 text-sm mb-5">Through a single platform, institutions can:</p>
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

          {/* Right: phone mockup */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }} className="flex justify-center lg:justify-end">
            <PhoneFrame glowColor="rgba(6,182,212,0.25)">
              <InstitutionPhone />
            </PhoneFrame>
          </motion.div>
        </div>
      </div>
    </section>
  );
}