import React from 'react';
import {
  BarChart2, Building2, GraduationCap, Landmark, Store, User, MessageCircle
} from 'lucide-react';

export const CATEGORY_META = {
  chamber_of_commerce: { label: 'Chamber of Commerce', Icon: Landmark,      bg: 'linear-gradient(135deg,#1e293b 0%,#1e3a8a 100%)', text: '#fcd34d' },
  stock_market:        { label: 'Stock Market',        Icon: BarChart2,     bg: '#16a34a', text: '#ffffff' },
  university:          { label: 'University',           Icon: GraduationCap, bg: '#7c3aed', text: '#ffffff' },
  institution:         { label: 'Institution',          Icon: Building2,     bg: '#0891b2', text: '#ffffff' },
  small_business:      { label: 'Small Business',       Icon: Store,         bg: '#ea580c', text: '#ffffff' },
  individual:          { label: 'Individual',            Icon: User,          bg: '#2563eb', text: '#ffffff' },
  topics:              { label: 'Topics',               Icon: MessageCircle, bg: '#6b7280', text: '#ffffff' },
};

export default function CircleIcon({ category, size = 'md', className = '' }) {
  const meta = CATEGORY_META[category] || CATEGORY_META.topics;
  const { Icon, bg, text } = meta;

  const sizeMap = { sm: 32, md: 40, lg: 48, xl: 64 };
  const iconMap  = { sm: 16, md: 20, lg: 24, xl: 32 };
  const px = sizeMap[size] || 40;
  const ipx = iconMap[size] || 20;

  return (
    <div
      className={`rounded-full flex items-center justify-center shrink-0 ${className}`}
      style={{
        width: px,
        height: px,
        background: bg,
        minWidth: px,
      }}
    >
      <Icon style={{ width: ipx, height: ipx, color: text }} />
    </div>
  );
}