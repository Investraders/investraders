import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Star, Globe, ArrowRight, Bot } from 'lucide-react';
import { ORG_TYPES, VERIFICATION_META, flagOf, initialsOf, formatTicket } from '@/lib/investmentNetwork';

export default function OrganizationCard({ org, index = 0, matchScore }) {
  const verify = VERIFICATION_META[org.verification_status] || VERIFICATION_META.UNVERIFIED;
  const initials = initialsOf(org.display_name || org.legal_name);
  const score = matchScore ?? null;
  const scoreTone = score == null ? '' : score >= 80 ? 'text-[#20B26B]' : score >= 60 ? 'text-[#1769FF]' : 'text-[#FF9F43]';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 8) * 0.04 }}
      className="rounded-2xl border bg-card hover:shadow-lg transition-all hover:-translate-y-1 overflow-hidden flex flex-col"
    >
      <div className="h-1.5 bg-gradient-to-r from-[#071A2B] via-[#1769FF] to-[#16C7B7]" />
      <div className="p-5 flex-1">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl bg-[#1769FF]/10 border border-[#1769FF]/20 flex items-center justify-center text-[#1769FF] font-bold text-lg shrink-0 overflow-hidden">
            {org.logo ? <img src={org.logo} alt={org.display_name} className="w-full h-full object-cover" /> : initials}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold leading-snug truncate">{org.display_name}</h3>
            <div className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
              <span>{flagOf(org.country_code)}</span>
              <span className="truncate">{org.country || '—'}</span>
            </div>
          </div>
          {score != null && score > 0 && (
            <div className="text-right shrink-0">
              <div className={`text-2xl font-extrabold leading-none ${scoreTone}`}>{score}<span className="text-sm">%</span></div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1 justify-end"><Bot className="w-3 h-3" /> AI Match</div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5 flex-wrap mb-3">
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#1769FF]/10 text-[#1769FF] border border-[#1769FF]/20">
            {ORG_TYPES[org.organization_type] || org.organization_type}
          </span>
          {(org.verification_status === 'VERIFIED' || org.verification_status === 'OFFICIAL') && (
            <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full border ${verify.cls}`}>
              <ShieldCheck className="w-3 h-3" /> {verify.label}
            </span>
          )}
          {org.featured && (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> Featured
            </span>
          )}
        </div>

        {(org.investment_focus || []).length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {(org.investment_focus || []).slice(0, 4).map((s) => (
              <span key={s} className="text-[11px] px-2 py-0.5 rounded-md bg-muted text-muted-foreground">{s}</span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
          <span className="flex items-center gap-1">
            <Globe className="w-3.5 h-3.5" />
            {(org.geographic_focus || []).slice(0, 2).join(' · ') || '—'}
          </span>
          <span className="font-medium text-foreground">{formatTicket(org.minimum_ticket, org.maximum_ticket)}</span>
        </div>
      </div>

      <div className="px-5 pb-5 flex gap-2">
        <Link
          to={`/investment-network/${org.id}`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#1769FF]/30 bg-[#1769FF]/5 text-[#1769FF] text-sm font-semibold py-2.5 hover:bg-[#1769FF]/10 transition-colors"
        >
          View Profile <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          to={`/investment-network/${org.id}?match=1`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#1769FF] text-white text-sm font-semibold py-2.5 hover:opacity-90 transition-opacity"
        >
          <Bot className="w-3.5 h-3.5" /> Find Match
        </Link>
      </div>
    </motion.div>
  );
}