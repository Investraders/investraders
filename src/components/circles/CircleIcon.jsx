import React from 'react';
import { Landmark, User } from 'lucide-react';

export const CATEGORY_META = {
  institution: {
    label: 'Institution',
    Icon: Landmark,
    bg: 'linear-gradient(135deg,#1e293b 0%,#1e3a8a 100%)',
    text: '#fcd34d',
  },
  individual: {
    label: 'Individual',
    Icon: User,
    bg: 'linear-gradient(135deg,#1d4ed8,#2563eb)',
    text: '#ffffff',
  },
};

export default function CircleIcon({ category, size = 'md', className = '' }) {
  const meta = CATEGORY_META[category] || CATEGORY_META.individual;
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