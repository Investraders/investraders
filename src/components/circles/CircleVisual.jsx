import React, { useMemo, useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AVATAR_INITIALS_BG = [
  'bg-orange-400', 'bg-blue-400', 'bg-green-400', 'bg-purple-400',
  'bg-yellow-400', 'bg-cyan-400', 'bg-rose-400', 'bg-teal-400',
  'bg-indigo-400', 'bg-lime-500', 'bg-sky-400', 'bg-amber-400',
];

const RING_SLOTS = 12;
const RADIUS = 155;

// Simulated live comments that cycle through active members
const SAMPLE_COMMENTS = [
  "📈 This is pumping hard!",
  "💎 Hold strong everyone",
  "🔥 Great analysis!",
  "🚀 To the moon!",
  "📊 Watching RSI closely",
  "💰 Bought the dip",
  "🎯 Target hit!",
  "⚡ Huge volume spike",
  "🌙 Bullish setup forming",
  "📉 Careful of resistance",
  "✅ Confirmed breakout",
  "💡 Entry looks perfect",
];

function CountdownTimer({ closesAt }) {
  const [timeLeft, setTimeLeft] = useState('');
  useEffect(() => {
    const calc = () => {
      if (!closesAt) { setTimeLeft('00:00:00'); return; }
      const diff = new Date(closesAt) - new Date();
      if (diff <= 0) { setTimeLeft('00:00:00'); return; }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`);
    };
    calc();
    const t = setInterval(calc, 1000);
    return () => clearInterval(t);
  }, [closesAt]);
  return <span className="font-mono font-bold text-white text-sm tracking-wide">{timeLeft}</span>;
}

// Floating comment bubble that rises and fades out
function FloatingComment({ comment, x, y, id, onDone }) {
  return (
    <motion.div
      key={id}
      initial={{ opacity: 0, y: 0, scale: 0.8 }}
      animate={{ opacity: [0, 1, 1, 0], y: -90, scale: [0.8, 1, 1, 0.9] }}
      transition={{ duration: 3.2, times: [0, 0.15, 0.7, 1], ease: 'easeOut' }}
      onAnimationComplete={onDone}
      className="absolute pointer-events-none z-30"
      style={{ left: x, top: y, transform: 'translateX(-50%)' }}
    >
      <div
        className="rounded-2xl px-3 py-1.5 text-xs font-semibold text-white shadow-xl whitespace-nowrap"
        style={{
          background: 'linear-gradient(135deg, rgba(30,80,180,0.92) 0%, rgba(14,100,220,0.88) 100%)',
          border: '1px solid rgba(100,180,255,0.4)',
          backdropFilter: 'blur(8px)',
          maxWidth: 160,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {comment}
      </div>
      {/* Tail */}
      <div
        className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-0 h-0"
        style={{
          borderLeft: '5px solid transparent',
          borderRight: '5px solid transparent',
          borderTop: '6px solid rgba(14,100,220,0.88)',
        }}
      />
    </motion.div>
  );
}

export default function CircleVisual({
  members = [],
  question,
  selectedResponse,
  questionNumber,
  closesAt,
  totalResponses = 0,
  totalMembers = 0,
  circleName,
  memberProfiles = [],
}) {
  const [rotation, setRotation] = useState(0);
  const [floatingComments, setFloatingComments] = useState([]);
  const commentCounterRef = useRef(0);
  const animFrameRef = useRef(null);
  const lastTimeRef = useRef(null);

  // Smooth clockwise rotation via requestAnimationFrame
  useEffect(() => {
    const animate = (timestamp) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;
      setRotation((r) => (r + delta * 0.018) % 360); // ~6.5 rpm slow spin
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  // Spawn floating comments from active members
  useEffect(() => {
    const activeMemberCount = Math.max(1, members.filter((m) => m?.isActive).length || Math.min(4, members.length));
    const interval = setInterval(() => {
      // Pick a random active slot position
      const activeSlots = members
        .map((m, i) => (m ? i : -1))
        .filter((i) => i >= 0)
        .slice(0, Math.min(8, members.length));

      if (activeSlots.length === 0) return;

      const slotIdx = activeSlots[Math.floor(Math.random() * activeSlots.length)];
      const angleRad = ((slotIdx / RING_SLOTS) * 360 - 90 + rotation) * (Math.PI / 180);
      const px = 185 + Math.cos(angleRad) * RADIUS;
      const py = 185 + Math.sin(angleRad) * RADIUS;

      const comment = SAMPLE_COMMENTS[commentCounterRef.current % SAMPLE_COMMENTS.length];
      commentCounterRef.current++;

      setFloatingComments((prev) => [
        ...prev.slice(-8), // keep max 8 at once
        { id: Date.now() + Math.random(), text: comment, x: px, y: py },
      ]);
    }, 1800);

    return () => clearInterval(interval);
  }, [members, rotation]);

  // Compute avatar positions accounting for current rotation angle
  const positions = useMemo(() => {
    return Array.from({ length: RING_SLOTS }).map((_, i) => {
      const baseDeg = (i / RING_SLOTS) * 360 - 90;
      return { baseDeg };
    });
  }, []);

  const SIZE = 370;
  const CENTER = SIZE / 2;

  return (
    <div className="flex flex-col items-center py-6 px-4 select-none" style={{ userSelect: 'none' }}>
      {/* Circle Title */}
      <h2
        className="text-3xl font-bold mb-6 text-center"
        style={{
          background: 'linear-gradient(135deg, #2563EB 0%, #38BDF8 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {circleName || `Circle ${questionNumber || ''}`}
      </h2>

      {/* Main Visual */}
      <div className="relative" style={{ width: SIZE, height: SIZE }}>

        {/* ─── 3D Ring track (CSS perspective trick) ─── */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            border: '3px solid rgba(59,130,246,0.15)',
            boxShadow: '0 0 0 10px rgba(59,130,246,0.04), 0 0 60px 10px rgba(37,99,235,0.12)',
          }}
        />

        {/* Outer glowing orbit track */}
        <div
          className="absolute pointer-events-none"
          style={{
            inset: 16,
            borderRadius: '50%',
            border: '2px solid rgba(96,165,250,0.25)',
            boxShadow: 'inset 0 2px 12px rgba(59,130,246,0.18), 0 0 24px rgba(59,130,246,0.1)',
          }}
        />

        {/* 3D sphere – main blue ball */}
        <div
          className="absolute"
          style={{
            inset: 52,
            borderRadius: '50%',
            background: `
              radial-gradient(circle at 36% 32%,
                #7EC8FF 0%,
                #3A8FD4 18%,
                #1A5FA8 42%,
                #0C3570 70%,
                #061D45 100%
              )
            `,
            boxShadow: `
              0 16px 60px rgba(10,50,140,0.7),
              0 0 0 3px rgba(96,165,250,0.3),
              inset 0 -8px 30px rgba(0,0,0,0.5),
              inset 4px 4px 20px rgba(200,230,255,0.15)
            `,
          }}
        />

        {/* Specular highlight (top-left gloss) */}
        <div
          className="absolute pointer-events-none"
          style={{
            inset: 52,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at 30% 28%, rgba(255,255,255,0.28) 0%, transparent 55%)',
          }}
        />

        {/* Bottom shadow arc for 3D depth */}
        <div
          className="absolute pointer-events-none"
          style={{
            inset: 52,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at 65% 75%, rgba(0,10,40,0.4) 0%, transparent 55%)',
          }}
        />

        {/* Equator band for 3D illusion */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: 52,
            right: 52,
            top: '50%',
            height: 2,
            background: 'linear-gradient(90deg, transparent 0%, rgba(96,165,250,0.18) 30%, rgba(96,165,250,0.35) 50%, rgba(96,165,250,0.18) 70%, transparent 100%)',
            transform: 'translateY(-50%)',
          }}
        />

        {/* ─── Center content ─── */}
        <div
          className="absolute flex flex-col items-center justify-center text-center"
          style={{ inset: 52, padding: '0 24px' }}
        >
          {selectedResponse ? (
            <>
              {(() => {
                const profile = memberProfiles.find((p) => p.id === selectedResponse.created_by_id);
                const avatar = profile?.avatar_url || selectedResponse.author_avatar;
                return avatar ? (
                  <img src={avatar} alt={selectedResponse.author_name}
                    className="w-14 h-14 rounded-full object-cover mb-2 border-2 border-white/60 shadow-lg" />
                ) : (
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mb-2 shadow-lg"
                    style={{ background: 'linear-gradient(135deg,#F5A623,#E8821A)' }}>
                    {selectedResponse.author_name?.charAt(0)?.toUpperCase() || '?'}
                  </div>
                );
              })()}
              <p className="text-white/70 text-[10px] font-medium mb-1 underline underline-offset-2">
                {selectedResponse.author_name}
              </p>
              <p className="text-white text-sm font-semibold leading-snug line-clamp-4">
                {selectedResponse.response_text}
              </p>
            </>
          ) : (
            <>
              {questionNumber && (
                <p className="text-blue-200/80 text-xs font-medium mb-1">Q. {questionNumber}</p>
              )}
              {/* Big member count */}
              <p
                className="font-black leading-none mb-2"
                style={{
                  fontSize: 52,
                  background: 'linear-gradient(180deg, #FFFFFF 0%, #93C5FD 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: 'none',
                  filter: 'drop-shadow(0 2px 8px rgba(59,130,246,0.6))',
                }}
              >
                {totalMembers}
              </p>
              <p className="text-blue-200/80 text-[11px] font-medium -mt-1 mb-2">members</p>
              <p className="text-white text-sm font-semibold leading-snug line-clamp-3">
                {question || 'No question yet'}
              </p>
            </>
          )}

          {/* Countdown */}
          <div className="absolute bottom-5 text-center">
            <CountdownTimer closesAt={closesAt} />
            <p className="text-blue-200/60 text-[9px] mt-0.5">left to close</p>
          </div>
        </div>

        {/* ─── Orbiting member avatars ─── */}
        {positions.map((pos, i) => {
          const member = members[i];
          const bgClass = AVATAR_INITIALS_BG[i % AVATAR_INITIALS_BG.length];
          const isActive = member?.isActive;

          // Compute live angle including rotation
          const liveDeg = pos.baseDeg + rotation;
          const liveRad = (liveDeg * Math.PI) / 180;
          const x = CENTER + Math.cos(liveRad) * RADIUS;
          const y = CENTER + Math.sin(liveRad) * RADIUS;

          // 3D depth scaling: avatars at "back" (top) are slightly smaller
          const depthScale = 0.72 + 0.28 * ((Math.sin(liveRad) + 1) / 2);
          const opacity = 0.6 + 0.4 * ((Math.sin(liveRad) + 1) / 2);
          const zIndex = Math.round(depthScale * 20);
          const avatarSize = Math.round(36 * depthScale);

          if (!member && !isActive) {
            // Empty slot – small dot
            return (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: 8,
                  height: 8,
                  left: x - 4,
                  top: y - 4,
                  background: 'rgba(96,165,250,0.25)',
                  zIndex,
                  opacity,
                }}
              />
            );
          }

          return (
            <div
              key={i}
              className="absolute"
              style={{
                left: x - avatarSize / 2,
                top: y - avatarSize / 2,
                width: avatarSize,
                height: avatarSize,
                zIndex,
                opacity,
                transition: 'none',
              }}
            >
              {/* Active glow ring */}
              {isActive && (
                <div
                  className="absolute inset-0 rounded-full animate-pulse"
                  style={{
                    boxShadow: '0 0 0 3px #22c55e, 0 0 12px 5px rgba(34,197,94,0.5)',
                  }}
                />
              )}
              {member?.avatar_url ? (
                <img
                  src={member.avatar_url}
                  alt={member.name}
                  className="w-full h-full rounded-full object-cover shadow-lg"
                  style={{ border: isActive ? '2px solid #22c55e' : '2px solid rgba(255,255,255,0.8)' }}
                />
              ) : (
                <div
                  className={`w-full h-full rounded-full ${bgClass} flex items-center justify-center text-white font-bold shadow-lg`}
                  style={{
                    fontSize: Math.round(avatarSize * 0.38),
                    border: isActive ? '2px solid #22c55e' : '2px solid rgba(255,255,255,0.6)',
                  }}
                >
                  {member?.name?.charAt(0)?.toUpperCase() || '·'}
                </div>
              )}
            </div>
          );
        })}

        {/* ─── Floating comment bubbles ─── */}
        <AnimatePresence>
          {floatingComments.map((fc) => (
            <FloatingComment
              key={fc.id}
              id={fc.id}
              comment={fc.text}
              x={fc.x}
              y={fc.y}
              onDone={() =>
                setFloatingComments((prev) => prev.filter((c) => c.id !== fc.id))
              }
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Response pill */}
      <div className="mt-6 flex flex-col items-center gap-1.5">
        <p className="text-sm font-semibold text-blue-500">Total Responses</p>
        <div
          className="px-10 py-2.5 rounded-full text-white font-black text-2xl shadow-xl"
          style={{
            background: 'linear-gradient(90deg, #1E3A8A 0%, #2563EB 60%, #38BDF8 100%)',
            minWidth: 160,
            textAlign: 'center',
            boxShadow: '0 4px 24px rgba(37,99,235,0.4)',
          }}
        >
          {totalResponses} / {totalMembers}
        </div>
      </div>
    </div>
  );
}