// Investment Intelligence helpers — pure, data-driven signals from existing entities.
import { matchInvestorsToProject, matchProjectsToInvestor } from './investmentNetwork';

export const NAVY = '#071A2B';
export const BLUE = '#1769FF';
export const TURQ = '#16C7B7';
export const GREEN = '#20B26B';
export const ORANGE = '#FF9F43';

export const REGIONS = {
  Europe: ['germany', 'france', 'uk', 'united kingdom', 'italy', 'spain', 'netherlands', 'belgium', 'europe', 'european'],
  Africa: ['morocco', 'algeria', 'egypt', 'kenya', 'senegal', 'nigeria', 'south africa', 'ivory coast', 'ghana', 'africa'],
  GCC: ['saudi arabia', 'saudi', 'uae', 'emirates', 'qatar', 'kuwait', 'bahrain', 'gcc', 'gulf'],
};

export function capitalSeeking(projects) {
  return projects.reduce((a, p) => a + (p.investment_required || 0), 0);
}

export function trendingSectors(projects, sectors) {
  const counts = {};
  projects.forEach((p) => {
    const s = sectors.find((x) => x.id === p.sector_id);
    if (s) counts[s.name] = (counts[s.name] || 0) + 1;
  });
  return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([name, count]) => ({ name, count }));
}

export function opportunityRadar(projects, orgs) {
  const bucket = { Europe: 0, Africa: 0, GCC: 0, Other: 0 };
  const add = (label) => {
    const l = (label || '').toLowerCase();
    if (!l) return;
    for (const [region, keys] of Object.entries(REGIONS)) {
      if (keys.some((k) => l.includes(k))) { bucket[region]++; return; }
    }
    bucket.Other++;
  };
  projects.forEach((p) => (p.target_markets || []).forEach(add));
  orgs.forEach((o) => (o.geographic_focus || []).forEach(add));
  return bucket;
}

export function opportunityOfTheDay(projects, sectors, governorates) {
  const pool = projects.filter((p) => p.project_status === 'PUBLISHED');
  if (!pool.length) return null;
  const day = Math.floor(Date.now() / 86400000);
  const featured = pool.filter((p) => p.featured);
  const base = featured.length ? featured : pool;
  const pick = base[day % base.length];
  const sector = sectors.find((s) => s.id === pick.sector_id);
  const governorate = governorates.find((g) => g.id === pick.governorate_id);
  return { project: pick, sector, governorate };
}

export function newOpportunitiesCount(projects, days = 30) {
  const since = Date.now() - days * 86400000;
  return projects.filter((p) => p.created_date && new Date(p.created_date).getTime() >= since).length;
}

// Client-side fallback parser for natural-language search
export function parseQuery(query, sectors) {
  const q = (query || '').toLowerCase();
  if (!q) return null;
  const out = { sectors: [], geographies: [], min_ticket: null, max_ticket: null, investor_types: [], intent: null };
  sectors.forEach((s) => { if (q.includes(s.name.toLowerCase())) out.sectors.push(s.name); });
  ['tunisia', 'africa', 'europe', 'germany', 'france', 'gcc', 'saudi', 'uae', 'mena', 'north africa'].forEach((g) => {
    if (q.includes(g)) out.geographies.push(g);
  });
  const m = q.match(/(\d+)\s*[-–to]+\s*(\d+)\s*m/);
  if (m) { out.min_ticket = +m[1]; out.max_ticket = +m[2]; }
  else { const m2 = q.match(/(\d+)\s*m/); if (m2) out.max_ticket = +m2[1]; }
  if (q.includes('investor')) out.intent = 'investor';
  if (q.includes('project') || q.includes('opportunity')) out.intent = 'project';
  return out;
}

export function filterOrgsByParsed(orgs, p) {
  if (!p) return orgs;
  return orgs.filter((o) => {
    if (p.sectors.length && !p.sectors.some((s) => (o.investment_focus || []).some((f) => f.toLowerCase().includes(s.toLowerCase())))) return false;
    if (p.geographies.length && !p.geographies.some((g) => (o.geographic_focus || []).some((f) => f.toLowerCase().includes(g)) || (o.country || '').toLowerCase().includes(g))) return false;
    if (p.min_ticket != null && (o.maximum_ticket || 0) < p.min_ticket) return false;
    if (p.max_ticket != null && (o.minimum_ticket || Infinity) > p.max_ticket) return false;
    return true;
  });
}

export function filterProjectsByParsed(projects, p, sectors) {
  if (!p) return projects;
  return projects.filter((pr) => {
    if (p.sectors.length) {
      const s = sectors.find((x) => x.id === pr.sector_id);
      if (!s || !p.sectors.some((n) => s.name.toLowerCase().includes(n.toLowerCase()))) return false;
    }
    if (p.geographies.length && !p.geographies.some((g) => (pr.target_markets || []).some((t) => t.toLowerCase().includes(g)) || g === 'tunisia')) return false;
    if (p.min_ticket != null && (pr.investment_required || 0) < p.min_ticket) return false;
    if (p.max_ticket != null && (pr.investment_required || 0) > p.max_ticket) return false;
    return true;
  });
}

export { matchInvestorsToProject, matchProjectsToInvestor };