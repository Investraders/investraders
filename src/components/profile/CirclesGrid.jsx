import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

const GRADIENT_COLORS = [
  'from-blue-500 to-cyan-400',
  'from-purple-500 to-pink-400',
  'from-emerald-500 to-teal-400',
  'from-orange-400 to-red-400',
  'from-violet-500 to-indigo-400',
  'from-yellow-400 to-orange-400',
];

export default function CirclesGrid({ userId }) {
  const { data: circles = [] } = useQuery({
    queryKey: ['user-circles-grid', userId],
    queryFn: () => base44.entities.Circle.list('-created_date', 100),
    enabled: !!userId,
    select: (data) => data.filter(
      (c) => c.created_by_id === userId || (c.member_ids || []).includes(userId)
    ),
  });

  if (circles.length === 0) {
    return <p className="text-sm text-muted-foreground">Not a member of any circles yet.</p>;
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {circles.map((circle, i) => (
          <Link
            key={circle.id}
            to={`/circle/${circle.id}`}
            className="flex flex-col items-center gap-1.5 group"
          >
            <div
              className={`w-12 h-12 rounded-full bg-gradient-to-br ${GRADIENT_COLORS[i % GRADIENT_COLORS.length]} flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:scale-105 transition-transform`}
            >
              {circle.name?.charAt(0)?.toUpperCase() || '?'}
            </div>
            <span className="text-xs text-muted-foreground max-w-[48px] truncate text-center">
              {circle.name}
            </span>
          </Link>
        ))}
      </div>
      <div className="flex justify-end mt-3">
        <Link to="/my-circles" className="text-sm font-medium text-primary hover:underline">
          See all
        </Link>
      </div>
    </div>
  );
}