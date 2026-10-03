import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, MapPin, ArrowRight } from 'lucide-react';
import { formatMTND } from '@/lib/investment';
import { matchInvestorsToProject } from '@/lib/investmentNetwork';

export default function OpportunityOfTheDay({ pick, orgs }) {
  if (!pick) return null;
  const { project, sector, governorate } = pick;
  const topInvestor = matchInvestorsToProject(orgs, project, sector?.name)[0];
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#071A2B] to-[#0d2a44] text-white p-6 mb-8">
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#FF9F43]/20 blur-3xl" />
      <div className="relative flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-[#FF9F43]/20 flex items-center justify-center shrink-0">
          <Zap className="w-6 h-6 text-[#FF9F43]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#FF9F43] mb-1">⚡ Opportunity of the Day</div>
          <h3 className="text-lg font-bold truncate">{project.title}</h3>
          <div className="flex items-center gap-3 text-sm text-white/70 mt-1 flex-wrap">
            <span className="inline-flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{governorate?.name || 'Tunisia'}</span>
            {sector && <span>{sector.name}</span>}
            <span className="font-semibold text-[#20B26B]">{formatMTND(project.investment_required)}</span>
            {topInvestor && <span className="text-[#16C7B7] font-semibold">AI Match {topInvestor.score}%</span>}
          </div>
        </div>
        <Link to={`/project/${project.id}`} className="inline-flex items-center gap-2 rounded-xl bg-white text-[#071A2B] px-4 py-2.5 text-sm font-semibold hover:bg-white/90 shrink-0">
          Explore <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}