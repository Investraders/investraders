import React from 'react';
import { Megaphone, Star, Briefcase, Lock, CheckCircle2, ChevronRight } from 'lucide-react';

const MILESTONES = [
  {
    key: 'ads',
    icon: Megaphone,
    title: 'Advertisement Ready',
    description: 'Allow targeted, community-relevant ads and earn revenue.',
    threshold: 25,
    color: 'blue',
  },
  {
    key: 'sponsorship',
    icon: Star,
    title: 'Brand Sponsorship',
    description: 'Brands sponsor your circle based on topic relevance.',
    threshold: 75,
    color: 'purple',
  },
  {
    key: 'workspace',
    icon: Briefcase,
    title: 'Professional Workspace',
    description: 'Upgrade to a workspace — sell services, goods, and more.',
    threshold: 200,
    color: 'emerald',
  },
];

const COLOR_MAP = {
  blue: {
    icon: 'bg-blue-100 text-blue-600',
    bar: 'bg-blue-500',
    barBg: 'bg-blue-100',
    badge: 'bg-blue-50 text-blue-700 border-blue-200',
    unlock: 'text-blue-600',
  },
  purple: {
    icon: 'bg-purple-100 text-purple-600',
    bar: 'bg-purple-500',
    barBg: 'bg-purple-100',
    badge: 'bg-purple-50 text-purple-700 border-purple-200',
    unlock: 'text-purple-600',
  },
  emerald: {
    icon: 'bg-emerald-100 text-emerald-600',
    bar: 'bg-emerald-500',
    barBg: 'bg-emerald-100',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    unlock: 'text-emerald-600',
  },
};

export default function MonetizationJourney({ memberCount = 0 }) {
  return (
    <div className="px-6 pb-6">
      <div className="border rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 bg-gradient-to-r from-amber-50 to-orange-50 border-b flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-amber-800 flex items-center gap-2">
              💰 Make Money Meanwhile
            </h3>
            <p className="text-xs text-amber-600 mt-0.5">Grow your circle to unlock revenue opportunities</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-amber-600">Current members</p>
            <p className="text-2xl font-bold text-amber-700 leading-none">{memberCount}</p>
          </div>
        </div>

        <div className="p-4 space-y-3">
          {MILESTONES.map((m) => {
            const c = COLOR_MAP[m.color];
            const Icon = m.icon;
            const progress = Math.min((memberCount / m.threshold) * 100, 100);
            const unlocked = memberCount >= m.threshold;

            return (
              <div
                key={m.key}
                className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${
                  unlocked ? 'bg-white shadow-sm' : 'bg-muted/30 opacity-75'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${c.icon}`}>
                  {unlocked ? <Icon className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold">{m.title}</p>
                    {unlocked ? (
                      <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${c.badge}`}>
                        <CheckCircle2 className="w-2.5 h-2.5" /> Unlocked
                      </span>
                    ) : (
                      <span className="text-[10px] text-muted-foreground font-medium">
                        {m.threshold - memberCount} more members
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 mb-2">{m.description}</p>
                  <div className={`h-1.5 rounded-full ${c.barBg} overflow-hidden`}>
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${c.bar}`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1">
                    {memberCount} / {m.threshold} members
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="px-4 pb-4">
          <p className="text-[11px] text-center text-muted-foreground italic">
            Keep engaging your community — your circle is building value ✨
          </p>
        </div>
      </div>
    </div>
  );
}