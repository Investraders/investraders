import React from 'react';
import {
  TrendingUp, Bitcoin, BarChart2, Building2, Briefcase, Wallet, Globe
} from 'lucide-react';

export const CATEGORY_META = {
  investing:       { label: 'Investing',        Icon: TrendingUp,  bg: 'bg-blue-600',   text: 'text-white' },
  crypto:          { label: 'Crypto',            Icon: Bitcoin,     bg: 'bg-orange-500', text: 'text-white' },
  stocks:          { label: 'Stocks',            Icon: BarChart2,   bg: 'bg-green-600',  text: 'text-white' },
  real_estate:     { label: 'Real Estate',       Icon: Building2,   bg: 'bg-purple-600', text: 'text-white' },
  business:        { label: 'Business',          Icon: Briefcase,   bg: 'bg-cyan-600',   text: 'text-white' },
  personal_finance:{ label: 'Personal Finance',  Icon: Wallet,      bg: 'bg-rose-500',   text: 'text-white' },
  general:         { label: 'General',           Icon: Globe,       bg: 'bg-gray-500',   text: 'text-white' },
};

export default function CircleIcon({ category, size = 'md', className = '' }) {
  const meta = CATEGORY_META[category] || CATEGORY_META.general;
  const { Icon, bg, text } = meta;

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
  };

  return (
    <div className={`rounded-full ${bg} ${sizeClasses[size]} flex items-center justify-center shrink-0 ${className}`}>
      <Icon className={`${iconSizes[size]} ${text}`} />
    </div>
  );
}