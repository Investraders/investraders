import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const QUESTIONS = [
  { label: 'Q. 1', text: 'How do market cycles\naffect your strategy?', count: '14 / 8' },
  { label: 'Q. 2', text: 'What sector is your\ntop pick for 2026?', count: '22 / 15' },
  { label: 'Q. 3', text: 'How do you manage\nportfolio risk daily?', count: '18 / 11' },
];

const ORBIT_MEMBERS = [
  { name: 'Sarah', color: '#8b5cf6', angle: 40,  radius: 210, size: 52, hasPhoto: false },
  { name: 'Omar',  color: '#f59e0b', angle: 100, radius: 200, size: 48, hasPhoto: true  },
  { name: 'Lina',  color: '#10b981', angle: 155, radius: 215, size: 50, hasPhoto: false },
  { name: 'Ahmed', color: '#3b82f6', angle: 210, radius: 205, size: 46, hasPhoto: false },
  { name: 'Nour',  color: '#ec4899', angle: 260, radius: 210, size: 50, hasPhoto: false },
  { name: 'Karim', color: '#22d3ee', angle: 310, radius: 200, size: 48, hasPhoto: true  },
  { name: 'Mia',   color: '#a78bfa', angle: 355, radius: 218, size: 44, hasPhoto: false },
];

const FLOAT_COMMENTS = [
  { text: 'Diversify into bonds...', member: 'Sarah',  color: '#8b5cf6' },
  { text: 'Tech sector is my bet!', member: 'Karim',   color: '#22d3ee' },
  { text: 'Hedge with gold & BTC', member: 'Ahmed',    color: '#3b82f6' },
  { text: 'Risk = Opportunity 🚀',  member: 'Nour',    color: '#ec4899' },
];

function deg2rad(deg) { return (deg * Math.PI) / 180; }

