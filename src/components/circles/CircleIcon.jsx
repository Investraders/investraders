import React from 'react';
import {
  TrendingUp, Bitcoin, BarChart2, Building2, Briefcase, Wallet, Globe, Landmark
} from 'lucide-react';

export const CATEGORY_META = {
  investing:        { label: 'Investing',       Icon: TrendingUp,  bg: '#2563eb', text: '#ffffff' },
  crypto:           { label: 'Crypto',           Icon: Bitcoin,     bg: '#f97316', text: '#ffffff' },
  stocks:           { label: 'Stocks',           Icon: BarChart2,   bg: '#16a34a', text: '#ffffff' },
  real_estate:      { label: 'Real Estate',      Icon: Building2,   bg: '#9333ea', text: '#ffffff' },
  business:         { label: 'Business',         Icon: Briefcase,   bg: '#0891b2', text: '#ffffff' },
  personal_finance: { label: 'Personal Finance', Icon: Wallet,      bg: '#e11d48', text: '#ffffff' },
  institutional:    { label: 'Institutional',    Icon: Landmark,    bg: 'linear-gradient(135deg,#1e293b 0%,#1e3a8a 100%)', text: '#fcd34d' },
  general:          { label: 'General',          Icon: Globe,       bg: '#6b7280', text: '#ffffff' },
};

export default function CircleIcon({ category, size = 'md', className = '' }) {
  const meta = CATEGORY_META[category] || CATEGORY_META.general;
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