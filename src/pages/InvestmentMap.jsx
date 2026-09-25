import React, { useMemo, useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Map, Sparkles, TrendingUp, Layers, Coins, Star } from 'lucide-react';
import TunisiaMap from '@/components/investment/TunisiaMap';
import GovernoratePanel from '@/components/investment/GovernoratePanel';
import FilterBar from '@/components/investment/FilterBar';
import ProjectCard from '@/components/investment/ProjectCard';
import { inBand, formatMTND, formatNumber, DEMO_NOTICE } from '@/lib/investment';

export default function InvestmentMap() {
  const opportunitiesRef = useRef(null);
  const [selectedGovId, setSelectedGovId] = useState(null);
  const [filters, setFilters] = useState({
    search: '', governorateId: 'all', sectorId: 'all', sizeBand: 'all', stage: 'all', type: 'all', verifiedOnly: false,
  });

  const { data: governorates = [] } = useQuery({
    queryKey: ['governorates'],
    queryFn: async () => {
      const list = await base44.entities.Governorate.list('-created_date', 50);
      return [...list].sort((a, b) => a.name.localeCompare(b.name));
    },
  });
  const { data: sectors = [] } = useQuery({
    queryKey: ['sectors'],
    queryFn: async () => {
      const list = await base44.entities.Sector.list('-created_date', 50);
      return [...list].sort((a, b) => a.name.localeCompare(b.name));
    },
  });
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['investment-projects'],
    queryFn: () => base44.entities.InvestmentProject.filter({ project_status: 'PUBLISHED' }, '-created_date', 500),
  });

  const govById = useMemo(() => Object.fromEntries(governorates.map((g) => [g.id, g])), [governorates]);
  const sectorById = useMemo(() => Object.fromEntries(sectors.map((s) => [s.id, s])), [sectors]);

  const filtered = useMemo(() => {
    const q = filters.search.trim().toLowerCase();
    return projects.filter((p) => {
      if (filters.governorateId !== 'all' && p.governorate_id !== filters.governorateId) return false;
      if (filters.sectorId !== 'all' && p.sector_id !== filters.sectorId) return false;
      if (filters.stage !== 'all' && p.investment_stage !== filters.stage) return false;
      if (filters.type !== 'all' && p.project_type !== filters.type) return false;
      if (filters.verifiedOnly && !p.is_verified) return false;
      if (!inBand(p.investment_required, filters.sizeBand)) return false;
      if (q) {
        const gov = govById[p.governorate_id];
        const sec = sectorById[p.sector_id];
        const hay = `${p.title} ${p.company_name} ${p.city} ${gov?.name} ${sec?.name} ${p.short_description}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [projects, filters, govById, sectorById]);

  const stats = useMemo(() => {
    const map = {};
    governorates.forEach((g) => { map[g.id] = { count: 0, investment: 0 }; });
    filtered.forEach((p) => {
      if (!map[p.governorate_id]) map[p.governorate_id] = { count: 0, investment: 0 };
      map[p.governorate_id].count += 1;
      map[p.governorate_id].investment += p.investment_required || 0;
    });
    return map;
  }, [filtered, governorates]);

  const totals = useMemo(() => {
    const totalInv = projects.reduce((s, p) => s + (p.investment_required || 0), 0);
    const sectorsCovered = new Set(projects.map((p) => p.sector_id)).size;
    const govCovered = new Set(projects.map((p) => p.governorate_id)).size;
    return { totalInv, sectorsCovered, govCovered, count: projects.length };
  }, [projects]);

  const selectedGov = selectedGovId ? govById[selectedGovId] : null;
  const selectedGovProjects = useMemo(
    () => filtered.filter((p) => p.governorate_id === selectedGovId),
    [filtered, selectedGovId]
  );

  const featured = useMemo(() => {
    const f = filtered.filter((p) => p.featured);
    return (f.length ? f : filtered).slice(0, 3);
  }, [filtered]);

  const exploreGov = (govId) => {
    setFilters((f) => ({ ...f, governorateId: govId }));
    setTimeout(() => opportunitiesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-[0.2em] mb-4 bg-primary/5 border-primary/20 text-primary">
          <Map className="w-3.5 h-3.5" /> Investment Map
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
          Discover Investment-Ready Projects Across Tunisia
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Explore projects by governorate, sector, investment size and opportunity type — and connect directly with project owners.
        </p>
      </div>

      {/* Headline stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { icon: Map, label: 'Governorates', value: formatNumber(totals.govCovered) },
          { icon: Layers, label: 'Projects', value: formatNumber(totals.count) },
          { icon: Coins, label: 'Investment opportunities', value: formatMTND(Math.round(totals.totalInv)) },
          { icon: TrendingUp, label: 'Sectors', value: formatNumber(totals.sectorsCovered) },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border bg-card p-5">
            <s.icon className="w-5 h-5 text-primary mb-2" />
            <div className="text-2xl font-bold leading-tight">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <FilterBar filters={filters} setFilters={setFilters} governorates={governorates} sectors={sectors} resultCount={filtered.length} />

      {/* Map + panel */}
      <div className="grid lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <TunisiaMap
            governorates={governorates}
            stats={stats}
            selectedId={selectedGovId}
            onSelect={setSelectedGovId}
          />
        </div>
        <div className="lg:col-span-1">
          <GovernoratePanel
            governorate={selectedGov}
            projects={selectedGovProjects}
            sectors={sectors}
            onExplore={exploreGov}
            onClose={() => setSelectedGovId(null)}
          />
        </div>
      </div>

      {/* Featured */}
      {featured.length > 0 && (
        <div className="mt-12">
          <div className="flex items-center gap-2 mb-5">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl font-bold">Featured Opportunities</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((p, i) => (
              <ProjectCard key={p.id} project={p} governorate={govById[p.governorate_id]} sector={sectorById[p.sector_id]} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* Opportunities */}
      <div ref={opportunitiesRef} className="mt-12 scroll-mt-24">
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <h2 className="text-xl font-bold">
            Investment Opportunities
            <span className="ml-2 text-sm font-normal text-muted-foreground">{filtered.length} projects</span>
          </h2>
          <span className="inline-flex items-center gap-1.5 text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-full px-3 py-1">
            <Star className="w-3 h-3" /> {DEMO_NOTICE}
          </span>
        </div>

        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-56 rounded-2xl border bg-card animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border bg-card p-12 text-center">
            <Layers className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
            <p className="font-medium">No projects match your filters</p>
            <p className="text-sm text-muted-foreground mt-1">Try adjusting or clearing your search and filters.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.slice(0, 60).map((p, i) => (
              <ProjectCard key={p.id} project={p} governorate={govById[p.governorate_id]} sector={sectorById[p.sector_id]} index={i} />
            ))}
          </div>
        )}
        {filtered.length > 60 && (
          <p className="text-center text-sm text-muted-foreground mt-6">Showing 60 of {filtered.length} projects. Refine your filters to narrow the results.</p>
        )}
      </div>
    </div>
  );
}