function MemberBubble({ member, floatingComment, delay }) {
  const x = Math.cos(deg2rad(member.angle)) * member.radius;
  const y = Math.sin(deg2rad(member.angle)) * member.radius;

  return (
    <motion.div
      style={{ position: 'absolute', left: '50%', top: '50%', x: x - member.size / 2, y: y - member.size / 2 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, type: 'spring' }}
    >
      {/* Comment bubble */}
      <AnimatePresence>
        {floatingComment && (
          <motion.div
            key={floatingComment.text}
            initial={{ opacity: 0, y: 6, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.85 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'absolute',
              bottom: member.size + 6,
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(15,23,42,0.95)',
              border: `1px solid ${member.color}55`,
              borderRadius: 10,
              padding: '5px 10px',
              whiteSpace: 'nowrap',
              zIndex: 20,
              boxShadow: `0 4px 20px ${member.color}33`,
            }}
          >
            <span style={{ color: 'white', fontSize: 10, fontWeight: 600 }}>{floatingComment.text}</span>
            <div style={{ position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)', width: 8, height: 8, background: 'rgba(15,23,42,0.95)', border: `1px solid ${member.color}55`, borderTop: 'none', borderLeft: 'none', rotate: '45deg' }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Avatar */}
      <motion.div
        whileHover={{ scale: 1.15 }}
        style={{
          width: member.size,
          height: member.size,
          borderRadius: '50%',
          background: member.hasPhoto
            ? `linear-gradient(135deg, ${member.color}, ${member.color}88)`
            : `radial-gradient(circle at 35% 35%, ${member.color}cc, ${member.color}66)`,
          border: `2.5px solid ${member.color}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: `0 0 16px ${member.color}55`,
          position: 'relative',
        }}
      >
        {member.hasPhoto ? (
          <span style={{ fontSize: member.size * 0.4, filter: 'grayscale(0.2)' }}>👤</span>
        ) : (
          <span style={{ color: 'white', fontSize: member.size * 0.42, fontWeight: 800, opacity: 0.9 }}>?</span>
        )}
      </motion.div>

      {/* Name label */}
      <div style={{ position: 'absolute', top: member.size + 3, left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.7)', borderRadius: 6, padding: '1px 6px', whiteSpace: 'nowrap' }}>
        <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 9, fontWeight: 600 }}>{member.name}</span>
      </div>
    </motion.div>
  );
}

function CenterSphere({ question }) {
  return (
    <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 240, height: 240, zIndex: 5 }}>
      {/* Outer glow rings */}
      <div style={{ position: 'absolute', inset: -30, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(59,130,246,0.15), transparent 70%)', animation: 'pulse 3s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', inset: -15, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(59,130,246,0.1), transparent 70%)', animation: 'pulse 3s ease-in-out infinite 1s' }} />

      {/* Sphere body */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        background: 'radial-gradient(circle at 38% 32%, #6baee8, #2563eb 45%, #1e40af 75%, #1e3a8a)',
        boxShadow: '0 0 60px rgba(59,130,246,0.5), 0 0 120px rgba(59,130,246,0.2), inset 0 -20px 40px rgba(0,0,0,0.3)',
        border: '1px solid rgba(147,197,253,0.2)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: 24,
      }}>
        {/* Highlight */}
        <div style={{ position: 'absolute', top: '15%', left: '22%', width: '35%', height: '25%', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(255,255,255,0.35), transparent 70%)', filter: 'blur(6px)' }} />

        <AnimatePresence mode="wait">
          <motion.div
            key={question.label}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}
          >
            <p style={{ color: 'rgba(186,230,253,0.8)', fontSize: 11, fontWeight: 600, letterSpacing: 1, marginBottom: 6 }}>{question.label}</p>
            {/* Subtle ring around text */}
            <div style={{ border: '1px solid rgba(147,197,253,0.2)', borderRadius: 40, padding: '8px 16px', marginBottom: 8 }}>
              <p style={{ color: 'white', fontSize: 15, fontWeight: 800, lineHeight: 1.4, margin: 0, whiteSpace: 'pre-line' }}>{question.text}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, opacity: 0.7 }}>
              <span style={{ fontSize: 10, color: 'rgba(186,230,253,0.8)', fontFamily: 'monospace', letterSpacing: 2 }}>00:00:00</span>
            </div>
            <p style={{ color: 'rgba(147,197,253,0.6)', fontSize: 9, marginTop: 3 }}>left to close</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function CircleShowcaseSection() {
  const [qIdx, setQIdx] = useState(0);
  const [commentIdx, setCommentIdx] = useState(null);
  const [activeMember, setActiveMember] = useState(null);

  useEffect(() => {
    const qTimer = setInterval(() => setQIdx(i => (i + 1) % QUESTIONS.length), 4000);
    return () => clearInterval(qTimer);
  }, []);

  useEffect(() => {
    let t1, t2;
    const cycle = () => {
      const ci = Math.floor(Math.random() * FLOAT_COMMENTS.length);
      const mi = ORBIT_MEMBERS.findIndex(m => m.name === FLOAT_COMMENTS[ci].member);
      setCommentIdx(ci);
      setActiveMember(mi);
      t2 = setTimeout(() => { setCommentIdx(null); setActiveMember(null); }, 2400);
      t1 = setTimeout(cycle, 3200);
    };
    t1 = setTimeout(cycle, 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const question = QUESTIONS[qIdx];

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden" style={{ background: '#030712' }}>
      {/* Background glow */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, rgba(37,99,235,0.07), transparent 70%)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-wider mb-6" style={{ borderColor: 'rgba(59,130,246,0.3)', background: 'rgba(59,130,246,0.1)', color: '#93c5fd' }}>
            <Sparkles className="w-3.5 h-3.5" /> Circle Experience
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Your Circle,{' '}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #60a5fa, #22d3ee)' }}>Live & Alive</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Watch your community engage in real-time — questions, responses, and conversations orbiting your branded circle.
          </p>
        </motion.div>

        {/* Main showcase: sphere + sidebar */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Sphere area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex-1 flex justify-center"
          >
            {/* Circle name above */}
            <div className="flex flex-col items-center">
              <motion.h3
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold mb-8"
                style={{ color: '#f59e0b', fontFamily: 'Georgia, serif' }}
              >
                Investrade
              </motion.h3>

              {/* Sphere canvas */}
              <div style={{ position: 'relative', width: 480, height: 480, maxWidth: '100%' }}>
                {/* Orbit ring hint */}
                <div style={{
                  position: 'absolute', left: '50%', top: '50%',
                  width: 430, height: 430,
                  transform: 'translate(-50%,-50%)',
                  borderRadius: '50%',
                  border: '1px dashed rgba(255,255,255,0.06)',
                  pointerEvents: 'none',
                }} />

                {/* Member bubbles */}
                {ORBIT_MEMBERS.map((member, i) => (
                  <MemberBubble
                    key={member.name}
                    member={member}
                    delay={0.1 + i * 0.08}
                    floatingComment={activeMember === i ? FLOAT_COMMENTS[commentIdx] : null}
                  />
                ))}

                {/* Center sphere */}
                <CenterSphere question={question} />
              </div>

              {/* Total responses bar */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-8 flex flex-col items-center gap-3"
              >
                <p className="text-xs font-bold tracking-widest text-gray-500 uppercase">Total Response</p>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={question.count}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      background: 'linear-gradient(135deg, #b45309, #d97706)',
                      borderRadius: 50,
                      padding: '12px 40px',
                      boxShadow: '0 4px 20px rgba(217,119,6,0.4)',
                    }}
                  >
                    <span style={{ color: 'white', fontSize: 24, fontWeight: 900, fontFamily: 'monospace' }}>{question.count}</span>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: feature cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-shrink-0 w-full lg:w-80 flex flex-col gap-4"
          >
            <h3 className="text-xl font-bold text-white mb-2">What makes a Circle special?</h3>

            {[
              { emoji: '🌐', title: 'Live Discussion Sphere', desc: 'Members orbit your circle in real-time, posting answers, reactions and insights as they happen.', color: '#3b82f6' },
              { emoji: '❓', title: 'Question Engine', desc: 'Post timed questions to your community. Watch responses flood in from orbiting members instantly.', color: '#8b5cf6' },
              { emoji: '📊', title: 'Response Analytics', desc: 'Track engagement, upvotes, and response quality with a live counter and leaderboard.', color: '#f59e0b' },
              { emoji: '🔴', title: 'Live Events & Webinars', desc: 'Host discussions, meetings, and webinars directly inside your circle with a single click.', color: '#ec4899' },
              { emoji: '🏆', title: 'Reputation System', desc: 'Members earn badges based on their contributions, building credibility and community trust.', color: '#22d3ee' },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.08 }}
                whileHover={{ x: 4 }}
                className="flex items-start gap-4 rounded-xl p-4 border border-white/5 cursor-default transition-colors hover:border-white/10"
                style={{ background: 'rgba(255,255,255,0.03)' }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0" style={{ background: `${card.color}18`, border: `1px solid ${card.color}33` }}>
                  {card.emoji}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm mb-1">{card.title}</p>
                  <p className="text-gray-500 text-xs leading-relaxed">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
      `}</style>
    </section>
  );
}