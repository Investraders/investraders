import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import {
  UserCog, Plus, Pencil, Loader2, Coins, MapPin, Layers, ShieldCheck, Globe, ArrowRight, Building2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import InvestorProfileForm from '@/components/investment/InvestorProfileForm';
import InvestmentVehicleForm from '@/components/investment/InvestmentVehicleForm';
import { ORG_TYPES, VERIFICATION_META, flagOf, formatTicket, initialsOf } from '@/lib/investmentNetwork';
import { CACHE } from '@/lib/query-client';

export default function InvestorProfileManage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [profileForm, setProfileForm] = useState(false);
  const [vehicleForm, setVehicleForm] = useState(false);

  const { data: orgs = [], isLoading } = useQuery({
    queryKey: ['my-investment-orgs', user?.id],
    queryFn: () => base44.entities.InvestmentOrganization.filter({ created_by_id: user.id }, '-created_date', 20),
    enabled: !!user?.id,
    staleTime: CACHE.short,
  });
  const org = orgs[0];

  const { data: vehicles = [] } = useQuery({
    queryKey: ['my-investment-vehicles', org?.id],
    queryFn: () => base44.entities.InvestmentVehicle.filter({ organization_id: org.id }),
    enabled: !!org?.id,
    staleTime: CACHE.short,
  });

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ['my-investment-orgs', user?.id] });
    queryClient.invalidateQueries({ queryKey: ['my-investment-vehicles', org?.id] });
    queryClient.invalidateQueries({ queryKey: ['investment-orgs'] });
  };

  if (isLoading) {
    return <div className="max-w-5xl mx-auto px-4 py-20 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <UserCog className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold">My Investment Profile</h1>
          <p className="text-sm text-muted-foreground">Showcase your capital and preferences to get matched with projects.</p>
        </div>
      </div>

      {!org ? (
        <div className="rounded-2xl border bg-card p-12 text-center">
          <Building2 className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <h2 className="font-semibold mb-1">You don't have an investment profile yet</h2>
          <p className="text-sm text-muted-foreground mb-5">Create a profile to list your investment criteria and appear in the Investment Network.</p>
          <Button onClick={() => setProfileForm(true)}>
            <Plus className="w-4 h-4 mr-2" /> Create investment profile
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Showcase card */}
          <div className="rounded-2xl border bg-card p-6">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-xl shrink-0 overflow-hidden">
                {org.logo ? <img src={org.logo} alt="" className="w-full h-full object-cover" /> : initialsOf(org.display_name)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                    {ORG_TYPES[org.organization_type] || org.organization_type}
                  </span>
                  <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${(VERIFICATION_META[org.verification_status] || VERIFICATION_META.UNVERIFIED).cls}`}>
                    <ShieldCheck className="w-3 h-3" /> {(VERIFICATION_META[org.verification_status] || VERIFICATION_META.UNVERIFIED).label}
                  </span>
                </div>
                <h2 className="text-xl font-bold">{org.display_name}</h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1 flex-wrap">
                  <span>{flagOf(org.country_code)} {org.country}</span>
                  {org.website && <a href={org.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline"><Globe className="w-3.5 h-3.5" /> Website</a>}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button variant="outline" onClick={() => setProfileForm(true)}>
                  <Pencil className="w-4 h-4 mr-2" /> Edit
                </Button>
                <Button asChild variant="ghost">
                  <Link to={`/investment-network/${org.id}`}>View public <ArrowRight className="w-4 h-4 ml-1" /></Link>
                </Button>
              </div>
            </div>

            {org.description && <p className="text-sm text-muted-foreground mt-4">{org.description}</p>}

            {/* Capital & preferences */}
            <div className="grid sm:grid-cols-3 gap-4 mt-6">
              <div className="rounded-xl border p-4">
                <Coins className="w-4 h-4 text-primary mb-2" />
                <div className="text-sm font-semibold">{formatTicket(org.minimum_ticket, org.maximum_ticket)}</div>
                <div className="text-xs text-muted-foreground mt-0.5">Ticket range{(org.preferred_currencies || []).length ? ` · ${org.preferred_currencies.join(', ')}` : ''}</div>
              </div>
              <div className="rounded-xl border p-4">
                <Layers className="w-4 h-4 text-primary mb-2" />
                <div className="text-sm font-semibold">{(org.investment_stages || []).length || 0} stages</div>
                <div className="text-xs text-muted-foreground mt-0.5 truncate">{(org.investment_stages || []).map((s) => s.replace(/_/g, ' ')).join(', ') || 'Not disclosed'}</div>
              </div>
              <div className="rounded-xl border p-4">
                <MapPin className="w-4 h-4 text-primary mb-2" />
                <div className="text-sm font-semibold truncate">{(org.geographic_focus || []).join(', ') || 'Not disclosed'}</div>
                <div className="text-xs text-muted-foreground mt-0.5">Geographic focus</div>
              </div>
            </div>

            <div className="mt-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Sector focus</div>
              <div className="flex flex-wrap gap-2">
                {(org.investment_focus || []).length ? org.investment_focus.map((s) => (
                  <span key={s} className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">{s}</span>
                )) : <span className="text-sm text-muted-foreground">Not disclosed</span>}
              </div>
            </div>
          </div>

          {/* Funds */}
          <div className="rounded-2xl border bg-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold flex items-center gap-2"><Layers className="w-4 h-4 text-primary" /> Funds & vehicles</h2>
              <Button size="sm" onClick={() => setVehicleForm(true)}><Plus className="w-4 h-4 mr-1.5" /> Add fund</Button>
            </div>
            {vehicles.length === 0 ? (
              <p className="text-sm text-muted-foreground py-6 text-center">No funds listed yet. Add the funds your institution manages.</p>
            ) : (
              <div className="space-y-3">
                {vehicles.map((v) => (
                  <div key={v.id} className="rounded-xl border p-4">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-medium">{v.name}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{(v.fund_category || v.vehicle_type || '').replace(/_/g, ' ')}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {[v.fund_status?.replace(/_/g, ' '), v.target_size ? `Target ${v.target_size}M` : null, formatTicket(v.minimum_ticket, v.maximum_ticket)].filter(Boolean).join(' · ')}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <InvestorProfileForm open={profileForm} onClose={() => setProfileForm(false)} initial={org} onSaved={refresh} />
      {org && <InvestmentVehicleForm open={vehicleForm} onClose={() => setVehicleForm(false)} organization={org} onSaved={refresh} />}
    </div>
  );
}