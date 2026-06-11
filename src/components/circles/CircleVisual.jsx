import React, { useMemo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const AVATAR_COLORS = [
  '#E8A87C', '#7EB5D6', '#6BAF92', '#D4A5C9', '#F0C987',
  '#9BB5CE', '#E8927C', '#8DB8A3', '#C9A5D4', '#B5C99B',
  '#7CC4E8', '#D6A57E',
];

const AVATAR_INITIALS_BG = [
  'bg-orange-300', 'bg-blue-300', 'bg-green-300', 'bg-purple-300',
  'bg-yellow-300', 'bg-cyan-300', 'bg-rose-300', 'bg-teal-300',
  'bg-indigo-300', 'bg-lime-300', 'bg-sky-300', 'bg-amber-300',
];

// Arrow pointer component for the ring indicators
function RingPointer({ angle, size = 8, pointing = 'in' }) {
  const rad = (angle * Math.PI) / 180;
  const arrowAngle = pointing === 'in' ? angle + 180 : angle;
  return (
    <div
      className="absolute w-0 h-0"
      style={{
        left: '50%',
        top: '50%',
        transform: `rotate(${arrowAngle}deg) translateY(-${size / 2}px)`,
        borderLeft: `${size / 2}px solid transparent`,
        borderRight: `${size / 2}px solid transparent`,
        borderBottom: `${size}px solid rgba(100,160,220,0.7)`,
        marginLeft: `-${size / 2}px`,
        marginTop: `-${size / 2}px`,
      }}
    />
  );
}

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
  // Always show 12 slots on the ring
  const RING_SLOTS = 12;

  const positions = useMemo(() => {
    return Array.from({ length: RING_SLOTS }).map((_, i) => {
      const angle = (i / RING_SLOTS) * 360 - 90;
      const rad = (angle * Math.PI) / 180;
      const radius = 148;
      return {
        x: Math.cos(rad) * radius,
        y: Math.sin(rad) * radius,
        angle,
      };
    });
  }, []);

  // Which slots have arrows (pointers) vs avatars – based on the design: ~3-4 pointers
  const POINTER_SLOTS = new Set([2, 5, 9]);

  return (
    <div className="flex flex-col items-center bg-white py-8 px-4">
      {/* Circle Title */}
      <h2 className="text-4xl font-bold mb-8" style={{ color: '#3B9EE8', fontFamily: 'inherit' }}>
        {circleName || `Circle ${questionNumber || ''}`}
      </h2>

      {/* Main Visual Container */}
      <div className="relative" style={{ width: 340, height: 340 }}>

        {/* Outer dashed ring */}
        <div
          className="absolute rounded-full"
          style={{
            inset: 0,
            border: '2px dashed rgba(150,190,230,0.5)',
            borderRadius: '50%',
          }}
        />

        {/* Inner solid dark ring */}
        <div
          className="absolute rounded-full"
          style={{
            inset: 24,
            border: '3px solid rgba(40,100,180,0.85)',
            borderRadius: '50%',
            background: 'transparent',
          }}
        />

        {/* Deep blue layered circle – outer layer */}
        <div
          className="absolute rounded-full"
          style={{
            inset: 44,
            background: 'radial-gradient(circle at 40% 35%, #3A8FD4 0%, #1A5FA8 45%, #0D3F7A 100%)',
            boxShadow: '0 8px 40px rgba(20,80,160,0.45)',
            borderRadius: '50%',
          }}
        />

        {/* Inner slightly lighter circle for depth */}
        <div
          className="absolute rounded-full"
          style={{
            inset: 68,
            background: 'radial-gradient(circle at 38% 32%, #4B9EDD 0%, #1D6BB8 40%, #0E4488 100%)',
            borderRadius: '50%',
            opacity: 0.8,
          }}
        />

        {/* Center content */}
        <div
          className="absolute flex flex-col items-center justify-center text-center px-6"
          style={{ inset: 44 }}
        >
          {selectedResponse ? (
            <>
              {/* Selected response view – show real avatar if available */}
              {(() => {
                const responderProfile = memberProfiles.find((p) => p.id === selectedResponse.created_by_id);
                const avatar = responderProfile?.avatar_url || selectedResponse.author_avatar;
                return avatar ? (
                  <img
                    src={avatar}
                    alt={selectedResponse.author_name}
                    className="w-16 h-16 rounded-full object-cover mb-2 border-2 border-white/60 shadow-lg"
                  />
                ) : (
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg mb-2 border-2 border-white/40 shadow-lg"
                    style={{ background: 'linear-gradient(135deg, #F5A623, #E8821A)' }}
                  >
                    {selectedResponse.author_name?.charAt(0)?.toUpperCase() || '?'}
                  </div>
                );
              })()}
              <p className="text-white/80 text-xs font-medium underline underline-offset-2 mb-2">
                {selectedResponse.author_name} Answer
              </p>
              <p className="text-white text-base font-semibold leading-snug">
                {selectedResponse.response_text}
              </p>
            </>
          ) : (
            <>
              {/* Question view */}
              {questionNumber && (
                <p className="text-blue-200/80 text-sm font-medium mb-2">Q. {questionNumber}</p>
              )}
              <p className="text-white text-lg font-bold leading-snug">
                {question || 'No question yet'}
              </p>
            </>
          )}

          {/* Countdown inside circle at bottom */}
          <div className="absolute bottom-6 text-center">
            <CountdownTimer closesAt={closesAt} />
            <p className="text-blue-200/70 text-[10px] mt-0.5">left to close</p>
          </div>
        </div>

        {/* Member avatars on the ring */}
        {positions.map((pos, i) => {
          const member = members[i];
          const isPointer = POINTER_SLOTS.has(i);
          const bgClass = AVATAR_INITIALS_BG[i % AVATAR_INITIALS_BG.length];

          if (isPointer) {
            // Render a small triangle arrow pointing inward
            return (
              <div
                key={i}
                className="absolute"
                style={{
                  left: `calc(50% + ${pos.x}px - 7px)`,
                  top: `calc(50% + ${pos.y}px - 7px)`,
                  width: 14,
                  height: 14,
                }}
              >
                <svg viewBox="0 0 14 14" className="w-full h-full">
                  <polygon
                    points="7,0 14,14 0,14"
                    fill="rgba(90,150,210,0.75)"
                    transform={`rotate(${pos.angle + 90}, 7, 7)`}
                  />
                </svg>
              </div>
            );
          }

          const isActive = member?.isActive;
          return (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.04, type: 'spring', stiffness: 250, damping: 18 }}
              className="absolute"
              style={{
                left: `calc(50% + ${pos.x}px - 20px)`,
                top: `calc(50% + ${pos.y}px - 20px)`,
                width: 40,
                height: 40,
              }}
            >
              {/* Green glow ring for active/interacting members */}
              {isActive && (
                <div
                  className="absolute inset-0 rounded-full animate-pulse"
                  style={{
                    boxShadow: '0 0 0 3px #22c55e, 0 0 10px 4px rgba(34,197,94,0.55)',
                    borderRadius: '50%',
                    zIndex: 1,
                  }}
                />
              )}
              {member?.avatar_url ? (
                <img
                  src={member.avatar_url}
                  alt={member.name}
                  className="w-10 h-10 rounded-full object-cover shadow-md relative"
                  style={{
                    border: isActive ? '3px solid #22c55e' : '2px solid white',
                    boxShadow: isActive ? '0 0 0 2px #22c55e, 0 0 8px 2px rgba(34,197,94,0.5)' : undefined,
                    zIndex: 2,
                  }}
                />
              ) : (
                <div
                  className={`w-10 h-10 rounded-full ${bgClass} flex items-center justify-center text-white text-xs font-bold shadow-md relative`}
                  style={{
                    border: isActive ? '3px solid #22c55e' : '2px solid white',
                    boxShadow: isActive ? '0 0 0 2px #22c55e, 0 0 8px 2px rgba(34,197,94,0.5)' : undefined,
                    zIndex: 2,
                  }}
                >
                  {member?.name?.charAt(0)?.toUpperCase() || (
                    <div className="w-6 h-6 rounded-full bg-white/20" />
                  )}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Total Response pill */}
      <div className="mt-8 flex flex-col items-center gap-1.5">
        <p className="text-sm font-medium" style={{ color: '#3B9EE8' }}>Total Response</p>
        <div
          className="px-10 py-2.5 rounded-full text-white font-bold text-2xl shadow-lg"
          style={{
            background: 'linear-gradient(90deg, #1A4E8A 0%, #2E7EC8 60%, #3B9EE8 100%)',
            minWidth: 160,
            textAlign: 'center',
          }}
        >
          {totalResponses} / {totalMembers}
        </div>
      </div>
    </div>
  );
}