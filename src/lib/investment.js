import { Wheat, Apple, Factory, Car, Cpu, Zap, Plane, HeartPulse, Truck, Building2, Gem, Home } from 'lucide-react';

export const SECTOR_ICONS = { Wheat, Apple, Factory, Car, Cpu, Zap, Plane, HeartPulse, Truck, Building2, Gem, Home };

export const sectorIcon = (key) => SECTOR_ICONS[key] || Building2;

export const STAGE_LABELS = {
  IDEA: 'Idea',
  PRE_FEASIBILITY: 'Pre-Feasibility',
  FEASIBILITY: 'Feasibility',
  READY_FOR_INVESTMENT: 'Investment Ready',
  FUNDING_OPEN: 'Funding Open',
  UNDER_NEGOTIATION: 'Under Negotiation',
  FUNDED: 'Funded',
  CLOSED: 'Closed',
};

export const TYPE_LABELS = {
  GREENFIELD: 'Greenfield',
  EXPANSION: 'Expansion',
  JOINT_VENTURE: 'Joint Venture',
  PRIVATIZATION: 'Privatization',
  ACQUISITION: 'Acquisition',
  INFRASTRUCTURE: 'Infrastructure',
  PUBLIC_PRIVATE_PARTNERSHIP: 'Public-Private Partnership',
  STARTUP: 'Startup',
  SME: 'SME',
  REAL_ESTATE: 'Real Estate',
};

export const INTEREST_LABELS = {
  EQUITY: 'Equity Investor',
  DEBT: 'Debt Financing',
  JOINT_VENTURE: 'Joint Venture',
  STRATEGIC_PARTNERSHIP: 'Strategic Partnership',
  ACQUISITION: 'Acquisition',
  TECHNOLOGY_PARTNERSHIP: 'Technology Partnership',
  INFORMATION_REQUEST: 'Information Request',
  OTHER: 'Other',
};

export const SEEKING_LABELS = {
  EQUITY_INVESTOR: 'Equity Investor',
  STRATEGIC_PARTNER: 'Strategic Partner',
  DEBT_FINANCING: 'Debt Financing',
  JOINT_VENTURE: 'Joint Venture',
};

export const DOCUMENT_TYPES = [
  'Pitch Deck',
  'Business Plan',
  'Financial Model',
  'Feasibility Study',
  'Technical Study',
  'Legal Documents',
  'Land Documents',
  'Environmental Study',
  'Market Study',
];

export const SIZE_BANDS = [
  { id: 'all', label: 'Any size' },
  { id: 'lt1', label: '< 1 MTND', min: 0, max: 1 },
  { id: '1-5', label: '1–5 MTND', min: 1, max: 5 },
  { id: '5-10', label: '5–10 MTND', min: 5, max: 10 },
  { id: '10-50', label: '10–50 MTND', min: 10, max: 50 },
  { id: '50+', label: '50+ MTND', min: 50, max: Infinity },
];

export const inBand = (value, bandId) => {
  const b = SIZE_BANDS.find((x) => x.id === bandId);
  if (!b || b.id === 'all') return true;
  return (value || 0) >= b.min && (value || 0) < b.max;
};

export const formatMTND = (n) => {
  if (n == null) return '—';
  if (n >= 1000) return `${(n / 1000).toFixed(1)} BN TND`;
  return `${n} MTND`;
};

export const formatNumber = (n) => (n == null ? '—' : new Intl.NumberFormat('en-US').format(n));

export const DEMO_NOTICE = 'Demonstration data — not real investment opportunities.';