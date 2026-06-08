import React from 'react';
import { Flame, Zap } from 'lucide-react';

/**
 * Social Buzz Indicator
 * Shows engagement intensity based on member count + activity
 */
export function getBuzzLevel(memberCount = 0, responseCount = 0) {
  const score = memberCount * 3 + responseCount * 2;
  if (score >= 60) return { level: 'hot', label: 'Hot', color: 'text-red-500', bg: 'bg-red-50 border-red-200', bars: 3 };
  if (score >= 20) return { level: 'active', label: 'Active', color: 'text-orange-500', bg: 'bg-orange-50 border-orange-200', bars: 2 };
  if (score >= 6)  return { level: 'growing', label: 'Growing', color: 'text-yellow-500', bg: 'bg-yellow-50 border-yellow-200', bars: 1 };
  return { level: 'new', label: 'New', color: 'text-slate-400', bg: 'bg-slate-50 border-slate-200', bars: 0 };
}

export default function CircleBuzz({ memberCount = 0, responseCount = 0, compact = false }) {
  const buzz = getBuzzLevel(memberCount, responseCount);

  if (compact) {
    return (
      <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${buzz.bg} ${buzz.color}`}>
        <Flame className="w-2.5 h-2.5" />
        {buzz.label}
      </span>
    );
  }

  return (
    <div className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border ${buzz.bg} ${buzz.color}`}>
      <Flame className="w-3.5 h-3.5" />
      <span>{buzz.label}</span>
      <div className="flex gap-0.5 ml-0.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`w-1 h-3 rounded-sm transition-all ${
              i < buzz.bars ? buzz.color.replace('text-', 'bg-') : 'bg-current opacity-20'
            }`}
          />
        ))}
      </div>
    </div>
  );
}