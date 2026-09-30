import React from 'react';
import { Search, X } from 'lucide-react';
import { ORG_TYPE_OPTIONS, ORG_TYPES, STAGE_OPTIONS, INVESTMENT_STAGES } from '@/lib/investmentNetwork';

const selectCls =
  'h-9 rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40';

export default function InvestorFilters({ filters, setFilters, countries }) {
  const update = (k, v) => setFilters((f) => ({ ...f, [k]: v }));
  const active =
    filters.q || filters.type || filters.country || filters.stage || filters.verified || filters.featured;

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          value={filters.q || ''}
          onChange={(e) => update('q', e.target.value)}
          placeholder="Search funds, investors, companies, sectors or countries..."
          className="w-full h-11 rounded-xl border bg-background pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <select className={selectCls} value={filters.type || ''} onChange={(e) => update('type', e.target.value)}>
          <option value="">All investor types</option>
          {ORG_TYPE_OPTIONS.map((t) => (
            <option key={t} value={t}>
              {ORG_TYPES[t]}
            </option>
          ))}
        </select>

        <select className={selectCls} value={filters.country || ''} onChange={(e) => update('country', e.target.value)}>
          <option value="">All countries</option>
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select className={selectCls} value={filters.stage || ''} onChange={(e) => update('stage', e.target.value)}>
          <option value="">All stages</option>
          {STAGE_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {INVESTMENT_STAGES[s]}
            </option>
          ))}
        </select>

        <label className={`inline-flex items-center gap-2 h-9 px-3 rounded-lg border text-sm cursor-pointer ${filters.verified ? 'border-primary/30 bg-primary/10 text-primary' : 'bg-background'}`}>
          <input
            type="checkbox"
            className="accent-primary"
            checked={!!filters.verified}
            onChange={(e) => update('verified', e.target.checked)}
          />
          Verified only
        </label>

        <label className={`inline-flex items-center gap-2 h-9 px-3 rounded-lg border text-sm cursor-pointer ${filters.featured ? 'border-primary/30 bg-primary/10 text-primary' : 'bg-background'}`}>
          <input
            type="checkbox"
            className="accent-primary"
            checked={!!filters.featured}
            onChange={(e) => update('featured', e.target.checked)}
          />
          Featured
        </label>

        {active && (
          <button
            onClick={() => setFilters({ q: '', type: '', country: '', stage: '', verified: false, featured: false })}
            className="inline-flex items-center gap-1 h-9 px-3 rounded-lg text-sm text-muted-foreground hover:text-foreground"
          >
            <X className="w-3.5 h-3.5" /> Clear
          </button>
        )}
      </div>
    </div>
  );
}