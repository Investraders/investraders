import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useToast } from '@/components/ui/use-toast';
import { STAGE_OPTIONS, INVESTMENT_STAGES } from '@/lib/investmentNetwork';

const inputCls = 'w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40';
const toArray = (v) => (v || '').split(',').map((s) => s.trim()).filter(Boolean);

const EMPTY = {
  name: '', vehicle_type: 'FUND', fund_category: '', fund_status: 'ACTIVE', country: '', currency: '',
  target_size: '', minimum_ticket: '', maximum_ticket: '', sector_focus: [], investment_stages: [],
  geographic_focus: '', description: '',
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

export default function InvestmentVehicleForm({ open, onClose, organization, onSaved }) {
  const { toast } = useToast();
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  const { data: sectors = [] } = useQuery({
    queryKey: ['sectors'],
    queryFn: () => base44.entities.Sector.list(),
    staleTime: 300000,
  });

  useEffect(() => {
    if (open) setForm(EMPTY);
  }, [open]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const toggle = (k, v) => setForm((f) => ({ ...f, [k]: f[k].includes(v) ? f[k].filter((x) => x !== v) : [...f[k], v] }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name) {
      toast({ title: 'Fund name is required', variant: 'destructive' });
      return;
    }
    setSaving(true);
    try {
      await base44.entities.InvestmentVehicle.create({
        organization_id: organization.id,
        organization_name: organization.display_name,
        name: form.name,
        vehicle_type: form.vehicle_type,
        fund_category: form.fund_category,
        fund_status: form.fund_status,
        country: form.country,
        currency: form.currency,
        target_size: form.target_size !== '' ? Number(form.target_size) : null,
        minimum_ticket: form.minimum_ticket !== '' ? Number(form.minimum_ticket) : null,
        maximum_ticket: form.maximum_ticket !== '' ? Number(form.maximum_ticket) : null,
        sector_focus: form.sector_focus,
        investment_stages: form.investment_stages,
        geographic_focus: toArray(form.geographic_focus),
        description: form.description,
        active: true,
      });
      toast({ title: 'Fund added' });
      onSaved?.();
      onClose();
    } catch (err) {
      toast({ title: 'Could not add fund', description: err?.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add a fund or vehicle</DialogTitle>
          <DialogDescription>List a specific fund managed by {organization?.display_name}.</DialogDescription>
        </DialogHeader>

        <form onSubmit={submit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium mb-1 block">Fund name *</label>
              <input className={inputCls} value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="e.g. 216 Capital Fund II" />
            </div>
            <div>
              <label className="text-xs font-medium mb-1 block">Fund category</label>
              <input className={inputCls} value={form.fund_category} onChange={(e) => set('fund_category', e.target.value)} placeholder="e.g. EARLY_STAGE, GROWTH" />
            </div>
            <div>
              <label className="text-xs font-medium mb-1 block">Status</label>
              <select className={inputCls} value={form.fund_status} onChange={(e) => set('fund_status', e.target.value)}>
                {['FUNDRAISING', 'ACTIVE', 'INVESTING', 'HARVESTING', 'CLOSED'].map((s) => <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium mb-1 block">Currency</label>
              <input className={inputCls} value={form.currency} onChange={(e) => set('currency', e.target.value)} placeholder="TND" />
            </div>
            <div>
              <label className="text-xs font-medium mb-1 block">Target size (M)</label>
              <input type="number" className={inputCls} value={form.target_size} onChange={(e) => set('target_size', e.target.value)} />
            </div>
            <div>
              <label className="text-xs font-medium mb-1 block">Country</label>
              <input className={inputCls} value={form.country} onChange={(e) => set('country', e.target.value)} />
            </div>
            <div>
              <label className="text-xs font-medium mb-1 block">Min ticket (M)</label>
              <input type="number" className={inputCls} value={form.minimum_ticket} onChange={(e) => set('minimum_ticket', e.target.value)} />
            </div>
            <div>
              <label className="text-xs font-medium mb-1 block">Max ticket (M)</label>
              <input type="number" className={inputCls} value={form.maximum_ticket} onChange={(e) => set('maximum_ticket', e.target.value)} />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium mb-1 block">Sector focus</label>
            <div className="flex flex-wrap gap-2">
              {sectors.map((s) => (
                <Chip key={s.id} on={form.sector_focus.includes(s.name)} label={s.name} onClick={() => toggle('sector_focus', s.name)} />
              ))}
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
            <label className="text-xs font-medium mb-1 block">Geographic focus</label>
            <input className={inputCls} value={form.geographic_focus} onChange={(e) => set('geographic_focus', e.target.value)} placeholder="Tunisia, Africa" />
          </div>

          <div>
            <label className="text-xs font-medium mb-1 block">Description</label>
            <textarea className={inputCls} rows={2} value={form.description} onChange={(e) => set('description', e.target.value)} />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={saving}>
              {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />} Add fund
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}