import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import {
  ArrowLeft, Globe, ShieldCheck, Star, Loader2, Search, Building2, MapPin, Layers, Coins, Search as SearchIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProjectMatches } from '@/components/investment/MatchResults';
import { ORG_TYPES, VERIFICATION_META, flagOf, initialsOf, formatTicket, matchProjectsToInvestor } from '@/lib/investmentNetwork';
import { STAGE_LABELS } from '@/lib/investment';
import { CACHE } from '@/lib/query-client';

function Section({ title, children }) {
  return (
    <div className="rounded-2xl border bg-card p-6">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">{title}</h2>
      {children}
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-right">{value || '—'}</span>
    </div>
  );
}

export default function InvestorDetail() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const autoMatch = params.get('match') === '1';
  const [showMatches, setShowMatches] = useState(autoMatch);

  const { data: org, isLoading } = useQuery({
    queryKey: ['investment-org', id],
    queryFn: () => base44.entities.InvestmentOrganization.get(id),
    enabled: !!id,
    staleTime: CACHE.medium,
  });
  const { data: vehicles = [] } = useQuery({
    queryKey: ['investment-vehicles-org', id],
    queryFn: () => base44.entities.InvestmentVehicle.filter({ organization_id: id }),
    enabled: !!id,
    staleTime: CACHE.medium,
  });
  const { data: projects = [] } = useQuery({
    queryKey: ['investment-projects-published'],
    queryFn: () => base44.entities.InvestmentProject.filter({ project_status: 'PUBLISHED' }),
    staleTime: CACHE.short,
  });
  const { data: sectors = [] } = useQuery({
    queryKey: ['sectors-all'],
    queryFn: () => base44.entities.Sector.list(),
    staleTime: CACHE.medium,
  });
  const { data: governorates = [] } = useQuery({
    queryKey: ['governorates-all'],
    queryFn: () => base44.entities.Governorate.list(),
    staleTime: CACHE.medium,
  });

  const matches = useMemo(
    () => (org ? matchProjectsToInvestor(projects, org, sectors, governorates) : []),
    [org, projects, sectors, governorates]
  );

  if (isLoading) {
    return <div className="max-w-5xl mx-auto px-4 py-20 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }
  if (!org) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-2">Investor not found</h1>
        <Link to="/investment-network"><Button>Back to Investment Network</Button></Link>
      </div>
    );
  }

  const verify = VERIFICATION_META[org.verification_status] || VERIFICATION_META.UNVERIFIED;
  const initials = initialsOf(org.display_name);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/investment-network" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Investment Network
      </Link>

      {/* Hero */}
      <div className="rounded-2xl border bg-card p-6 sm:p-8 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-5">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-2xl shrink-0 overflow-hidden">
            {org.logo ? <img src={org.logo} alt={org.display_name} className="w-full h-full object-cover" /> : initials}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              {(org.verification_status === 'VERIFIED' || org.verification_status === 'OFFICIAL') && (
                <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${verify.cls}`}>
                  <ShieldCheck className="w-3.5 h-3.5" /> {verify.label}
                </span>
              )}
              {org.featured && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> Featured
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-1">{org.display_name}</h1>
            <div className="flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
              <span className="inline-flex items-center gap-1.5"><span className="text-lg">{flagOf(org.country_code)}</span>{org.country}</span>
              <span className="inline-flex items-center gap-1.5"><Building2 className="w-4 h-4" />{ORG_TYPES[org.organization_type] || org.organization_type}</span>
              {org.city && <span>{org.city}</span>}
            </div>
            {org.website && (
              <a href={org.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline mt-3">
                <Globe className="w-4 h-4" /> {org.website.replace(/^https?:\/\//, '')}
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {org.description && <Section title="About"><p className="text-sm leading-relaxed text-muted-foreground">{org.description}</p></Section>}

          <Section title="Investment focus">
            <div className="flex flex-wrap gap-2">
              {(org.investment_focus || []).length ? org.investment_focus.map((s) => (
                <span key={s} className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">{s}</span>
              )) : <span className="text-sm text-muted-foreground">Not publicly disclosed</span>}
            </div>
          </Section>

          <div className="grid sm:grid-cols-2 gap-6">
            <Section title="Geographic focus">
              <div className="space-y-2">
                {(org.geographic_focus || []).length ? org.geographic_focus.map((g) => (
                  <div key={g} className="flex items-center gap-2 text-sm"><MapPin className="w-4 h-4 text-primary" /> {g}</div>
                )) : <span className="text-sm text-muted-foreground">Not disclosed</span>}
              </div>
            </Section>
            <Section title="Investment stages">
              <div className="flex flex-wrap gap-2">
                {(org.investment_stages || []).length ? org.investment_stages.map((s) => (
                  <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground">{s.replace(/_/g, ' ')}</span>
                )) : <span className="text-sm text-muted-foreground">Not disclosed</span>}
              </div>
            </Section>
          </div>

          {vehicles.length > 0 && (
            <Section title={`Investment vehicles (${vehicles.length})`}>
              <div className="space-y-3">
                {vehicles.map((v) => (
                  <div key={v.id} className="rounded-xl border p-4">
                    <div className="flex items-center justify-between gap-3">
                      <h4 className="font-semibold">{v.name}</h4>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{(v.fund_category || v.vehicle_type || '').replace(/_/g, ' ')}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-2 flex-wrap">
                      <span>{v.fund_status?.replace(/_/g, ' ') || ''}</span>
                      {v.target_size && <span>· Target {v.target_size}M</span>}
                      <span>· {formatTicket(v.minimum_ticket, v.maximum_ticket)}</span>
                    </div>
                    {(v.sector_focus || []).length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {v.sector_focus.map((s) => <span key={s} className="text-[11px] px-2 py-0.5 rounded-md bg-muted text-muted-foreground">{s}</span>)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Matching projects */}
          <Section title="Matching projects">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">{matches.length} published projects match this investor profile.</p>
              <Button variant="outline" onClick={() => setShowMatches((s) => !s)}>
                <SearchIcon className="w-4 h-4 mr-2" /> {showMatches ? 'Hide' : 'Show'} matches
              </Button>
            </div>
            {showMatches && <ProjectMatches results={matches} />}
          </Section>
        </div>

        {/* Side panel */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border bg-card p-6 space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Investor profile</div>
            <Row label="Type" value={ORG_TYPES[org.organization_type]} />
            <Row label="Country" value={`${flagOf(org.country_code)} ${org.country}`} />
            <Row label="Founded" value={org.year_founded || '—'} />
            <Row label="Ticket range" value={formatTicket(org.minimum_ticket, org.maximum_ticket)} />
            <Row label="Structures" value={(org.investment_structures || []).map((s) => s.replace(/_/g, ' ')).join(', ')} />

            <Button className="w-full" onClick={() => setShowMatches((s) => !s)}>
              <Search className="w-4 h-4 mr-2" /> Find Matching Projects
            </Button>
            <p className="text-[11px] text-muted-foreground text-center">
              Match scores reflect profile compatibility, not investment advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}