// Investment Network taxonomy, labels, and transparent matching engine.

export const ORG_TYPES = {
  VENTURE_CAPITAL: 'Venture Capital',
  PRIVATE_EQUITY: 'Private Equity',
  FAMILY_OFFICE: 'Family Office',
  ANGEL_NETWORK: 'Angel Network',
  SOVEREIGN_WEALTH_FUND: 'Sovereign Wealth Fund',
  DEVELOPMENT_FINANCE_INSTITUTION: 'Development Finance Institution',
  IMPACT_INVESTOR: 'Impact Investor',
  ASSET_MANAGER: 'Asset Manager',
  PENSION_FUND: 'Pension Fund',
  CORPORATE_VENTURE_CAPITAL: 'Corporate Venture Capital',
  INFRASTRUCTURE_FUND: 'Infrastructure Fund',
  REAL_ESTATE_FUND: 'Real Estate Fund',
  CLIMATE_FUND: 'Climate / Green Fund',
  ISLAMIC_FINANCE: 'Islamic Finance',
  INVESTMENT_HOLDING: 'Investment Holding',
  BANK_INVESTMENT_ARM: 'Bank Investment Arm',
  MULTILATERAL_FUND: 'Multilateral Fund',
  OTHER: 'Other',
};

export const ORG_TYPE_OPTIONS = Object.keys(ORG_TYPES);

export const INVESTMENT_STAGES = {
  PRE_SEED: 'Pre-Seed',
  SEED: 'Seed',
  EARLY_STAGE: 'Early Stage',
  SERIES_A: 'Series A',
  GROWTH: 'Growth',
  LATE_STAGE: 'Late Stage',
  BUYOUT: 'Buyout',
  GROWTH_EQUITY: 'Growth Equity',
  INFRASTRUCTURE: 'Infrastructure',
  REAL_ESTATE: 'Real Estate',
  MEZZANINE: 'Mezzanine',
  DISTRESSED: 'Distressed / Restructuring',
};

export const STAGE_OPTIONS = Object.keys(INVESTMENT_STAGES);

export const VERIFICATION_META = {
  UNVERIFIED: { label: 'Unverified', cls: 'bg-muted text-muted-foreground border-border' },
  PENDING: { label: 'Pending review', cls: 'bg-amber-50 text-amber-700 border-amber-200' },
  VERIFIED: { label: 'Verified', cls: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  OFFICIAL: { label: 'Official', cls: 'bg-blue-50 text-blue-700 border-blue-200' },
  PARTNER: { label: 'Investraders Partner', cls: 'bg-purple-50 text-purple-700 border-purple-200' },
};

export const STRUCTURE_LABELS = {
  EQUITY: 'Equity',
  DEBT: 'Debt',
  JOINT_VENTURE: 'Joint Venture',
  STRATEGIC_PARTNERSHIP: 'Strategic Partnership',
};

// Project investment_stage -> investor stage taxonomy
const PROJECT_STAGE_TO_INVESTOR = {
  IDEA: ['PRE_SEED', 'SEED'],
  PRE_FEASIBILITY: ['SEED', 'EARLY_STAGE'],
  FEASIBILITY: ['EARLY_STAGE', 'SERIES_A'],
  READY_FOR_INVESTMENT: ['SERIES_A', 'GROWTH', 'GROWTH_EQUITY'],
  FUNDING_OPEN: ['GROWTH', 'GROWTH_EQUITY', 'INFRASTRUCTURE'],
  UNDER_NEGOTIATION: ['GROWTH', 'LATE_STAGE'],
  FUNDED: [],
  CLOSED: [],
};

export const flagOf = (code) =>
  code ? [...code.toUpperCase()].map((c) => String.fromCodePoint(127397 + c.charCodeAt(0))).join('') : '🌐';

export const initialsOf = (name) =>
  (name || '?').trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase();

export const formatTicket = (min, max) => {
  if (min == null && max == null) return 'Not disclosed';
  if (max == null) return `From ${min}M`;
  if (min == null) return `Up to ${max}M`;
  return `${min}–${max}M`;
};

// Transparent deterministic scoring (NOT investment advice).
// Returns { score: 0-100, factors: [{label, ok}] }
export function scoreMatch(project, org, ctx = {}) {
  const factors = [];
  let score = 0;
  const sectorName = (ctx.sectorName || '').toLowerCase();

  // Sector compatibility — 25
  const focus = (org.investment_focus || []).map((s) => s.toLowerCase());
  const sectorHit = sectorName && focus.some((f) => f.includes(sectorName) || sectorName.includes(f));
  if (sectorHit) score += 25;
  factors.push({ label: 'Sector alignment', ok: !!sectorHit });

  // Ticket compatibility — 20
  const req = project.investment_required || 0;
  const min = org.minimum_ticket ?? 0;
  const max = org.maximum_ticket ?? Infinity;
  const ticketHit = req >= min && req <= max;
  if (ticketHit) score += 20;
  factors.push({ label: 'Ticket range', ok: !!ticketHit });

  // Geographic compatibility — 15
  const geo = (org.geographic_focus || []).map((g) => g.toLowerCase());
  const country = (org.country || '').toLowerCase();
  const geoHit =
    geo.some((g) => ['global', 'africa', 'north africa', 'mena', 'tunisia', 'emerging markets'].includes(g)) ||
    country === 'tunisia';
  if (geoHit) score += 15;
  factors.push({ label: 'Geographic mandate', ok: !!geoHit });

  // Investment stage — 15
  const mapped = PROJECT_STAGE_TO_INVESTOR[project.investment_stage] || [];
  const stageHit = mapped.some((s) => (org.investment_stages || []).includes(s));
  if (stageHit) score += 15;
  factors.push({ label: 'Investment stage', ok: !!stageHit });

  // Project type — 10
  const ptype = (project.project_type || '').toLowerCase();
  const ptypes = (org.project_types || []).map((p) => p.toLowerCase());
  const typeHit = ptype && (ptypes.length === 0 || ptypes.includes(ptype));
  if (typeHit) score += 10;
  factors.push({ label: 'Project type', ok: !!typeHit });

  // Investment structure — 10
  const seeking = (project.seeking || []).map((s) => s.toLowerCase());
  const structures = (org.investment_structures || []).map((s) => s.toLowerCase());
  const structHit = structures.some((st) => seeking.some((s) => s.includes(st) || st.includes(s)));
  if (structHit) score += 10;
  factors.push({ label: 'Investment structure', ok: !!structHit });

  // Strategic fit — 5
  const stratHit =
    org.featured || org.verification_status === 'VERIFIED' || org.verification_status === 'OFFICIAL';
  if (stratHit) score += 5;
  factors.push({ label: 'Strategic fit', ok: !!stratHit });

  return { score: Math.min(100, Math.round(score)), factors };
}

// Rank projects for a given investor organization.
export function matchProjectsToInvestor(projects, org, sectors, governorates) {
  return projects
    .map((p) => {
      const sector = sectors.find((s) => s.id === p.sector_id);
      const governorate = governorates.find((g) => g.id === p.governorate_id);
      const { score, factors } = scoreMatch(p, org, {
        sectorName: sector?.name,
        governorateName: governorate?.name,
        countryName: 'Tunisia',
      });
      return { project: p, sector, governorate, score, factors };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);
}

// Rank investor organizations for a given project.
export function matchInvestorsToProject(orgs, project, sectorName) {
  return orgs
    .map((org) => {
      const { score, factors } = scoreMatch(project, org, { sectorName });
      return { org, score, factors };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);
}