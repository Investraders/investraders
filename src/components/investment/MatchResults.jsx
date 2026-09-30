import React from 'react';
import { Link } from 'react-router-dom';
import { Check, X, ArrowRight, MapPin, Building2 } from 'lucide-react';
import { STAGE_LABELS, formatMTND } from '@/lib/investment';
import { ORG_TYPES, flagOf, initialsOf } from '@/lib/investmentNetwork';

function ScoreBadge({ score }) {
  const tone =
    score >= 80 ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
    : score >= 60 ? 'bg-blue-50 text-blue-700 border-blue-200'
    : 'bg-amber-50 text-amber-700 border-amber-200';
  return (
    <span className={`inline-flex items-center text-xs font-bold px-2 py-0.5 rounded-full border ${tone}`}>
      {score}% Match
    </span>
  );
}

function Factors({ factors }) {
  const positive = factors.filter((f) => f.ok);
  if (positive.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-1.5 mt-2">
      {positive.map((f) => (
        <span key={f.label} className="inline-flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 rounded px-1.5 py-0.5">
          <Check className="w-3 h-3" /> {f.label}
        </span>
      ))}
    </div>
  );
}

export function ProjectMatches({ results }) {
  if (!results.length) {
    return <p className="text-sm text-muted-foreground py-6 text-center">No matching projects found for this investor profile yet.</p>;
  }
  return (
    <div className="space-y-3">
      {results.map(({ project, sector, governorate, score, factors }) => (
        <Link
          key={project.id}
          to={`/project/${project.id}`}
          className="block rounded-xl border bg-card hover:shadow-md transition-all p-4"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <ScoreBadge score={score} />
              </div>
              <h4 className="font-semibold leading-snug">{project.title}</h4>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1 flex-wrap">
                <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3" />{governorate?.name || '—'}</span>
                {sector && <span className="inline-flex items-center gap-1"><Building2 className="w-3 h-3" />{sector.name}</span>}
                <span>· {STAGE_LABELS[project.investment_stage]}</span>
              </div>
              <Factors factors={factors} />
            </div>
            <div className="text-right shrink-0">
              <div className="text-lg font-bold text-primary">{formatMTND(project.investment_required)}</div>
              <ArrowRight className="w-4 h-4 text-primary ml-auto mt-1" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function InvestorMatches({ results }) {
  if (!results.length) {
    return <p className="text-sm text-muted-foreground py-6 text-center">No matching investor profiles found for this project yet.</p>;
  }
  return (
    <div className="space-y-3">
      {results.map(({ org, score, factors }) => (
        <Link
          key={org.id}
          to={`/investment-network/${org.id}`}
          className="block rounded-xl border bg-card hover:shadow-md transition-all p-4"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm shrink-0 overflow-hidden">
              {org.logo ? <img src={org.logo} alt="" className="w-full h-full object-cover" /> : initialsOf(org.display_name)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <ScoreBadge score={score} />
                <h4 className="font-semibold leading-snug">{org.display_name}</h4>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
                <span>{flagOf(org.country_code)}</span>
                <span>{org.country || '—'}</span>
                <span>· {ORG_TYPES[org.organization_type] || org.organization_type}</span>
              </div>
              <Factors factors={factors} />
            </div>
            <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-2" />
          </div>
        </Link>
      ))}
    </div>
  );
}