import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const QUESTIONS = [
  { label: 'Q. 1', text: 'How do market cycles\naffect your strategy?', count: '14 / 8' },
  { label: 'Q. 2', text: 'What sector is your\ntop pick for 2026?',    count: '22 / 15' },
  { label: 'Q. 3', text: 'How do you manage\nportfolio risk daily?',   count: '18 / 11' },
];

// Real diverse faces from randomuser.me (stable seed-based URLs)
const ORBIT_MEMBERS = [
  { name: 'Sarah',   photo: 'https://randomuser.me/api/portraits/women/44.jpg',  comment: 'Diversify into bonds 📈',    color: '#8b5cf6', size: 52 },
  { name: 'Omar',    photo: 'https://randomuser.me/api/portraits/men/32.jpg',    comment: 'Tech is my top pick! 🚀',    color: '#f59e0b', size: 50 },
  { name: 'Lina',    photo: 'https://randomuser.me/api/portraits/women/68.jpg',  comment: 'Hedge with gold & BTC 💰',   color: '#10b981', size: 48 },
  { name: 'Ahmed',   photo: 'https://randomuser.me/api/portraits/men/75.jpg',    comment: 'Risk = Opportunity 🎯',      color: '#3b82f6', size: 52 },
  { name: 'Nour',    photo: 'https://randomuser.me/api/portraits/women/90.jpg',  comment: 'Long-term wins always ⭐',   color: '#ec4899', size: 48 },
  { name: 'Karim',   photo: 'https://randomuser.me/api/portraits/men/11.jpg',    comment: 'ETFs are the way 🌍',        color: '#22d3ee', size: 50 },
  { name: 'Aisha',   photo: 'https://randomuser.me/api/portraits/women/26.jpg',  comment: 'Data never lies 📊',         color: '#a78bfa', size: 46 },
  { name: 'Carlos',  photo: 'https://randomuser.me/api/portraits/men/53.jpg',    comment: 'Patience is profit 🧘',      color: '#fb923c', size: 48 },
];

const ORBIT_RADIUS = 185;
const ORBIT_PERIOD = 22; // seconds for one full orbit
// Stagger starting angles so members are evenly distributed
const TOTAL = ORBIT_MEMBERS.length;

function deg2rad(d) { return (d * Math.PI) / 180; }

// Returns opacity based on y-position: top of orbit (y<0) = visible, bottom (y>0) = faded
function orbitOpacity(angleDeg) {
  // angleDeg: 0=right, 90=bottom, 180=left, 270=top
  // sinAngle: -1 at top (270), +1 at bottom (90)
  const sinA = Math.sin(deg2rad(angleDeg));
  // map -1..+1 → 1..0.15
  return 1 - (sinA + 1) / 2 * 0.85;
}

// Scale: slightly larger when at top (front), smaller at bottom (behind)
function orbitScale(angleDeg) {
  const sinA = Math.sin(deg2rad(angleDeg));
  return 1 - (sinA + 1) / 2 * 0.28;
}

// zIndex: higher when at top
function orbitZ(angleDeg) {
  const sinA = Math.sin(deg2rad(angleDeg));
  return Math.round(10 - sinA * 8);
}

function OrbitingMember({ member, index }) {
  const [angleDeg, setAngleDeg] = useState((360 / TOTAL) * index);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(null);
  const angleRef = useRef((360 / TOTAL) * index);

  useEffect(() => {
    const tick = (ts) => {
      if (lastTimeRef.current !== null) {
        const dt = ts - lastTimeRef.current;
        angleRef.current = (angleRef.current + (360 / (ORBIT_PERIOD * 1000)) * dt) % 360;
        setAngleDeg(angleRef.current);
      }
      lastTimeRef.current = ts;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const rad = deg2rad(angleDeg);
  const x = Math.cos(rad) * ORBIT_RADIUS;
  const y = Math.sin(rad) * ORBIT_RADIUS;
  const opacity = orbitOpacity(angleDeg);
  const scale = orbitScale(angleDeg);
  const z = orbitZ(angleDeg);

  // Show comment when near the top arc (270 ± 50 degrees = 220–320)
  const normalized = ((angleDeg % 360) + 360) % 360;
  const isTop = normalized > 220 && normalized < 320;
  const commentOpacity = isTop ? Math.min(1, (1 - Math.abs(normalized - 270) / 50)) : 0;

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: `translate(${x - member.size / 2}px, ${y - member.size / 2}px)`,
        zIndex: z,
        opacity,
        transition: 'opacity 0.1s linear',
      }}
    >
      {/* Comment bubble — visible only near top */}
      <div
        style={{
          position: 'absolute',
          bottom: member.size + 8,
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(10,15,30,0.95)',
          border: `1px solid ${member.color}66`,
          borderRadius: 12,
          padding: '5px 11px',
          whiteSpace: 'nowrap',
          opacity: commentOpacity,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
          boxShadow: `0 4px 20px ${member.color}44`,
          zIndex: 2,
        }}
      >
        <span style={{ color: 'white', fontSize: 10, fontWeight: 600 }}>{member.comment}</span>
        {/* Arrow */}
        <div style={{
          position: 'absolute', bottom: -5, left: '50%',
          transform: 'translateX(-50%) rotate(45deg)',
          width: 8, height: 8,
          background: 'rgba(10,15,30,0.95)',
          border: `1px solid ${member.color}66`,
          borderTop: 'none', borderLeft: 'none',
        }} />
      </div>

      {/* Avatar circle */}
      <div
        style={{
          width: member.size,
          height: member.size,
          borderRadius: '50%',
          border: `2.5px solid ${member.color}`,
          overflow: 'hidden',
          boxShadow: `0 0 ${isTop ? 20 : 8}px ${member.color}${isTop ? '99' : '33'}`,
          transform: `scale(${scale})`,
          transition: 'transform 0.1s linear, box-shadow 0.3s ease',
          background: '#1e293b',
        }}
      >
        <img
          src={member.photo}
          alt={member.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </div>

      {/* Name label — only near top */}
      <div style={{
        position: 'absolute',
        top: member.size + 4,
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(0,0,0,0.75)',
        borderRadius: 6,
        padding: '1px 7px',
        whiteSpace: 'nowrap',
        opacity: commentOpacity > 0.3 ? 1 : 0.5,
        transition: 'opacity 0.3s ease',
      }}>
        <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 9, fontWeight: 600 }}>{member.name}</span>
      </div>
    </div>
  );
}

