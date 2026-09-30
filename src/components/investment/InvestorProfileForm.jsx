import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useToast } from '@/components/ui/use-toast';
import { ORG_TYPE_OPTIONS, ORG_TYPES, STAGE_OPTIONS, INVESTMENT_STAGES } from '@/lib/investmentNetwork';
import { TYPE_LABELS } from '@/lib/investment';

const inputCls = 'w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40';
const toArray = (v) => (v || '').split(',').map((s) => s.trim()).filter(Boolean);

const EMPTY = {
  display_name: '', legal_name: '', organization_type: 'VENTURE_CAPITAL', country: '', country_code: '',
  city: '', website: '', linkedin: '', year_founded: '', description: '', investment_strategy: '',
  investment_focus: [], geographic_focus: '', investment_stages: [], project_types: [],
  investment_structures: [], minimum_ticket: '', maximum_ticket: '', preferred_currencies: '',
  esg_preferences: '',
};

function Chip({ on, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${on ? 'border-primary/30 bg-primary/10 text-primary' : 'bg-background text-muted-foreground hover:text-foreground'}`}
    >
      {label}
    </button>
  );
}

export default function InvestorProfileForm({ open, onClose, initial, onSaved }) {
  const { toast } = useToast();
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  const { data: sectors = [] } = useQuery({
    queryKey: ['sectors'],
    queryFn: () => base44.entities.Sector.list(),
    staleTime: 300000,
  });

  useEffect(() => {
    if (!open) return;
    if (initial) {
      setForm({
        ...EMPTY,
        ...initial,
        year_founded: initial.year_founded ?? '',
        minimum_ticket: initial.minimum_ticket ?? '',
        maximum_ticket: initial.maximum_ticket ?? '',
        investment_focus: initial.investment_focus || [],
        investment_stages: initial.investment_stages || [],
        project_types: initial.project_types || [],
        investment_structures: initial.investment_structures || [],
        geographic_focus: (initial.geographic_focus || []).join(', '),
        preferred_currencies: (initial.preferred_currencies || []).join(', '),
        esg_preferences: (initial.esg_preferences || []).join(', '),
      });
    } else {
      setForm(EMPTY);
    }
  }, [open, initial]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const toggle = (k, v) => setForm((f) => ({ ...f, [k]: f[k].includes(v) ? f[k].filter((x) => x !== v) : [...f[k], v] }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.display_name || !form.country) {
      toast({ title: 'Organization name and country are required', variant: 'destructive' });
      return;
    }
    setSaving(true);
    const payload = {
      display_name: form.display_name,
      legal_name: form.legal_name || form.display_name,
      organization_type: form.organization_type,
      country: form.country,
      country_code: form.country_code,
      city: form.city,
      website: form.website,
      linkedin: form.linkedin,
      year_founded: form.year_founded ? Number(form.year_founded) : null,
      description: form.description,
      investment_strategy: form.investment_strategy,
      investment_focus: form.investment_focus,
      geographic_focus: toArray(form.geographic_focus),
      investment_stages: form.investment_stages,
      project_types: form.project_types,
      investment_structures: form.investment_structures,
      minimum_ticket: form.minimum_ticket !== '' ? Number(form.minimum_ticket) : null,
      maximum_ticket: form.maximum_ticket !== '' ? Number(form.maximum_ticket) : null,
      preferred_currencies: toArray(form.preferred_currencies),
      esg_preferences: toArray(form.esg_preferences),
      active: true,
    };
    try {
      if (initial?.id) {
        await base44.entities.InvestmentOrganization.update(initial.id, payload);
        toast({ title: 'Profile updated' });
      } else {
        await base44.entities.InvestmentOrganization.create({ ...payload, verification_status: 'PENDING' });
        toast({ title: 'Profile created — submitted for verification' });
      }
      onSaved?.();
      onClose();
    } catch (err) {
      toast({ title: 'Could not save profile', description: err?.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initial ? 'Edit investment profile' : 'Create your investment profile'}</DialogTitle>
          <DialogDescription>
            Showcase your capital and investment preferences so Investraders can match you with relevant projects.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submit} className="space-y-6">
          {/* Identity */}
          <section className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Institution</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium mb-1 block">Display name *</label>
                <input className={inputCls} value={form.display_name} onChange={(e) => set('display_name', e.target.value)} placeholder="e.g. 216 Capital" />
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block">Legal name</label>
                <input className={inputCls} value={form.legal_name} onChange={(e) => set('legal_name', e.target.value)} />
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block">Investor type</label>
                <select className={inputCls} value={form.organization_type} onChange={(e) => set('organization_type', e.target.value)}>
                  {ORG_TYPE_OPTIONS.map((t) => <option key={t} value={t}>{ORG_TYPES[t]}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block">Year founded</label>
                <input type="number" className={inputCls} value={form.year_founded} onChange={(e) => set('year_founded', e.target.value)} />
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block">Country *</label>
                <input className={inputCls} value={form.country} onChange={(e) => set('country', e.target.value)} placeholder="Tunisia" />
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block">Country code (ISO)</label>
                <input className={inputCls} value={form.country_code} onChange={(e) => set('country_code', e.target.value)} placeholder="TN" maxLength={2} />
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block">City</label>
                <input className={inputCls} value={form.city} onChange={(e) => set('city', e.target.value)} />
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block">Website</label>
                <input className={inputCls} value={form.website} onChange={(e) => set('website', e.target.value)} placeholder="https://" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium mb-1 block">About</label>
              <textarea className={inputCls} rows={3} value={form.description} onChange={(e) => set('description', e.target.value)} placeholder="Describe your institution and investment approach" />
            </div>
          </section>

          {/* Capital */}
          <section className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Capital</h3>
            <div className="grid sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-medium mb-1 block">Minimum ticket (M)</label>
                <input type="number" className={inputCls} value={form.minimum_ticket} onChange={(e) => set('minimum_ticket', e.target.value)} placeholder="5" />
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block">Maximum ticket (M)</label>
                <input type="number" className={inputCls} value={form.maximum_ticket} onChange={(e) => set('maximum_ticket', e.target.value)} placeholder="50" />
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block">Currencies</label>
                <input className={inputCls} value={form.preferred_currencies} onChange={(e) => set('preferred_currencies', e.target.value)} placeholder="TND, EUR, USD" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium mb-1 block">Investment structures</label>
              <div className="flex flex-wrap gap-2">
                {Object.keys(TYPE_LABELS).length > 0 && ['EQUITY', 'DEBT', 'JOINT_VENTURE', 'STRATEGIC_PARTNERSHIP'].map((s) => (
                  <Chip key={s} on={form.investment_structures.includes(s)} label={s.replace(/_/g, ' ')} onClick={() => toggle('investment_structures', s)} />
                ))}
              </div>
            </div>
          </section>

          {/* Preferences */}
          <section className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Preferences</h3>
            <div>
              <label className="text-xs font-medium mb-1 block">Sector focus</label>
              <div className="flex flex-wrap gap-2">
                {sectors.map((s) => (
                  <Chip key={s.id} on={form.investment_focus.includes(s.name)} label={s.name} onClick={() => toggle('investment_focus', s.name)} />
                ))}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium mb-1 block">Geographic focus</label>
                <input className={inputCls} value={form.geographic_focus} onChange={(e) => set('geographic_focus', e.target.value)} placeholder="Tunisia, North Africa, Africa" />
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block">ESG / impact preferences</label>
                <input className={inputCls} value={form.esg_preferences} onChange={(e) => set('esg_preferences', e.target.value)} placeholder="Renewable energy, Job creation" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium mb-1 block">Investment stages</label>
              <div className="flex flex-wrap gap-2">
                {STAGE_OPTIONS.map((s) => (
                  <Chip key={s} on={form.investment_stages.includes(s)} label={INVESTMENT_STAGES[s]} onClick={() => toggle('investment_stages', s)} />
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium mb-1 block">Project types</label>
              <div className="flex flex-wrap gap-2">
                {Object.entries(TYPE_LABELS).map(([k, v]) => (
                  <Chip key={k} on={form.project_types.includes(k)} label={v} onClick={() => toggle('project_types', k)} />
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium mb-1 block">Investment strategy</label>
              <textarea className={inputCls} rows={2} value={form.investment_strategy} onChange={(e) => set('investment_strategy', e.target.value)} placeholder="e.g. Growth equity in mid-market companies with export potential" />
            </div>
          </section>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={saving}>
              {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {initial ? 'Save changes' : 'Create profile'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}