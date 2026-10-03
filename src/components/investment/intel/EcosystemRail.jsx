import React from 'react';
import { Building2, Briefcase, Landmark, Layers, Banknote, Globe } from 'lucide-react';

const ENTITIES = [
  { icon: Building2, label: 'Companies' },
  { icon: Briefcase, label: 'Projects' },
  { icon: Landmark, label: 'Investors' },
  { icon: Layers, label: 'Funds' },
  { icon: Banknote, label: 'Institutions' },
  { icon: Globe, label: 'Markets' },
];

export default function EcosystemRail() {
  return (
    <div className="rounded-2xl border bg-card p-4 mb-8">
      <div className="flex items-center justify-around gap-2 flex-wrap">
        {ENTITIES.map((e, i) => (
          <div key={e.label} className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <e.icon className="w-4 h-4 text-[#1769FF]" /> {e.label}
            </div>
            {i < ENTITIES.length - 1 && <span className="text-muted-foreground/30 hidden sm:inline">↕</span>}
          </div>
        ))}
      </div>
    </div>
  );
}