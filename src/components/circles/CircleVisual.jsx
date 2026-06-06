import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const MEMBER_COLORS = [
  'from-blue-400 to-cyan-300',
  'from-orange-400 to-pink-400',
  'from-green-400 to-teal-400',
  'from-purple-400 to-indigo-400',
  'from-yellow-400 to-orange-400',
  'from-pink-400 to-rose-400',
  'from-cyan-400 to-blue-400',
  'from-red-400 to-pink-400',
  'from-teal-400 to-green-400',
  'from-indigo-400 to-purple-400',
  'from-amber-400 to-yellow-400',
  'from-emerald-400 to-teal-400',
];

export default function CircleVisual({ members = [], question, selectedResponse, questionNumber, timeLeft, totalResponses, totalMembers }) {
  const memberCount = Math.max(members.length, 8);

  const positions = useMemo(() => {
    const radius = 130;
    return Array.from({ length: memberCount }).map((_, i) => {
      const angle = (i / memberCount) * Math.PI * 2 - Math.PI / 2;
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
      };
    });
  }, [memberCount]);

  return (
    <div className="flex flex-col items-center py-8">
      {/* Circle Title */}
      <h2 className="text-3xl font-bold text-foreground mb-8 font-display">
        Circle {questionNumber || ''}
      </h2>

      {/* Visual Ring */}
      <div className="relative w-[320px] h-[320px] md:w-[380px] md:h-[380px]">
        {/* Outer ring path */}
        <div className="absolute inset-0 rounded-full border-[3px] border-dashed border-muted-foreground/20" />

        {/* Blue gradient circle */}
        <div className="absolute inset-[30px] rounded-full bg-gradient-to-b from-blue-500 to-blue-800 shadow-2xl flex items-center justify-center overflow-hidden">
          {/* Inner content */}
          <div className="text-center px-6 relative z-10">
            {selectedResponse ? (
              <>
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center text-white text-xl font-bold border-3 border-white/50">
                  {selectedResponse.author_name?.charAt(0) || '?'}
                </div>
                <p className="text-white/80 text-xs font-medium underline mb-1">
                  {selectedResponse.author_name}'s Answer
                </p>
                <p className="text-white text-lg font-semibold leading-snug">
                  {selectedResponse.response_text}
                </p>
              </>
            ) : (
              <>
                {questionNumber && (
                  <span className="inline-block bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full mb-3">
                    Q. {questionNumber}
                  </span>
                )}
                <p className="text-white text-xl md:text-2xl font-bold leading-snug">
                  {question || 'No question yet'}
                </p>
              </>
            )}
          </div>

          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent" />
        </div>

        {/* Member avatars around the ring */}
        {positions.map((pos, i) => {
          const member = members[i];
          const color = MEMBER_COLORS[i % MEMBER_COLORS.length];
          return (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.05, type: 'spring', stiffness: 200 }}
              className="absolute"
              style={{
                left: `calc(50% + ${pos.x}px - 20px)`,
                top: `calc(50% + ${pos.y}px - 20px)`,
              }}
            >
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow-md cursor-pointer hover:scale-110 transition-transform`}>
                {member?.name?.charAt(0) || member?.full_name?.charAt(0) || '?'}
              </div>
            </motion.div>
          );
        })}

        {/* Time left */}
        {timeLeft && (
          <div className="absolute bottom-[40px] left-1/2 -translate-x-1/2">
            <p className="text-blue-200 text-xs text-center">
              <span className="text-white font-mono font-bold text-sm">{timeLeft}</span>
              <br />left to close
            </p>
          </div>
        )}
      </div>

      {/* Total Responses */}
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground mb-2">Total Response</p>
        <div className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-bold text-xl px-8 py-2.5 rounded-full shadow-lg">
          {totalResponses || 0} / {totalMembers || 0}
        </div>
      </div>
    </div>
  );
}