function CenterSphere({ question }) {
  return (
    <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 230, height: 230, zIndex: 5 }}>
      <div style={{ position: 'absolute', inset: -32, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(59,130,246,0.18), transparent 70%)', animation: 'orbitPulse 3s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', inset: -16, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(59,130,246,0.1), transparent 70%)', animation: 'orbitPulse 3s ease-in-out infinite 1.5s' }} />
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        background: 'radial-gradient(circle at 38% 30%, #7ec0f0, #2563eb 42%, #1e40af 72%, #1e3a8a)',
        boxShadow: '0 0 70px rgba(59,130,246,0.55), 0 0 130px rgba(59,130,246,0.2), inset 0 -20px 40px rgba(0,0,0,0.3)',
        border: '1px solid rgba(147,197,253,0.25)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: 22,
      }}>
        {/* Glass highlight */}
        <div style={{ position: 'absolute', top: '12%', left: '20%', width: '38%', height: '28%', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(255,255,255,0.38), transparent 70%)', filter: 'blur(5px)' }} />
        <AnimatePresence mode="wait">
          <motion.div
            key={question.label}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}
          >
            <p style={{ color: 'rgba(186,230,253,0.85)', fontSize: 11, fontWeight: 600, letterSpacing: 1, marginBottom: 5 }}>{question.label}</p>
            <div style={{ border: '1px solid rgba(147,197,253,0.25)', borderRadius: 40, padding: '7px 14px', marginBottom: 8 }}>
              <p style={{ color: 'white', fontSize: 14, fontWeight: 800, lineHeight: 1.4, margin: 0, whiteSpace: 'pre-line' }}>{question.text}</p>
            </div>
            <span style={{ fontSize: 10, color: 'rgba(186,230,253,0.75)', fontFamily: 'monospace', letterSpacing: 2 }}>00:00:00</span>
            <p style={{ color: 'rgba(147,197,253,0.55)', fontSize: 9, marginTop: 2 }}>left to close</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function CircleShowcaseSection() {
  const [qIdx, setQIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setQIdx(i => (i + 1) % QUESTIONS.length), 4500);
    return () => clearInterval(t);
  }, []);

  const question = QUESTIONS[qIdx];

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden" style={{ background: '#030712' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, rgba(37,99,235,0.08), transparent 70%)' }} />

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

        {/* Main layout */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Sphere + orbit */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="flex-1 flex justify-center">
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

              {/* Canvas */}
              <div style={{ position: 'relative', width: 480, height: 480, maxWidth: '100%' }}>
                {/* Orbit ring */}
                <div style={{
                  position: 'absolute', left: '50%', top: '50%',
                  width: ORBIT_RADIUS * 2, height: ORBIT_RADIUS * 2,
                  transform: 'translate(-50%,-50%)',
                  borderRadius: '50%',
                  border: '1px dashed rgba(255,255,255,0.07)',
                  pointerEvents: 'none',
                }} />

                {/* Orbiting members */}
                {ORBIT_MEMBERS.map((member, i) => (
                  <OrbitingMember key={member.name} member={member} index={i} />
                ))}

                {/* Center sphere */}
                <CenterSphere question={question} />
              </div>

              {/* Response counter */}
              <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="mt-8 flex flex-col items-center gap-3">
                <p className="text-xs font-bold tracking-widest text-gray-500 uppercase">Total Response</p>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={question.count}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    style={{ background: 'linear-gradient(135deg, #b45309, #d97706)', borderRadius: 50, padding: '12px 40px', boxShadow: '0 4px 20px rgba(217,119,6,0.4)' }}
                  >
                    <span style={{ color: 'white', fontSize: 24, fontWeight: 900, fontFamily: 'monospace' }}>{question.count}</span>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>

          {/* Feature cards */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="flex-shrink-0 w-full lg:w-80 flex flex-col gap-4">
            <h3 className="text-xl font-bold text-white mb-2">What makes a Circle special?</h3>
            {[
              { emoji: '🌐', title: 'Live Discussion Sphere',  desc: 'Members orbit your circle in real-time, posting answers, reactions and insights as they happen.',     color: '#3b82f6' },
              { emoji: '❓', title: 'Question Engine',         desc: 'Post timed questions to your community. Watch responses flood in from orbiting members instantly.',    color: '#8b5cf6' },
              { emoji: '📊', title: 'Response Analytics',      desc: 'Track engagement, upvotes, and response quality with a live counter and leaderboard.',                 color: '#f59e0b' },
              { emoji: '🔴', title: 'Live Events & Webinars',  desc: 'Host discussions, meetings, and webinars directly inside your circle with a single click.',            color: '#ec4899' },
              { emoji: '🏆', title: 'Reputation System',       desc: 'Members earn badges based on their contributions, building credibility and community trust.',          color: '#22d3ee' },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.08 }}
                whileHover={{ x: 4 }}
                className="flex items-start gap-4 rounded-xl p-4 border border-white/5 cursor-default hover:border-white/10 transition-colors"
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
        @keyframes orbitPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.06); }
        }
      `}</style>
    </section>
  );
}