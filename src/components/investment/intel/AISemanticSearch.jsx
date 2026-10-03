import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Sparkles, Loader2, MapPin, ArrowRight } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { ORG_TYPES, flagOf, initialsOf } from '@/lib/investmentNetwork';
import { formatMTND } from '@/lib/investment';
import { parseQuery, filterOrgsByParsed, filterProjectsByParsed } from '@/lib/investmentIntel';

const EXAMPLES = [
  'Renewable energy projects in Tunisia',
  'Investors interested in fintech',
  'Funds investing 1–5M in technology',
  'German companies looking for African partners',
];

export default function AISemanticSearch({ orgs, projects, sectors }) {
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const run = async () => {
    if (!q.trim()) return;
    setLoading(true);
    let parsed;
    try {
      const sectorList = sectors.map((s) => s.name).join(', ');
      const prompt = `You are an investment search parser. Extract structured filters from this user query.
Sectors (pick only from this list): ${sectorList}.
Investor types (from: VENTURE_CAPITAL, PRIVATE_EQUITY, FAMILY_OFFICE, ANGEL_NETWORK, SOVEREIGN_WEALTH_FUND, DEVELOPMENT_FINANCE_INSTITUTION, IMPACT_INVESTOR, ASSET_MANAGER, PENSION_FUND, CORPORATE_VENTURE_CAPITAL, INFRASTRUCTURE_FUND, CLIMATE_FUND, ISLAMIC_FINANCE, INVESTMENT_HOLDING, BANK_INVESTMENT_ARM, MULTILATERAL_FUND, OTHER).
Return JSON with: sectors (array), geographies (array), min_ticket (number or omit), max_ticket (number or omit), investor_types (array), intent ("investor" or "project" or omit).
Query: "${q}"`;
      const res = await base44.integrations.Core.InvokeLLM({
        prompt,
        response_json_schema: {
          type: 'object',
          properties: {
            sectors: { type: 'array', items: { type: 'string' } },
            geographies: { type: 'array', items: { type: 'string' } },
            min_ticket: { type: 'number' },
            max_ticket: { type: 'number' },
            investor_types: { type: 'array', items: { type: 'string' } },
            intent: { type: 'string' },
          },
        },
      });
      parsed = {
        sectors: res.sectors || [],
        geographies: res.geographies || [],
        min_ticket: res.min_ticket ?? null,
        max_ticket: res.max_ticket ?? null,
        investor_types: res.investor_types || [],
        intent: res.intent || null,
      };
    } catch {
      parsed = parseQuery(q, sectors);
    }
    const investors = filterOrgsByParsed(orgs, parsed).slice(0, 4);
    const opps = filterProjectsByParsed(projects, parsed, sectors).slice(0, 4);
    setResults({ investors, opps });
    setLoading(false);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#16C7B7]" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && run()}
            placeholder="What are you looking for? e.g. Renewable energy projects in Tunisia"
            className="w-full rounded-xl border-0 bg-white/10 text-white placeholder-white/50 pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1769FF]/60"
          />
        </div>
        <button
          onClick={run}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1769FF] hover:bg-[#1769FF]/90 text-white font-semibold px-5 py-3 text-sm disabled:opacity-60"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />} AI Search
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mt-3">
        {EXAMPLES.map((ex) => (
          <button key={ex} onClick={() => setQ(ex)} className="text-[11px] px-2.5 py-1 rounded-full bg-white/10 text-white/70 hover:bg-white/20 border border-white/10 text-left">
            {ex}
          </button>
        ))}
      </div>

      {results && (
        <div className="mt-4 grid sm:grid-cols-2 gap-3">
          <ResultGroup title="Matching investors" items={results.investors} kind="investor" empty="No investors match." />
          <ResultGroup title="Matching opportunities" items={results.opps} kind="project" sectors={sectors} empty="No projects match." />
        </div>
      )}
    </div>
  );
}

function ResultGroup({ title, items, kind, sectors, empty }) {
  return (
    <div className="rounded-xl bg-white/5 border border-white/10 p-3">
      <div className="text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">{title}</div>
      {!items.length ? (
        <p className="text-xs text-white/50 py-3 text-center">{empty}</p>
      ) : (
        <div className="space-y-2">
          {items.map((it) => kind === 'investor' ? (
            <Link key={it.id} to={`/investment-network/${it.id}`} className="flex items-center gap-2 rounded-lg bg-white/5 hover:bg-white/10 p-2">
              <div className="w-8 h-8 rounded-lg bg-[#1769FF]/20 flex items-center justify-center text-[#16C7B7] text-xs font-bold shrink-0">{initialsOf(it.display_name)}</div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-white font-medium truncate">{it.display_name}</div>
                <div className="text-[11px] text-white/60 truncate">{flagOf(it.country_code)} {it.country} · {ORG_TYPES[it.organization_type] || it.organization_type}</div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-white/40 shrink-0" />
            </Link>
          ) : (
            <Link key={it.id} to={`/project/${it.id}`} className="flex items-center gap-2 rounded-lg bg-white/5 hover:bg-white/10 p-2">
              <div className="w-8 h-8 rounded-lg bg-[#20B26B]/20 flex items-center justify-center shrink-0"><MapPin className="w-4 h-4 text-[#20B26B]" /></div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-white font-medium truncate">{it.title}</div>
                <div className="text-[11px] text-white/60 truncate">{sectors.find((s) => s.id === it.sector_id)?.name || '—'} · {formatMTND(it.investment_required)}</div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-white/40 shrink-0" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}