import React from 'react';
import { motion } from 'framer-motion';
import { Users, Star } from 'lucide-react';

const benefits = [
  'Build your audience',
  'Grow your influence',
  'Create value for your community',
  'Transform your passion into income',
];

function IndividualPhone() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', paddingTop: 8 }}>
      {/* Status bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 20px 0', flexShrink: 0 }}>
        <span style={{ color: 'white', fontSize: 11, fontWeight: 700 }}>9:41</span>
        <div style={{ width: 90 }} />
        <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 10 }}>◼◼◼ ▌</span>
      </div>

      {/* Circle header */}
      <div style={{ background: 'linear-gradient(135deg, #4c1d95, #7c3aed)', padding: '14px 16px 12px', flexShrink: 0, marginTop: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg, #a78bfa, #f472b6)', border: '2px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>💡</div>
          <div style={{ flex: 1 }}>
            <span style={{ color: 'white', fontSize: 13, fontWeight: 700, display: 'block' }}>Finance Innovators</span>
            <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: 10 }}>1.2k members · Individual</span>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 8, padding: '4px 10px', flexShrink: 0 }}>
            <span style={{ color: 'white', fontSize: 10, fontWeight: 600 }}>+ Join</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'nowrap' }}>
          {['Investment', 'Trading', 'Startups'].map(tag => (
            <span key={tag} style={{ background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)', fontSize: 9, fontWeight: 600, padding: '2px 8px', borderRadius: 10, whiteSpace: 'nowrap' }}>{tag}</span>
          ))}
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ display: 'flex', padding: '8px 14px 0', gap: 14, flexShrink: 0, borderBottom: '1px solid rgba(255,255,255,0.06)', background: '#0d1526' }}>
        {['Feed', 'Circle', 'Members'].map((tab, i) => (
          <span key={tab} style={{ fontSize: 10, fontWeight: i === 0 ? 700 : 500, color: i === 0 ? '#a78bfa' : 'rgba(255,255,255,0.4)', borderBottom: i === 0 ? '1.5px solid #a78bfa' : 'none', paddingBottom: 4 }}>{tab}</span>
        ))}
      </div>

      {/* Story bar */}
      <div style={{ padding: '8px 12px', display: 'flex', gap: 10, flexShrink: 0, borderBottom: '1px solid rgba(255,255,255,0.05)', background: '#0a0f1e' }}>
        {[['💜', 'You'], ['💙', 'Sarah'], ['💛', 'Mike'], ['💚', 'Ana']].map(([c, name]) => (
          <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #a78bfa, #f472b6)', padding: 2 }}>
              <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#0a0f1e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>{c}</div>
            </div>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 8 }}>{name}</span>
          </div>
        ))}
      </div>

      {/* Feed */}
      <div style={{ flex: 1, padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 8, overflow: 'hidden', background: '#0a0f1e' }}>
        {/* Post 1 */}
        <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'linear-gradient(135deg,#f472b6,#ec4899)', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ color: 'white', fontSize: 10, fontWeight: 600 }}>Sarah Chen</div>
              <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 8 }}>1h ago · Investment</div>
            </div>
            <div style={{ color: '#a78bfa', fontSize: 8, fontWeight: 700, background: 'rgba(167,139,250,0.1)', padding: '2px 6px', borderRadius: 6, flexShrink: 0 }}>⭐ Top</div>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 10, lineHeight: 1.5, margin: 0 }}>Best portfolio diversification strategy for 2026 market conditions...</p>
          <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 9 }}>❤️ 47</span>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 9 }}>💬 12</span>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 9 }}>🔗 Share</span>
          </div>
        </div>

        {/* Post 2 */}
        <div style={{ background: 'rgba(167,139,250,0.06)', borderRadius: 10, padding: '9px 10px', border: '1px solid rgba(167,139,250,0.15)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}>
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg,#06b6d4,#3b82f6)', flexShrink: 0 }} />
            <div style={{ color: 'white', fontSize: 10, fontWeight: 600 }}>Mike Trades</div>
            <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 8, marginLeft: 'auto' }}>3h ago</div>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 9, lineHeight: 1.5, margin: 0 }}>🚀 Just hit 200% ROI on my tech portfolio this quarter!</p>
        </div>

        {/* Leaderboard mini card */}
        <div style={{ background: 'rgba(251,146,60,0.07)', borderRadius: 10, padding: '8px 10px', border: '1px solid rgba(251,146,60,0.15)' }}>
          <div style={{ color: '#fb923c', fontSize: 9, fontWeight: 800, marginBottom: 5 }}>🏆 WEEKLY LEADERBOARD</div>
          {[['Sarah C.', '247 pts'], ['Mike T.', '183 pts'], ['Ana R.', '142 pts']].map(([name, pts], i) => (
            <div key={name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 9 }}>#{i + 1} {name}</span>
              <span style={{ color: '#fb923c', fontSize: 9, fontWeight: 700 }}>{pts}</span>
            </div>
          ))}
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

export default function IndividualsSection() {
  return (
    <section id="individuals" className="relative py-24 sm:py-32" style={{ background: '#030712' }}>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent, rgba(139,92,246,0.03), transparent)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: text content */}
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

            <div className="space-y-4 mb-10">
              {benefits.map(b => (
                <div key={b} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899)' }}>
                    <Star className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-200 font-medium">{b}</span>
                </div>
              ))}
            </div>

            {/* Topic interest chips — moved here below benefits */}
            <div className="flex flex-wrap gap-2">
              {['Technology', 'Finance', 'Sports', 'Education', 'Art', 'Gaming', 'Health', 'Music'].map(topic => (
                <span key={topic} className="px-3 py-1.5 rounded-full border border-white/10 text-gray-400 text-xs" style={{ background: 'rgba(139,92,246,0.06)' }}>{topic}</span>
              ))}
            </div>
          </motion.div>

          {/* Right: phone mockup */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }} className="flex justify-center lg:justify-end">
            <PhoneFrame glowColor="rgba(139,92,246,0.25)">
              <IndividualPhone />
            </PhoneFrame>
          </motion.div>
        </div>
      </div>
    </section>
  );
}