import React from 'react';
import { Flame, Coins, Building2, TrendingUp, Sparkles } from 'lucide-react';
import { capitalSeeking, trendingSectors, newOpportunitiesCount } from '@/lib/investmentIntel';
import { formatMTND } from '@/lib/investment';

export default function AIIntelligencePanel({ orgs, projects, sectors }) {
  const capital = capitalSeeking(projects);
  const trending = trendingSectors(projects, sectors);
  const newOps = newOpportunitiesCount(projects);
  const kpis = [
    { icon: Flame, label: 'New opportunities', value: newOps, tone: 'text-[#FF9F43] bg-[#FF9F43]/10', sub: 'last 30 days' },
    { icon: Coins, label: 'Capital seeking', value: formatMTND(capital), tone: 'text-[#20B26B] bg-[#20B26B]/10', sub: 'across projects' },
    { icon: Building2, label: 'Active investors', value: orgs.length, tone: 'text-[#1769FF] bg-[#1769FF]/10', sub: 'with mandates' },
  ];
  return (
    <div className="rounded-2xl border bg-card p-5 h-full">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-[#16C7B7]/10 flex items-center justify-center"><Sparkles className="w-4 h-4 text-[#16C7B7]" /></div>
        <div>
          <h2 className="font-semibold leading-tight">AI Intelligence</h2>
          <p className="text-xs text-muted-foreground">Live signals derived from network activity</p>
        </div>
      </div>
      <div className="grid sm:grid-cols-3 gap-3 mb-4">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-xl border p-4">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2 ${k.tone}`}><k.icon className="w-5 h-5" /></div>
            <div className="text-xl font-bold leading-none">{k.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{k.label}</div>
            <div className="text-[10px] text-muted-foreground/70">{k.sub}</div>
          </div>
        ))}
      </div>
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5" /> Trending sectors</div>
        <div className="flex flex-wrap gap-2">
          {trending.length ? trending.map((t) => (
            <span key={t.name} className="text-sm px-3 py-1 rounded-full bg-[#1769FF]/10 text-[#1769FF] border border-[#1769FF]/20">{t.name} <span className="text-xs opacity-70">{t.count}</span></span>
          )) : <span className="text-sm text-muted-foreground">Not enough data yet</span>}
        </div>
      </div>
    </div>
  );
}