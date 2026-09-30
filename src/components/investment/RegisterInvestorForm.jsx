import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { ORG_TYPE_OPTIONS, ORG_TYPES, STAGE_OPTIONS, INVESTMENT_STAGES } from '@/lib/investmentNetwork';

const inputCls = 'w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40';

function toArray(v) {
  return (v || '').split(',').map((s) => s.trim()).filter(Boolean);
}

export default function RegisterInvestorForm({ open, onClose }) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [form, setForm] = useState({
    display_name: '',
    organization_type: 'VENTURE_CAPITAL',
    country: '',
    website: '',
    city: '',
    investment_focus: '',
    geographic_focus: '',
    investment_stages: [],
    minimum_ticket: '',
    maximum_ticket: '',
    investment_structures: [],
    description: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.display_name || !form.country) {
      toast({ title: 'Organization name and country are required', variant: 'destructive' });
      return;
    }
    setSubmitting(true);
    try {
      await base44.entities.InvestmentOrganization.create({
        display_name: form.display_name,
        legal_name: form.display_name,
        organization_type: form.organization_type,
        country: form.country,
        website: form.website,
        city: form.city,
        investment_focus: toArray(form.investment_focus),
        geographic_focus: toArray(form.geographic_focus),
        investment_stages: form.investment_stages,
        minimum_ticket: form.minimum_ticket ? Number(form.minimum_ticket) : null,
        maximum_ticket: form.maximum_ticket ? Number(form.maximum_ticket) : null,
        investment_structures: form.investment_structures,
        description: form.description,
        verification_status: 'PENDING',
        active: true,
      });
      setDone(true);
      toast({ title: 'Investor profile submitted for verification' });
    } catch (err) {
      toast({ title: 'Submission failed', description: err?.message || 'Please try again', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  const close = () => {
    if (done) {
      setDone(false);
      setForm({
        display_name: '', organization_type: 'VENTURE_CAPITAL', country: '', website: '', city: '',
        investment_focus: '', geographic_focus: '', investment_stages: [], minimum_ticket: '',
        maximum_ticket: '', investment_structures: [], description: '',
      });
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && close()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Register your institution</DialogTitle>
          <DialogDescription>
            Add your fund, investment company or capital partner to the Investraders Investment Network. Submissions are reviewed before publication.
          </DialogDescription>
        </DialogHeader>

        {done ? (
          <div className="py-10 text-center">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
            <h3 className="font-semibold text-lg mb-1">Submitted for verification</h3>
            <p className="text-sm text-muted-foreground mb-4">Our team will review your profile before it appears in the directory.</p>
            <Button onClick={close}>Close</Button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium mb-1 block">Organization name *</label>
                <input className={inputCls} value={form.display_name} onChange={(e) => set('display_name', e.target.value)} placeholder="e.g. 216 Capital" />
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block">Country *</label>
                <input className={inputCls} value={form.country} onChange={(e) => set('country', e.target.value)} placeholder="Tunisia" />
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block">Investor type</label>
                <select className={inputCls} value={form.organization_type} onChange={(e) => set('organization_type', e.target.value)}>
                  {ORG_TYPE_OPTIONS.map((t) => <option key={t} value={t}>{ORG_TYPES[t]}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block">Website</label>
                <input className={inputCls} value={form.website} onChange={(e) => set('website', e.target.value)} placeholder="https://" />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium mb-1 block">Investment focus (sectors, comma-separated)</label>
              <input className={inputCls} value={form.investment_focus} onChange={(e) => set('investment_focus', e.target.value)} placeholder="Technology, Renewable Energy, FinTech" />
            </div>

            <div>
              <label className="text-xs font-medium mb-1 block">Geographic focus (comma-separated)</label>
              <input className={inputCls} value={form.geographic_focus} onChange={(e) => set('geographic_focus', e.target.value)} placeholder="Tunisia, North Africa, Africa" />
            </div>

            <div>
              <label className="text-xs font-medium mb-1 block">Investment stages</label>
              <div className="flex flex-wrap gap-2">
                {STAGE_OPTIONS.map((s) => {
                  const on = form.investment_stages.includes(s);
                  return (
                    <button
                      type="button"
                      key={s}
                      onClick={() => set('investment_stages', on ? form.investment_stages.filter((x) => x !== s) : [...form.investment_stages, s])}
                      className={`text-xs px-2.5 py-1 rounded-full border ${on ? 'border-primary/30 bg-primary/10 text-primary' : 'bg-background text-muted-foreground'}`}
                    >
                      {INVESTMENT_STAGES[s]}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="text-xs font-medium mb-1 block">Investment structures</label>
              <div className="flex flex-wrap gap-2">
                {['EQUITY', 'DEBT', 'JOINT_VENTURE', 'STRATEGIC_PARTNERSHIP'].map((s) => {
                  const on = form.investment_structures.includes(s);
                  return (
                    <button
                      type="button"
                      key={s}
                      onClick={() => set('investment_structures', on ? form.investment_structures.filter((x) => x !== s) : [...form.investment_structures, s])}
                      className={`text-xs px-2.5 py-1 rounded-full border ${on ? 'border-primary/30 bg-primary/10 text-primary' : 'bg-background text-muted-foreground'}`}
                    >
                      {s.replace(/_/g, ' ')}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium mb-1 block">Minimum ticket (millions)</label>
                <input type="number" className={inputCls} value={form.minimum_ticket} onChange={(e) => set('minimum_ticket', e.target.value)} placeholder="5" />
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block">Maximum ticket (millions)</label>
                <input type="number" className={inputCls} value={form.maximum_ticket} onChange={(e) => set('maximum_ticket', e.target.value)} placeholder="50" />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium mb-1 block">About</label>
              <textarea className={inputCls} rows={3} value={form.description} onChange={(e) => set('description', e.target.value)} placeholder="Brief description of your institution and investment approach" />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={close}>Cancel</Button>
              <Button type="submit" disabled={submitting}>
                {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />} Submit for verification
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}