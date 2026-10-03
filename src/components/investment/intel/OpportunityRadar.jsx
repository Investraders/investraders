import React from 'react';
import { Radar } from 'lucide-react';
import { opportunityRadar } from '@/lib/investmentIntel';

const FLAGS = { Europe: '🇪🇺', Africa: '🌍', GCC: '🕌', Other: '🌐' };
const ORDER = ['Europe', 'Africa', 'GCC', 'Other'];

export default function OpportunityRadar({ projects, orgs }) {
  const bucket = opportunityRadar(projects, orgs);
  const max = Math.max(1, ...Object.values(bucket));
  return (
    <div className="rounded-2xl border bg-card p-5 h-full">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-[#1769FF]/10 flex items-center justify-center"><Radar className="w-4 h-4 text-[#1769FF]" /></div>
        <div>
          <h2 className="font-semibold leading-tight">Global Opportunity Radar</h2>
          <p className="text-xs text-muted-foreground">Where capital and projects connect</p>
        </div>
      </div>
      <div className="space-y-3">
        {ORDER.map((r) => (
          <div key={r}>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="font-medium">{FLAGS[r]} {r}</span>
              <span className="text-muted-foreground">{bucket[r]} signals</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-[#1769FF] to-[#16C7B7]" style={{ width: `${(bucket[r] / max) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}