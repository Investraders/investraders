import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, Globe, Layers, Map, Network, UserPlus, ArrowRight, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import OrganizationCard from '@/components/investment/OrganizationCard';
import InvestorFilters from '@/components/investment/InvestorFilters';
import RegisterInvestorForm from '@/components/investment/RegisterInvestorForm';
import { ORG_TYPES, ORG_TYPE_OPTIONS, matchInvestorsToProject } from '@/lib/investmentNetwork';
import { CACHE } from '@/lib/query-client';

function Stat({ icon: Icon, value, label }) {
  return (
    <div className="rounded-2xl border bg-card p-4 flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div>
        <div className="text-2xl font-bold leading-none">{value}</div>
        <div className="text-xs text-muted-foreground mt-1">{label}</div>
      </div>
    </div>
  );
}

export default function InvestmentNetwork() {
  const [filters, setFilters] = useState({ q: '', type: '', country: '', stage: '', verified: false, featured: false });
  const [registerOpen, setRegisterOpen] = useState(false);

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

  const countries = useMemo(
    () => Array.from(new Set(orgs.map((o) => o.country).filter(Boolean))).sort(),
    [orgs]
  );

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

  const stats = useMemo(
    () => ({
      orgs: orgs.length,
      funds: vehicles.length,
      countries: countries.length,
      categories: new Set(orgs.map((o) => o.organization_type)).size,
      projects: projects.length,
    }),
    [orgs, vehicles, countries, projects]
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border bg-gradient-to-br from-primary/10 via-card to-card p-6 sm:p-10 mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary mb-3">
          <Network className="w-4 h-4" /> Investment Network
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">Discover the Investors Behind the Capital</h1>
        <p className="text-muted-foreground max-w-2xl mb-6">
          Explore funds, investment companies, institutional investors and capital partners — and discover the opportunities that match their investment mandates.
        </p>

        <InvestorFilters filters={filters} setFilters={setFilters} countries={countries} />

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-6">
          <Stat icon={Building2} value={stats.orgs} label="Investment institutions" />
          <Stat icon={Layers} value={stats.funds} label="Funds & vehicles" />
          <Stat icon={Globe} value={stats.countries} label="Countries" />
          <Stat icon={Sparkles} value={stats.categories} label="Investor categories" />
          <Stat icon={Map} value={stats.projects} label="Projects to match" />
        </div>
      </motion.div>

      {/* CTAs */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <div className="rounded-2xl border bg-card p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <UserPlus className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold">Are you an investor?</h3>
            <p className="text-sm text-muted-foreground">Join the network and receive opportunities matching your mandate.</p>
          </div>
          <Button onClick={() => setRegisterOpen(true)} className="shrink-0">Register</Button>
        </div>
        <Link to="/investment-map" className="rounded-2xl border bg-card p-5 flex items-center gap-4 hover:shadow-md transition-all">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Map className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold">Explore Investment Map</h3>
            <p className="text-sm text-muted-foreground">Browse published projects across Tunisia's governorates.</p>
          </div>
          <ArrowRight className="w-5 h-5 text-primary shrink-0" />
        </Link>
      </div>

      {/* Featured investors */}
      {featured.length > 0 && !filters.q && !filters.type && (
        <div className="mb-10">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" /> Featured investors
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.map((o, i) => <OrganizationCard key={o.id} org={o} index={i} />)}
          </div>
        </div>
      )}

      {/* Browse by category */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-3">Explore by category</h2>
        <div className="flex flex-wrap gap-2">
          {ORG_TYPE_OPTIONS.map((t) => {
            const count = orgs.filter((o) => o.organization_type === t).length;
            if (count === 0) return null;
            const on = filters.type === t;
            return (
              <button
                key={t}
                onClick={() => setFilters((f) => ({ ...f, type: on ? '' : t }))}
                className={`text-sm px-3.5 py-1.5 rounded-full border transition-colors ${on ? 'border-primary/30 bg-primary/10 text-primary' : 'bg-card text-muted-foreground hover:text-foreground'}`}
              >
                {ORG_TYPES[t]} <span className="text-xs opacity-70">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Directory */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">All investors</h2>
        <span className="text-sm text-muted-foreground">{filtered.length} institutions</span>
      </div>

      {orgsLoading ? (
        <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <Building2 className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p>No institutions match your filters.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((o, i) => <OrganizationCard key={o.id} org={o} index={i} />)}
        </div>
      )}

      <RegisterInvestorForm open={registerOpen} onClose={() => setRegisterOpen(false)} />
    </div>
  );
}