import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

const TOTAL_SHOWN = 18; // circles 1-18 shown, then ...421-425

export default function CirclesGrid({ userId }) {
  const { data: circles = [] } = useQuery({
    queryKey: ['all-circles-profile'],
    queryFn: () => base44.entities.Circle.list('-created_date', 50),
  });

  // Build numbered display: first fill with real circles, pad with numbered slots
  const numbered = Array.from({ length: TOTAL_SHOWN }, (_, i) => ({
    num: i + 1,
    circle: circles[i] || null,
  }));

  const lastFive = Array.from({ length: 5 }, (_, i) => ({
    num: 421 + i,
    circle: circles[TOTAL_SHOWN + i] || null,
  }));

  const DotButton = ({ num, circle, highlight }) => (
    <Link
      to={circle ? `/circle/${circle.id}` : '#'}
      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold transition-transform hover:scale-110"
      style={{
        background: highlight || num === 1
          ? 'linear-gradient(135deg, #3B9EE8, #1A5FA8)'
          : 'linear-gradient(135deg, #1E4E8C, #0D3060)',
        boxShadow: '0 2px 8px rgba(20,80,160,0.3)',
      }}
    >
      {num}
    </Link>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-foreground">Circles 425</h2>
        <div className="flex gap-2">
          <button className="px-5 py-1.5 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors">Accept</button>
          <button className="px-5 py-1.5 rounded-full border-2 border-primary text-primary text-sm font-medium hover:bg-primary/10 transition-colors">Reject</button>
        </div>
      </div>

      {/* Grid 6 columns */}
      <div className="grid gap-2.5" style={{ gridTemplateColumns: 'repeat(6, 2.5rem)' }}>
        {numbered.map(({ num, circle }) => (
          <DotButton key={num} num={num} circle={circle} />
        ))}
      </div>

      {/* Last row: ellipsis + 421-425 + See all */}
      <div className="flex items-center gap-2.5 mt-2.5">
        <span className="text-muted-foreground text-lg font-bold tracking-widest">···</span>
        {lastFive.map(({ num, circle }) => (
          <DotButton key={num} num={num} circle={circle} highlight />
        ))}
      </div>

      <div className="flex justify-end mt-2">
        <Link to="/my-circles" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
          See all
        </Link>
      </div>
    </div>
  );
}