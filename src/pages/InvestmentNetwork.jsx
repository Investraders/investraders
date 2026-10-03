import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Building2, UserPlus, Map, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import OrganizationCard from '@/components/investment/OrganizationCard';
import InvestorFilters from '@/components/investment/InvestorFilters';
import IntelligenceHero from '@/components/investment/intel/IntelligenceHero';
import EcosystemRail from '@/components/investment/intel/EcosystemRail';
import AIIntelligencePanel from '@/components/investment/intel/AIIntelligencePanel';
import OpportunityRadar from '@/components/investment/intel/OpportunityRadar';
import OpportunityOfTheDay from '@/components/investment/intel/OpportunityOfTheDay';
import MatchmakingWizard from '@/components/investment/intel/MatchmakingWizard';
import { ORG_TYPES, ORG_TYPE_OPTIONS, matchProjectsToInvestor } from '@/lib/investmentNetwork';
import { opportunityOfTheDay } from '@/lib/investmentIntel';
import { CACHE } from '@/lib/query-client';

export default function InvestmentNetwork() {
  const [filters, setFilters] = useState({ q: '', type: '', country: '', stage: '', verified: false, featured: false });

  const { data: orgs = [], isLoading: orgsLoading } = useQuery({
    queryKey: ['investment-orgs'],
    queryFn: () => base44.entities.InvestmentOrganization.list('-created_date', 300),
    staleTime: CACHE.medium,
  });
  const { data: vehicles = [] } = useQuery({
    queryKey: ['investment-vehicles'],
    queryFn: () => base44.entities.InvestmentVehicle.list('-created_date', 300),
    staleTime: CACHE.medium,
  });
  const { data: projects = [] } = useQuery({
    queryKey: ['investment-projects-published'],
    queryFn: () => base44.entities.InvestmentProject.filter({ project_status: 'PUBLISHED' }),
    staleTime: CACHE.short,
  });
  const { data: sectors = [] } = useQuery({
    queryKey: ['sectors'],
    queryFn: () => base44.entities.Sector.list(),
    staleTime: CACHE.medium,
  });
  const { data: governorates = [] } = useQuery({
    queryKey: ['governorates'],
    queryFn: () => base44.entities.Governorate.list(),
    staleTime: CACHE.long,
  });

  const countries = useMemo(
    () => Array.from(new Set(orgs.map((o) => o.country).filter(Boolean))).sort(),
    [orgs]
  );

  const matchScoreMap = useMemo(() => {
    const map = {};
    orgs.forEach((o) => {
      const res = matchProjectsToInvestor(projects, o, sectors, governorates);
      map[o.id] = res.length ? res[0].score : 0;
    });
    return map;
  }, [orgs, projects, sectors, governorates]);

  const filtered = useMemo(() => {
    const q = (filters.q || '').trim().toLowerCase();
    return orgs.filter((o) => {
      if (filters.type && o.organization_type !== filters.type) return false;
      if (filters.country && o.country !== filters.country) return false;
      if (filters.stage && !(o.investment_stages || []).includes(filters.stage)) return false;
      if (filters.verified && o.verification_status !== 'VERIFIED' && o.verification_status !== 'OFFICIAL') return false;
      if (filters.featured && !o.featured) return false;
      if (q) {
        const hay = `${o.display_name || ''} ${o.legal_name || ''} ${o.country || ''} ${(o.investment_focus || []).join(' ')} ${o.organization_type || ''}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [orgs, filters]);

  const featured = useMemo(() => orgs.filter((o) => o.featured).slice(0, 6), [orgs]);
  const oppOfDay = useMemo(() => opportunityOfTheDay(projects, sectors, governorates), [projects, sectors, governorates]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <IntelligenceHero orgs={orgs} projects={projects} sectors={sectors} />
      <EcosystemRail />
      <OpportunityOfTheDay pick={oppOfDay} orgs={orgs} />

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2"><AIIntelligencePanel orgs={orgs} projects={projects} sectors={sectors} /></div>
        <OpportunityRadar projects={projects} orgs={orgs} />
      </div>

      <MatchmakingWizard orgs={orgs} projects={projects} sectors={sectors} governorates={governorates} />

      {/* CTAs */}
      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        <div className="rounded-2xl border bg-card p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#1769FF]/10 flex items-center justify-center shrink-0">
            <UserPlus className="w-6 h-6 text-[#1769FF]" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold">Are you an investor?</h3>
            <p className="text-sm text-muted-foreground">Join the network and receive opportunities matching your mandate.</p>
          </div>
          <Button asChild className="shrink-0 bg-[#1769FF] hover:bg-[#1769FF]/90">
            <Link to="/investment-network/profile">Register</Link>
          </Button>
        </div>
        <Link to="/investment-map" className="rounded-2xl border bg-card p-5 flex items-center gap-4 hover:shadow-md transition-all">
          <div className="w-12 h-12 rounded-xl bg-[#16C7B7]/10 flex items-center justify-center shrink-0">
            <Map className="w-6 h-6 text-[#16C7B7]" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold">Explore Investment Map</h3>
            <p className="text-sm text-muted-foreground">Browse published projects across Tunisia's governorates.</p>
          </div>
          <ArrowRight className="w-5 h-5 text-[#1769FF] shrink-0" />
        </Link>
      </div>

      {/* Directory */}
      <div id="directory" className="scroll-mt-24">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2"><Sparkles className="w-5 h-5 text-[#1769FF]" /> Investor directory</h2>
          <span className="text-sm text-muted-foreground">{filtered.length} institutions · {vehicles.length} funds</span>
        </div>

        <InvestorFilters filters={filters} setFilters={setFilters} countries={countries} />

        {/* Featured */}
        {featured.length > 0 && !filters.q && !filters.type && (
          <div className="mt-6 mb-8">
            <h3 className="font-semibold mb-3 flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#FF9F43]" /> Featured investors</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featured.map((o, i) => <OrganizationCard key={o.id} org={o} index={i} matchScore={matchScoreMap[o.id]} />)}
            </div>
          </div>
        )}

        {/* Category chips */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3">Explore by category</h3>
          <div className="flex flex-wrap gap-2">
            {ORG_TYPE_OPTIONS.map((t) => {
              const count = orgs.filter((o) => o.organization_type === t).length;
              if (count === 0) return null;
              const on = filters.type === t;
              return (
                <button
                  key={t}
                  onClick={() => setFilters((f) => ({ ...f, type: on ? '' : t }))}
                  className={`text-sm px-3.5 py-1.5 rounded-full border transition-colors ${on ? 'border-[#1769FF]/30 bg-[#1769FF]/10 text-[#1769FF]' : 'bg-card text-muted-foreground hover:text-foreground'}`}
                >
                  {ORG_TYPES[t]} <span className="text-xs opacity-70">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* All investors */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">All investors</h3>
        </div>
        {orgsLoading ? (
          <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 animate-spin text-[#1769FF]" /></div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <Building2 className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p>No institutions match your filters.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((o, i) => <OrganizationCard key={o.id} org={o} index={i} matchScore={matchScoreMap[o.id]} />)}
          </div>
        )}
      </div>
    </div>
  );
}